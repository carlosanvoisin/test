/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={`fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center hidden md:flex will-change-transform ${isHovering ? '' : 'mix-blend-difference'}`}
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="relative rounded-none flex items-center justify-center"
        style={{ width: 80, height: 80 }}
        animate={{
          scale: isHovering ? 1.6 : 1, 
          rotate: isHovering ? 45 : 0,
          backgroundColor: isHovering ? '#489FDB' : '#ffffff'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.span 
          className="z-10 font-black uppercase tracking-[0.2em] text-[10px] whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovering ? 1 : 0,
            rotate: isHovering ? -45 : 0,
            color: isHovering ? '#ffffff' : '#000000'
          }}
          transition={{ duration: 0.2 }}
        >
          Explore
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;