import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Sparkles } from 'lucide-react';

export default function LoveLetterStep({ letterContent, onNext, playClickSFX }) {
  const defaultLetter = {
    title: "Happy Birthday 🎂",
    salutation: "Halo,",
    paragraphs: [
      "Selamat ulang tahun ya. Semoga di usiamu yang baru ini, kamu selalu diberikan kesehatan, kebahagiaan, dan kemudahan dalam meraih setiap impian serta cita-citamu.",
      "Meski perjalanan dan cerita kita kini sudah berbeda, aku tetap tulus mendoakan yang terbaik untuk kehidupanmu ke depan. Terima kasih pernah menjadi bagian dari hidupku dan untuk kenangan baik yang pernah kita lewati.",
      "Semoga hari spesialmu ini menyenangkan dan tahun ini membawa banyak kebaikan untukmu."
    ],
    closing: "Salam hangat,",
    sender: "Dari seseorang yang selalu mendoakan yang terbaik ✨"
  };

  const letter = letterContent || defaultLetter;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto z-10 my-auto py-8"
    >
      {/* Letter Envelope / Card */}
      <div className="relative w-full rounded-3xl p-6 sm:p-10 pb-12 sm:pb-14 paper-texture border border-love-200/80 shadow-2xl text-left my-4 mb-6">
        {/* Subtle decorative stamp corner */}
        <div className="absolute top-4 right-4 w-12 h-14 border-2 border-dashed border-love-300 rounded flex flex-col items-center justify-center text-love-600 opacity-80">
          <Star className="w-5 h-5 fill-gold-DEFAULT text-gold-DEFAULT" />
          <span className="text-[9px] font-semibold tracking-tighter mt-0.5">FOR HIM</span>
        </div>

        {/* Floating Embellishments */}
        <div className="absolute -top-2 -left-2 w-8 h-8 text-love-400/50 animate-pulse">
          <Sparkles className="w-full h-full fill-current" />
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-love-950 tracking-tight flex items-center justify-center gap-2">
            <span>{letter.title}</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-love-400 to-transparent mx-auto mt-3" />
        </div>

        {/* Salutation */}
        <p className="text-love-900 font-semibold text-base sm:text-lg mb-3">
          {letter.salutation}
        </p>

        {/* Paragraphs */}
        <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
          {letter.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-8 text-right font-serif">
          <p className="text-slate-600 text-sm italic">{letter.closing}</p>
          <p className="text-love-900 font-bold text-base sm:text-lg mt-1">
            {letter.sender}
          </p>
        </div>

        {/* Bottom Wax Seal Ribbon */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-love-600 border-4 border-white shadow-md flex items-center justify-center text-white z-10">
          <Star className="w-5 h-5 fill-white" />
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playClickSFX();
          onNext();
        }}
        className="mt-4 sm:mt-6 group relative inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-love-600 via-sky-500 to-love-700 text-white font-semibold text-base sm:text-lg shadow-glow-pink hover:shadow-love-500/50 transition-all duration-300 cursor-pointer z-20"
      >
        <span>NEXT SURPRISE</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
}
