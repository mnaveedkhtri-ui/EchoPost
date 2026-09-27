'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trash2, CheckSquare } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();
  const [history, setHistory] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadData() {
      try {
        const { getPosts } = await import('../actions');
        const posts = await getPosts();
        setHistory(posts);
      } catch(e) {
        console.error("Failed to load posts from Supabase", e);
      }
    }
    loadData();
  }, []);
  
  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === history.length && history.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(history.map(item => item.id)));
    }
  };

  const deleteSelected = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} post(s)?`)) return;
    
    // Optimistic UI update
    const previousHistory = [...history];
    const newHistory = history.filter(item => !selectedIds.has(item.id));
    setHistory(newHistory);
    
    try {
      const { deletePosts } = await import('../actions');
      await deletePosts(Array.from(selectedIds));
      setSelectedIds(new Set());
    } catch (e) {
      console.error("Failed to delete from Supabase", e);
      setHistory(previousHistory); // Revert on failure
      alert("Failed to delete posts from cloud.");
    }
  };

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-100">Recent Posts</h2>
          
          {history.length > 0 && (
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedIds.size === history.length && history.length > 0} 
                  onChange={toggleSelectAll} 
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
                <span className="text-sm font-medium">Select All</span>
              </label>
              
              {selectedIds.size > 0 && (
                <button 
                  onClick={deleteSelected}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 hover:text-rose-400 border border-rose-500/20 rounded-lg text-sm font-bold transition-all"
                >
                  <Trash2 size={16} />
                  Delete Selected ({selectedIds.size})
                </button>
              )}
            </div>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-slate-400 text-center py-12 bg-slate-900/40 border border-slate-800 rounded-xl">
            You haven't generated any posts yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((item: any) => (
              <div 
                key={item.id} 
                className={`bg-slate-900/40 border ${selectedIds.has(item.id) ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'border-slate-800 hover:border-slate-700'} rounded-xl p-6 transition-all flex gap-4 cursor-pointer`}
                onClick={() => toggleSelect(item.id)}
              >
                <div className="pt-1">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.has(item.id)} 
                    onChange={() => {}} // Handled by parent div click
                    className="w-5 h-5 accent-cyan-500 cursor-pointer pointer-events-none"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-cyan-500 mb-2 font-bold">{new Date(item.created_at).toLocaleString()}</div>
                  <div className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
                    {item.post.slice(0, 300)}{item.post.length > 300 ? '...' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
