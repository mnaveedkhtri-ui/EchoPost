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

  const [isCopied, setIsCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    // Direct synchronous call for better mobile support
    navigator.clipboard.writeText(result.post).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      alert("Failed to copy. Please select the text and copy manually.");
    });
  };

  const handleExportPDF = async () => {
    if (!result) return;
    setIsExporting(true);
    try {
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [1080, 1080]
      });
      
      result.slides.forEach((slide: any, i: number) => {
        if (i > 0) doc.addPage();
        
        // Background
        doc.setFillColor("#0f172a");
        doc.rect(0, 0, 1080, 1080, "F");
        
        // Slide Number
        doc.setFontSize(36);
        doc.setTextColor("#64748b");
        doc.text(`0${i+1}`, 80, 100);
        
        // Title (Centered)
        doc.setFontSize(72);
        doc.setTextColor("#ffffff");
        doc.setFont("helvetica", "bold");
        const titleLines = doc.splitTextToSize(slide.title, 900);
        // Start title roughly in the upper-middle
        doc.text(titleLines, 540, 400, { align: "center", baseline: "middle" });
        
        // Content (Centered)
        doc.setFontSize(40);
        doc.setTextColor("#cbd5e1");
        doc.setFont("helvetica", "normal");
        const contentLines = doc.splitTextToSize(slide.content, 900);
        // Place content below title
        doc.text(contentLines, 540, 600, { align: "center", baseline: "middle" });
      });

      doc.save("EchoPost-Carousel.pdf");
      
    } catch (error: any) {
      console.error("PDF Export failed:", error);
      alert(`PDF Export failed: ${error?.message || 'Unknown error'}`);
    }
    setIsExporting(false);
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
        mediaRecorder.stream.getTracks().forEach(track => track.stop());

        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setStatus('processing');
        
        const ext = mimeType.includes('mp4') ? 'mp4' : mimeType.includes('m4a') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm';
        
        const formData = new FormData();
        formData.append('audio', audioBlob, `audio.${ext}`);

        try {
          const res = await fetch('/api/generate', { method: 'POST', body: formData });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed to process audio');
          
          setResult(data);
          setStatus('done');

          // Save to LocalStorage for Dashboard
          try {
            const history = JSON.parse(localStorage.getItem('echopost_history') || '[]');
            history.unshift({ id: Date.now(), ...data, date: new Date().toISOString() });
            localStorage.setItem('echopost_history', JSON.stringify(history.slice(0, 20))); // Keep last 20
          } catch(e) { console.error("Could not save to history"); }
          
        } catch (err: any) {
          setErrorMessage(err.message);
          setStatus('error');
        }
      };

      mediaRecorder.start(1000);
      setRecordingTime(0);
      setStatus('recording');
    } catch (error) {
      alert("Please allow microphone access to use the Studio.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
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
                <button onClick={startRecording} className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-105 transition-all group cursor-pointer z-50 relative pointer-events-auto">
                  <Mic size={48} className="text-white group-hover:scale-110 transition-transform" />
                </button>
                <h3 className="mt-8 text-2xl font-bold text-slate-200">Tap to Start</h3>
                
                {/* Professional Guide Section */}
                <div className="mt-12 w-full max-w-lg border-t border-slate-800/60 pt-10">
                  <h4 className="text-slate-500 font-semibold mb-8 text-center text-xs uppercase tracking-widest">How to use EchoPost</h4>
                  <div className="space-y-8">
                    <div className="flex gap-5 items-start group">
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center shrink-0 font-bold border border-slate-700 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-colors">1</div>
                      <div>
                        <h5 className="text-slate-200 font-bold mb-1.5 text-lg">Brain-dump your idea</h5>
                        <p className="text-slate-400 text-sm leading-relaxed">Hit record and just speak naturally. Don't worry about grammar, pauses, or structure. Just dump your thoughts.</p>
                      </div>
                    </div>
                    <div className="flex gap-5 items-start group">
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center shrink-0 font-bold border border-slate-700 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-colors">2</div>
                      <div>
                        <h5 className="text-slate-200 font-bold mb-1.5 text-lg">AI does the heavy lifting</h5>
                        <p className="text-slate-400 text-sm leading-relaxed">Groq instantly transcribes your audio and transforms it into a high-converting, broetry-style LinkedIn post.</p>
                      </div>
                    </div>
                    <div className="flex gap-5 items-start group">
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 font-bold border border-slate-700 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors">3</div>
                      <div>
                        <h5 className="text-slate-200 font-bold mb-1.5 text-lg">Export & Publish</h5>
                        <p className="text-slate-400 text-sm leading-relaxed">1-click copy the text for your timeline, or download the perfectly formatted HD Carousel PDF to attach.</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                <button onClick={stopRecording} className="w-20 h-20 rounded-full bg-rose-500/10 border-2 border-rose-500 flex items-center justify-center hover:bg-rose-500/20 transition-all cursor-pointer z-50 relative pointer-events-auto">
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
              <motion.div key="error" className="flex flex-col items-center text-center z-50 relative">
                <div className="text-rose-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-slate-200 mb-3">Error</h3>
                <p className="text-slate-400 mb-6">{errorMessage}</p>
                <a href="/studio" className="px-6 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 cursor-pointer pointer-events-auto inline-block">Try Again</a>
              </motion.div>
            )}

            {status === 'done' && result && (
              <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 z-50 relative pointer-events-auto">

                
                {/* Text Post Section */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-100">LinkedIn Post</h3>
                    <button 
                      className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer px-3 py-1.5 rounded-md ${isCopied ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-cyan-400 hover:text-cyan-300 hover:bg-slate-700'}`}
                      onClick={handleCopy}
                    >
                      {isCopied ? 'Copied!' : <><Copy size={16} /> Copy</>}
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed bg-[#020617] p-6 rounded-xl border border-slate-800/50">
                    {result.post}
                  </div>
                </div>

                {/* PDF Carousel Preview Section */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 shadow-xl overflow-hidden flex flex-col">
                   <div className="flex justify-between items-center mb-6 shrink-0">
                    <h3 className="text-xl font-bold text-slate-100">Carousel Preview</h3>
                    <button 
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} />} 
                      {isExporting ? 'Exporting...' : 'Export PDF'}
                    </button>
                  </div>
                  
                  {/* Swipable Carousel container */}
                  <div id="carousel-preview" className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory custom-scrollbar pb-6 w-full h-full">
                    {result.slides.map((slide, i) => (
                      <div key={i} className="aspect-square w-full sm:w-[90%] md:w-full shrink-0 snap-center bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 flex flex-col justify-center items-center text-center shadow-lg relative">
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
                  <a href="/studio" className="px-8 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-medium cursor-pointer relative z-[100] inline-block">
                    Create Another Post
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
