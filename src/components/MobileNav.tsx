'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Mic, LayoutDashboard, BookOpen } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

export default function MobileNav() {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#020617]/95 backdrop-blur-xl border-t border-slate-800/80 z-[100] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 px-2">
        <Link href="/" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${pathname === '/' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}>
          <Home size={22} className="mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        
        {userId ? (
          <>
            <Link href="/dashboard" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${pathname === '/dashboard' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}>
              <LayoutDashboard size={22} className="mb-1" />
              <span className="text-[10px] font-medium">Dashboard</span>
            </Link>
            
            <Link href="/studio" className="flex flex-col items-center justify-center w-full h-full relative -top-5">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] text-white active:scale-95 transition-transform border-4 border-[#020617]">
                <Mic size={26} />
              </div>
              <span className="text-[10px] font-bold text-cyan-400 absolute -bottom-4">Record</span>
            </Link>
          </>
        ) : (
           <div className="flex flex-col items-center justify-center w-full h-full relative -top-5 opacity-50 grayscale">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-[#020617] text-white">
              <Mic size={26} />
            </div>
          </div>
        )}
        
        <Link href="/guides" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${pathname === '/guides' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}>
          <BookOpen size={22} className="mb-1" />
          <span className="text-[10px] font-medium">Guides</span>
        </Link>
      </div>
    </div>
  );
}
