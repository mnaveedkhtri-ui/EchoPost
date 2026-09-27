'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user } = useUser();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('echopost_history');
      if (saved) setHistory(JSON.parse(saved));
    } catch(e) {}
  }, []);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-24 w-full">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-slate-100">
          Welcome back, <span className="text-cyan-400">{user?.firstName || 'Founder'}</span>!
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-8 glass-panel rounded-2xl border border-slate-700 bg-slate-900/40">
          <h3 className="text-xl font-bold text-slate-200 mb-2">Saved Voices</h3>
          <p className="text-4xl font-black text-cyan-400">{history.length}</p>
        </div>
        <div className="p-8 glass-panel rounded-2xl border border-slate-700 bg-slate-900/40">
          <h3 className="text-xl font-bold text-slate-200 mb-2">Carousels Generated</h3>
          <p className="text-4xl font-black text-cyan-400">{history.length}</p>
        </div>
        <Link href="/studio" className="p-8 glass-panel rounded-2xl border border-slate-700 bg-slate-900/40 border-dashed border-cyan-500/50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-cyan-900/20 hover:border-cyan-400 transition-all group shadow-lg hover:shadow-cyan-500/20">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl font-bold mb-3 group-hover:scale-110 transition-transform">+</div>
          <span className="text-cyan-400 font-bold">New Recording</span>
        </Link>
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-bold text-slate-100 mb-6">Recent Posts</h2>
        {history.length === 0 ? (
          <div className="text-slate-400 text-center py-12 bg-slate-900/40 border border-slate-800 rounded-xl">
            You haven't generated any posts yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((item: any) => (
              <div key={item.id} className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
                <div className="text-sm text-cyan-500 mb-2">{new Date(item.date).toLocaleString()}</div>
                <div className="text-slate-200 text-sm whitespace-pre-wrap">{item.post.slice(0, 300)}...</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
