/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      
      {/* Blob 1: Intense Blue - High Contrast */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#489FDB] rounded-full mix-blend-screen filter blur-[120px] opacity-10 will-change-transform"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 2: Dark Slate */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[100vw] h-[100vw] bg-[#1a1a1a] rounded-full mix-blend-screen filter blur-[100px] opacity-40 will-change-transform"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Static Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;