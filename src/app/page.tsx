'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Wand2, FileText, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecordClick = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 3000);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-900/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <div className="z-10 flex flex-col items-center text-center max-w-5xl px-4 mt-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-10"
        >
          <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Trusted by 500+ Agency Owners
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-100"
        >
          Grow your LinkedIn presence <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            without typing a single word.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mb-14 leading-relaxed font-light"
        >
          Busy founders use EchoPost to transform rough voice notes into perfectly formatted LinkedIn posts and PDF carousels. Natural, organic, and effortlessly you.
        </motion.p>

        {/* Interactive Recording Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative flex flex-col items-center justify-center w-full max-w-lg p-10 glass-panel rounded-[2rem] border border-slate-700/50 shadow-2xl bg-slate-900/40 backdrop-blur-xl"
        >
          <div className="mb-10 text-center h-8">
             <span className="text-slate-300 font-medium text-lg">Tap the mic to enter the Creator Studio</span>
          </div>

          {/* The Mic Button */}
          <div className="relative">
            <Link href="/studio">
              <button
                className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/40 hover:scale-105 cursor-pointer"
              >
                <Mic size={36} />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Value Proposition Section (Humanic & Organic) */}
      <div className="w-full max-w-6xl mx-auto px-4 py-24 border-t border-slate-800/50 mt-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">How it works naturally</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">No generic AI templates. We preserve your unique tone of voice and industry expertise.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/30 border border-slate-800/60 p-8 rounded-[2rem] hover:bg-slate-900/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 text-cyan-400">
              <Mic size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">1. Speak naturally</h3>
            <p className="text-slate-400 leading-relaxed text-sm">Don't worry about formatting or grammar. Just share your raw industry insights, stories, and opinions exactly as they come to you.</p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/60 p-8 rounded-[2rem] hover:bg-slate-900/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 text-indigo-400">
              <Wand2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">2. Organic formatting</h3>
            <p className="text-slate-400 leading-relaxed text-sm">Our engine extracts the core value and structures it into highly readable, algorithm-friendly posts while keeping your authentic human voice.</p>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/60 p-8 rounded-[2rem] hover:bg-slate-900/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 text-blue-400">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">3. Carousel generation</h3>
            <p className="text-slate-400 leading-relaxed text-sm">Stand out in the feed. We automatically convert your structured thoughts into beautiful, swipeable PDF carousels that drive massive engagement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
