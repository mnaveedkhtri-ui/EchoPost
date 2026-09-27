'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Loader2, CheckCircle2, ChevronRight, FileDown, Copy } from 'lucide-react';

export default function StudioPage() {
  const [status, setStatus] = useState<'idle' | 'recording' | 'processing' | 'done' | 'error'>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState<{ transcript: string, post: string, slides: any[] } | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === 'recording') {
      timerRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setStatus('processing');
        
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
          const res = await fetch('/api/generate', { method: 'POST', body: formData });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to process audio');
          
          setResult(data);
          setStatus('done');
        } catch (err: any) {
          setErrorMessage(err.message);
          setStatus('error');
        }
      };

      mediaRecorder.start();
      setRecordingTime(0);
      setStatus('recording');
    } catch (error) {
      alert("Please allow microphone access to use the Studio.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 w-full flex flex-col items-center pb-24">
      <div className="fixed top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {status !== 'done' && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-4 tracking-tight">Creator Studio</h1>
            <p className="text-slate-400 text-lg">Record your thoughts naturally. Groq AI will do the heavy lifting.</p>
          </div>
        )}

        <div className={`w-full ${status === 'done' ? 'max-w-5xl' : 'max-w-2xl bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl glass-panel'} flex flex-col items-center justify-center min-h-[400px]`}>
          <AnimatePresence mode="wait">
            
            {status === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                <button onClick={startRecording} className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-105 transition-all group">
                  <Mic size={48} className="text-white group-hover:scale-110 transition-transform" />
                </button>
                <h3 className="mt-8 text-2xl font-bold text-slate-200">Tap to Start</h3>
              </motion.div>
            )}

            {status === 'recording' && (
              <motion.div key="recording" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full">
                <div className="text-5xl font-mono font-bold text-slate-100 mb-8">{formatTime(recordingTime)}</div>
                <div className="flex items-center justify-center gap-1.5 h-16 w-full mb-12">
                  {[...Array(24)].map((_, i) => (
                    <motion.div key={i} animate={{ height: ['20%', '100%', '30%', '80%', '20%'] }} transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }} className="w-2 bg-cyan-400 rounded-full" />
                  ))}
                </div>
                <button onClick={stopRecording} className="w-20 h-20 rounded-full bg-rose-500/10 border-2 border-rose-500 flex items-center justify-center hover:bg-rose-500/20 transition-all">
                  <Square size={28} className="text-rose-500" fill="currentColor" />
                </button>
              </motion.div>
            )}

            {status === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                <Loader2 size={48} className="text-cyan-400 animate-spin mb-6" />
                <h3 className="text-2xl font-bold text-slate-200 mb-3">Groq AI is Processing...</h3>
                <p className="text-slate-400">Transcribing audio and generating your viral post...</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div key="error" className="flex flex-col items-center text-center">
                <div className="text-rose-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-slate-200 mb-3">Error</h3>
                <p className="text-slate-400 mb-6">{errorMessage}</p>
                <button onClick={() => setStatus('idle')} className="px-6 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700">Try Again</button>
              </motion.div>
            )}

            {status === 'done' && result && (
              <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Text Post Section */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-100">LinkedIn Post</h3>
                    <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 text-sm" onClick={() => navigator.clipboard.writeText(result.post)}>
                      <Copy size={16} /> Copy
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed bg-[#020617] p-6 rounded-xl border border-slate-800/50">
                    {result.post}
                  </div>
                </div>

                {/* PDF Carousel Preview Section */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 shadow-xl">
                   <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-100">Carousel Preview</h3>
                    <button 
                      onClick={async () => {
                        const element = document.getElementById('carousel-preview');
                        if (!element) return;
                        const html2pdf = (await import('html2pdf.js')).default;
                        html2pdf().set({
                          margin: 0.5,
                          filename: 'EchoPost-Carousel.pdf',
                          image: { type: 'jpeg', quality: 0.98 },
                          html2canvas: { scale: 2, useCORS: true },
                          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                        }).from(element).save();
                      }}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileDown size={16} /> Export PDF
                    </button>
                  </div>
                  
                  <div id="carousel-preview" className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar pb-8">
                    {result.slides.map((slide, i) => (
                      <div key={i} className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 flex flex-col justify-center items-center text-center shadow-lg relative shrink-0">
                        <span className="absolute top-4 left-4 text-slate-500 font-mono text-sm">0{i+1}</span>
                        <h4 className="text-2xl font-black text-white mb-4 leading-tight">{slide.title}</h4>
                        <p className="text-slate-300">{slide.content}</p>
                        
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-slate-500 text-xs">
                          Swipe <ChevronRight size={12} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-full flex justify-center mt-8">
                  <button onClick={() => setStatus('idle')} className="px-8 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-medium">
                    Create Another Post
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
