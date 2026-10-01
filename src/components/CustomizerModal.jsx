import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Heart, Edit3, Image, Check } from 'lucide-react';

export default function CustomizerModal({ isOpen, onClose, letterContent, setLetterContent }) {
  const [salutation, setSalutation] = useState(letterContent?.salutation || 'Halo,');
  const [para1, setPara1] = useState(letterContent?.paragraphs?.[0] || 'Selamat ulang tahun ya. Semoga di usiamu yang baru ini, kamu selalu diberikan kesehatan, kebahagiaan, dan kemudahan dalam meraih setiap impian serta cita-citamu.');
  const [para2, setPara2] = useState(letterContent?.paragraphs?.[1] || 'Meski perjalanan dan cerita kita kini sudah berbeda, aku tetap tulus mendoakan yang terbaik untuk kehidupanmu ke depan. Terima kasih pernah menjadi bagian dari hidupku.');
  const [sender, setSender] = useState(letterContent?.sender || 'Dari seseorang yang selalu mendoakan yang terbaik ✨');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLetterContent({
      title: "Happy Birthday 🎂",
      salutation,
      paragraphs: [para1, para2],
      closing: "Salam hangat,",
      sender
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-love-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-love-100 pb-4 mb-4">
              <div className="flex items-center gap-2 text-love-800 font-bold font-serif text-xl">
                <Edit3 className="w-5 h-5 text-love-600" />
                <span>Customize Surprise Letter</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4 text-left font-sans text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Recipient Greeting
                </label>
                <input
                  type="text"
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-love-500"
                  placeholder="e.g. Halo Ganteng,"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Letter Paragraph 1
                </label>
                <textarea
                  rows={2}
                  value={para1}
                  onChange={(e) => setPara1(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-love-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Letter Paragraph 2
                </label>
                <textarea
                  rows={2}
                  value={para2}
                  onChange={(e) => setPara2(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-love-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Sender Signature
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-love-500"
                  placeholder="e.g. Dari seseorang yang menyayangimu ❤️"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-love-600 text-white font-semibold flex items-center gap-2 hover:bg-love-700 transition-colors shadow-md"
                >
                  {saved ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4 fill-white" />}
                  <span>{saved ? 'Saved!' : 'Save Letter'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
