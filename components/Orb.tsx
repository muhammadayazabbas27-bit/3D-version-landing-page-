
import React, { useEffect } from 'react';
import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';

interface OrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  active?: boolean;
  volume: MotionValue<number>;
}

const Orb: React.FC<OrbProps> = ({ className = '', size = 'lg', active = false, volume }) => {
  // Base size configuration
  let baseSize = 300;
  if (size === 'sm') baseSize = 100;
  if (size === 'xl') baseSize = 400;

  // 1. Smooth out the "Active" state transition (0 -> 1)
  // Lower stiffness/damping for a "dissolve" feel on exit
  const activeSpring = useSpring(active ? 1 : 0, {
    stiffness: 40,
    damping: 20,
    mass: 1.2
  });

  // 2. Smooth out volume changes (prevents abrupt snaps when silence hits)
  const volumeSpring = useSpring(volume, {
    stiffness: 200,
    damping: 25
  });

  // 3. Sync the spring with the active prop
  useEffect(() => {
    activeSpring.set(active ? 1 : 0);
  }, [active, activeSpring]);

  // 4. Create a high-performance transform for scale
  const scale = useTransform([activeSpring, volumeSpring], ([a, v]: number[]) => {
    const baseScale = 1 + (a * 3.5); // Scales from 1 to 4.5
    const volumeKick = v * 0.5;      // Adds beat punch
    return baseScale + volumeKick;
  });

  // 5. Transforms for Layer Cross-Fading (Colors)
  // Cross-fade opacity between Idle and Active layers
  const idleOpacity = useTransform(activeSpring, [0, 1], [1, 0]);
  const activeOpacity = useTransform(activeSpring, [0, 1], [0, 1]);

  // 6. Ring Transforms
  const ringScale1 = useTransform(activeSpring, [0, 1], [1.1, 3]);
  const ringOpacityCommon = useTransform(activeSpring, [0, 1], [0.1, 0.6]);
  
  const ringScale2 = useTransform(activeSpring, [0, 1], [1.3, 3.5]);
  const ringScale3 = useTransform(activeSpring, [0, 1], [1.5, 4]);
  
  const glowSize = useTransform([activeSpring, volumeSpring], ([a, v]: number[]) => {
    const s = 1.8 + (a * 4.2); 
    return baseSize * s; 
  });
  
  const glowOpacity = useTransform([activeSpring, volumeSpring], ([a, v]: number[]) => {
    return 0.3 + (a * 0.1) + (v * 0.2);
  });

  // Idle Gradient: Soft, Dormant, Breathable
  const idleGradient = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(226, 232, 240, 0.6) 30%, rgba(203, 213, 225, 0.4) 60%, rgba(148, 163, 184, 0.1) 100%)';
  
  // Active Gradient: Vibrant Electric Plasma
  const activeGradient = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(56, 189, 248, 0.85) 25%, rgba(99, 102, 241, 0.75) 50%, rgba(139, 92, 246, 0.5) 75%, rgba(76, 29, 149, 0.1) 100%)';

  return (
    <div className={`relative flex items-center justify-center pointer-events-none perspective-container ${className}`}>
      
      {/* 
        MAIN BUBBLE BLOB 
      */}
      <motion.div
        className="relative z-10 preserve-3d"
        style={{ 
          width: baseSize, 
          height: baseSize,
          scale: scale, // Bound directly to MotionValue for 60fps
        }}
      >
        {/* 
            Rotating Container holding the layers
            We apply rotation/morphing here. The children inherit the shape via overflow-hidden if needed, 
            but for performance we apply borderRadius to this container.
        */}
        <motion.div
            className="absolute inset-0 overflow-hidden shadow-2xl"
            style={{ 
                boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.1), inset 10px 10px 30px rgba(255,255,255,0.4)'
            }}
            animate={{
                rotate: 360,
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%"
                ]
            }}
            transition={{
                rotate: { duration: active ? 8 : 20, repeat: Infinity, ease: "linear" }, // Slower rotation when idle
                borderRadius: { 
                  duration: active ? 3 : 8, // Slower morph when idle
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatType: "mirror" 
                }
            }}
        >
            {/* LAYER 1: IDLE STATE (Fades out when active) */}
            <motion.div 
                className="absolute inset-0"
                style={{ 
                    opacity: idleOpacity,
                    background: idleGradient 
                }}
            />

            {/* LAYER 2: ACTIVE STATE (Fades in when active) */}
            <motion.div 
                className="absolute inset-0"
                style={{ 
                    opacity: activeOpacity,
                    background: activeGradient 
                }}
            />

            {/* SHARED GLARES (Always visible, blend nicely with both) */}
            <div className="absolute top-[15%] left-[15%] w-[35%] h-[20%] bg-white/60 rounded-full blur-xl transform -rotate-45 mix-blend-overlay" />
            <div className="absolute bottom-[15%] right-[15%] w-[20%] h-[10%] bg-cyan-400/40 rounded-full blur-xl transform -rotate-45 mix-blend-color-dodge" />
        </motion.div>
      </motion.div>

      {/* 
        SECONDARY OUTER GLOW 
      */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/40 blur-[90px]"
        style={{ 
          transform: 'translateZ(-50px)',
          width: glowSize,
          height: glowSize,
          opacity: glowOpacity
        }}
      />

      {/* 
        ORBITAL RINGS - 3D Gyroscope Feel
      */}
      <motion.div
        className="absolute inset-0 border-[2px] border-cyan-400/50 rounded-full preserve-3d"
        style={{ 
           width: baseSize, 
           height: baseSize, 
           position: 'absolute', 
           top: 0, 
           left: 0,
           scale: ringScale1,
           opacity: ringOpacityCommon
        }}
        animate={{ 
          rotateX: [60, 70, 60],
          rotateZ: [0, 360]
        }}
        transition={{ 
          rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
          rotateZ: { duration: 15, repeat: Infinity, ease: "linear" }
        }}
      />
      
      <motion.div
        className="absolute inset-0 border-[2px] border-violet-500/40 rounded-full preserve-3d"
        style={{ 
           width: baseSize, 
           height: baseSize, 
           position: 'absolute', 
           top: 0, 
           left: 0,
           scale: ringScale2,
           opacity: ringOpacityCommon
        }}
        animate={{ 
          rotateX: [70, 60, 70],
          rotateZ: [360, 0] 
        }}
        transition={{ 
          rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
          rotateZ: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
      
      <motion.div
        className="absolute inset-0 border border-white/50 rounded-full preserve-3d dashed-ring"
        style={{ 
           width: baseSize, 
           height: baseSize, 
           position: 'absolute', 
           top: 0, 
           left: 0,
           scale: ringScale3,
           opacity: ringOpacityCommon
        }}
        animate={{ 
          rotateY: [0, 180, 360],
          rotateZ: [45, 45]
        }}
        transition={{ 
          duration: 25, repeat: Infinity, ease: "linear"
        }}
      />

    </div>
  );
};

export default Orb;