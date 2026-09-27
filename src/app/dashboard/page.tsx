import { UserButton, currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const user = await currentUser();
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-24 w-full">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-slate-100">
          Welcome back, <span className="text-cyan-400">{user?.firstName || 'Founder'}</span>!
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 glass-panel rounded-2xl border border-slate-700 bg-slate-900/40">
          <h3 className="text-xl font-bold text-slate-200 mb-2">Saved Voices</h3>
          <p className="text-4xl font-black text-cyan-400">0</p>
        </div>
        <div className="p-8 glass-panel rounded-2xl border border-slate-700 bg-slate-900/40">
          <h3 className="text-xl font-bold text-slate-200 mb-2">Carousels Generated</h3>
          <p className="text-4xl font-black text-cyan-400">0</p>
        </div>
        <div className="p-8 glass-panel rounded-2xl border border-slate-700 bg-slate-900/40 border-dashed border-cyan-500/50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-cyan-900/20 transition-colors">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl font-bold mb-3">+</div>
          <span className="text-cyan-400 font-bold">New Recording</span>
        </div>
      </div>
    </div>
  );
}
