import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock Database for the guides
const GUIDES_DB = {
  'pdf-carousels-2026': {
    title: 'Why PDF Carousels Outperform Text Posts in 2026',
    category: 'LinkedIn Algorithm',
    read: '5 min read',
    content: `
      <p>The LinkedIn algorithm has shifted dramatically over the last 12 months. In the past, a simple text post with a catchy hook was enough to generate hundreds of thousands of impressions. Today, <strong>dwell time</strong> is the primary metric LinkedIn uses to determine the value of a post.</p>
      
      <h3 class="text-2xl font-bold text-slate-200 mt-10 mb-4">What is Dwell Time?</h3>
      <p>Dwell time is the amount of time a user spends looking at your post in their feed before scrolling past. PDF Carousels (document posts) force users to click and physically swipe through multiple slides. Each swipe sends a positive signal to the algorithm that the user is highly engaged.</p>
      
      <div class="my-8 p-6 bg-slate-800/50 border-l-4 border-cyan-500 rounded-r-lg">
        <p class="italic m-0">"Our data shows that PDF Carousels receive 3x more clicks and 5x more dwell time compared to standard text posts." - LinkedIn Marketing Report</p>
      </div>

      <h3 class="text-2xl font-bold text-slate-200 mt-10 mb-4">The EchoPost Advantage</h3>
      <p>Creating PDF carousels manually takes hours of design work in Figma or Canva. For busy founders, this is an impossible bottleneck.</p>
      <p>With EchoPost, your spoken words are automatically structured into these high-performing slides, saving you 90% of the production time while maximizing your organic reach. We automatically handle the contrast, typography, and slide-breaks so you don't have to.</p>
    `
  },
  'viral-b2b-hook': {
    title: 'The Anatomy of a Viral B2B Hook',
    category: 'Copywriting',
    read: '8 min read',
    content: '<p>Content coming soon. You can build this out later!</p>'
  },
  'seo-to-personal-brand': {
    title: 'Transitioning from SEO Agency to Personal Brand',
    category: 'Agency Growth',
    read: '12 min read',
    content: '<p>Content coming soon. You can build this out later!</p>'
  },
  'train-ai-voice-profile': {
    title: 'How to Train AI on Your Unique Voice Profile',
    category: 'AI Tips',
    read: '4 min read',
    content: '<p>Content coming soon. You can build this out later!</p>'
  }
};

export default function GuideArticle({ params }: { params: { slug: string } }) {
  const guide = GUIDES_DB[params.slug as keyof typeof GUIDES_DB];

  if (!guide) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <Link href="/guides" className="text-cyan-400 text-sm font-medium hover:underline mb-10 inline-block">
        ← Back to all Guides
      </Link>
      
      <div className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
          {guide.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-6 leading-tight">
          {guide.title}
        </h1>
        <div className="flex items-center text-slate-500 text-sm font-medium border-b border-slate-800 pb-8">
          <span>{guide.read}</span>
          <span className="mx-3">•</span>
          <span>Published September 2026</span>
          <span className="mx-3">•</span>
          <span>By EchoPost Team</span>
        </div>
      </div>
      
      <div 
        className="prose prose-invert prose-slate prose-lg max-w-none text-slate-300 leading-relaxed" 
        dangerouslySetInnerHTML={{ __html: guide.content }} 
      />
      
      <div className="mt-20 p-10 bg-gradient-to-br from-slate-900 to-[#020617] border border-slate-800 rounded-3xl text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/20 rounded-full blur-[80px] pointer-events-none" />
        <h3 className="text-3xl font-bold text-slate-100 mb-4 relative z-10">Ready to automate your personal brand?</h3>
        <p className="text-slate-400 mb-8 relative z-10 text-lg">Stop typing. Start speaking. Let EchoPost build your LinkedIn presence organically.</p>
        <Link href="/signup" className="relative z-10 inline-block px-8 py-4 bg-cyan-500 text-slate-900 font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
          Start Your Free Trial Today
        </Link>
      </div>
    </div>
  );
}
