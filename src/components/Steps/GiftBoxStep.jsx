import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ThreeGiftBox from '../ThreeGiftBox';
import { Sparkles, Star } from 'lucide-react';

export default function GiftBoxStep({ onOpenGift, playClickSFX, playBoxOpenSFX }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    playClickSFX();

    // Step 1 Unboxing sequence:
    // 1. Shaking
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsOpening(true);
      playBoxOpenSFX();
      
      // Complete animation and move to step 2
      setTimeout(() => {
        onOpenGift();
      }, 1600);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="w-full my-auto py-4 sm:py-6 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto z-10"
    >
      {/* Top Floating Badge */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-love-200 text-love-700 shadow-sm text-xs font-semibold uppercase tracking-wider mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-love-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Surprise Box</span>
        <Star className="w-3.5 h-3.5 text-gold-DEFAULT fill-gold-DEFAULT" />
      </motion.div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-love-950 tracking-tight leading-tight mb-2 drop-shadow-sm">
        Happy Birthday! 🎂
      </h1>

      {/* Subtitle */}
      <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium max-w-md mx-auto mb-6 leading-relaxed">
        Sebuah kejutan kecil untuk merayakan hari spesialmu.
      </p>

      {/* 3D Gift Box Container */}
      <div className="w-full max-w-md relative my-2">
        <ThreeGiftBox
          isOpen={isOpening}
          isShaking={isShaking}
          onClick={handleOpenClick}
        />

        {/* Subtle glowing ring underneath */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-love-300/30 rounded-full blur-xl -z-10 pointer-events-none animate-pulse-subtle" />
      </div>

      {/* Open Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenClick}
        disabled={isOpening}
        className="mt-6 group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-love-600 via-sky-500 to-love-700 text-white font-semibold text-base sm:text-lg shadow-glow-pink hover:shadow-love-500/50 transition-all duration-300 disabled:opacity-75 cursor-pointer"
      >
        <Sparkles className="w-5 h-5 text-gold-light group-hover:rotate-12 transition-transform duration-300" />
        <span>{isOpening ? "OPENING..." : "OPEN YOUR SURPRISE 🎁"}</span>
        <Star className="w-5 h-5 fill-gold-light text-gold-light group-hover:scale-110 transition-transform duration-300" />

        {/* Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-love-400/30 blur-md -z-10 group-hover:bg-love-400/50 transition-colors" />
      </motion.button>
    </motion.div>
  );
}
