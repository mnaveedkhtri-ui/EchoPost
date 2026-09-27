'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mic, Menu, X, LayoutDashboard } from 'lucide-react';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userId } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-[#020617]/85 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <Mic size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl md:text-2xl tracking-tight">EchoPost</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/guides" className="hover:text-cyan-400 transition-colors">Guides</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
          </nav>

          {/* Desktop CTA Buttons & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {!userId ? (
              <div className="hidden md:flex items-center gap-4">
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
                    Sign in
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-slate-900 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer">
                    Get Started
                  </button>
                </SignInButton>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/dashboard" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors">Dashboard</Link>
                <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 border-2 border-cyan-500/30" } }} />
              </div>
            )}

            {/* Mobile Hamburger Icon */}
            <button 
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-slate-800 shadow-2xl py-4 px-4 flex flex-col gap-4"
          >
            <Link href="/guides" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 font-medium py-2 hover:text-cyan-400">Guides</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 font-medium py-2 hover:text-cyan-400">About Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 font-medium py-2 hover:text-cyan-400">Contact</Link>
            
            <div className="h-[1px] bg-slate-800/60 my-2" />

            {!userId ? (
              <div className="flex flex-col gap-3">
                <SignInButton mode="modal">
                  <button className="w-full py-3 rounded-xl border border-slate-700 font-medium text-slate-300 hover:bg-slate-800 transition-colors text-center cursor-pointer">
                    Sign in
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors text-center cursor-pointer shadow-lg shadow-white/10">
                    Get Started Free
                  </button>
                </SignInButton>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-cyan-400 font-bold py-2">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 border-2 border-cyan-500/30" } }} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
