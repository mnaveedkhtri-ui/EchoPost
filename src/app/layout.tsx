import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Mic } from 'lucide-react';
import { ClerkProvider, SignInButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: 'Voice to LinkedIn Post Generator: AI Carousel Maker | EchoPost',
  description: 'Turn raw voice notes into viral LinkedIn carousels and B2B posts instantly. The ultimate AI personal branding engine for busy founders and agencies.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="min-h-screen bg-[#020617] text-slate-50 flex flex-col font-sans selection:bg-cyan-500/30">
          
          {/* Professional Global Header */}
          <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-[#020617]/85 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
                    <Mic size={20} className="text-white" />
                  </div>
                  <span className="font-bold text-2xl tracking-tight">EchoPost</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                  <Link href="/guides" className="hover:text-cyan-400 transition-colors">SEO Guides</Link>
                  <Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link>
                  <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
                  <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
                </nav>

                {/* CTA Buttons */}
                <div className="flex items-center gap-5">
                  {!userId ? (
                    <>
                      <SignInButton mode="modal">
                        <button className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
                          Sign in
                        </button>
                      </SignInButton>
                      <SignInButton mode="modal">
                        <button className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-slate-900 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer">
                          Continue with Google
                        </button>
                      </SignInButton>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors mr-4">Dashboard</Link>
                      <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 border-2 border-cyan-500/30" } }} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

        {/* Main Page Content */}
        <main className="flex-grow flex flex-col relative">
          {children}
        </main>

        {/* Professional Global Footer */}
        <footer className="border-t border-slate-800/60 bg-[#020617] pt-20 pb-10 relative overflow-hidden">
          {/* Subtle footer glow */}
          <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              
              <div className="col-span-1 md:col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-6">
                  <Mic size={22} className="text-cyan-500" />
                  <span className="font-bold text-2xl tracking-tight">EchoPost</span>
                </Link>
                <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
                  The organic personal branding engine for busy B2B founders. We help you turn raw, authentic voice notes into highly optimized LinkedIn content that drives real engagement.
                </p>
                <div className="text-xs text-slate-500 font-medium">
                  Optimized for Global SEO & Local Reach.
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-100 mb-5">Resources</h3>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li><Link href="/guides" className="hover:text-cyan-400 transition-colors">SEO & Growth Guides</Link></li>
                  <li><Link href="/about" className="hover:text-cyan-400 transition-colors">Our Story</Link></li>
                  <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-100 mb-5">Legal & Privacy</h3>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/cookie-policy" className="hover:text-cyan-400 transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>

            </div>
            
            <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>© {new Date().getFullYear()} EchoPost Technologies Inc. All rights reserved.</p>
              <div className="flex gap-6">
                <span className="hover:text-slate-300 cursor-pointer transition-colors">Twitter</span>
                <span className="hover:text-slate-300 cursor-pointer transition-colors">LinkedIn</span>
                <span className="hover:text-slate-300 cursor-pointer transition-colors">Instagram</span>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
    </ClerkProvider>
  );
}
