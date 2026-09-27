import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LinkedIn SEO & Growth Guides: Master B2B Personal Branding',
  description: 'Explore expert SEO guides on LinkedIn algorithm updates, viral B2B hooks, and PDF carousels. Learn how to grow your agency with organic AI content.',
};

export default function GuidesPage() {
  const guides = [
    {
      slug: 'pdf-carousels-2026',
      title: 'Why PDF Carousels Outperform Text Posts in 2026',
      category: 'LinkedIn Algorithm',
      read: '5 min read',
      desc: 'Analyze recent data showing how document sliders increase dwell time and trigger the algorithm.'
    },
    {
      slug: 'viral-b2b-hook',
      title: 'The Anatomy of a Viral B2B Hook',
      category: 'Copywriting',
      read: '8 min read',
      desc: 'Stop the scroll. Learn the exact 3-line formulas top ghostwriters use to capture attention.'
    },
    {
      slug: 'seo-to-personal-brand',
      title: 'Transitioning from SEO Agency to Personal Brand',
      category: 'Agency Growth',
      read: '12 min read',
      desc: 'How building authority drives high-ticket inbound leads faster than cold email outreach.'
    },
    {
      slug: 'train-ai-voice-profile',
      title: 'How to Train AI on Your Unique Voice Profile',
      category: 'AI Tips',
      read: '4 min read',
      desc: 'Avoid the "ChatGPT sound." Strategies for prompting LLMs to mimic your exact cadence and style.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-100">SEO & Growth Guides</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Master the LinkedIn algorithm, optimize your personal brand, and generate inbound B2B leads organically using insights from top industry experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((guide, i) => (
          <Link href={`/guides/${guide.slug}`} key={i} className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl hover:bg-slate-800/50 hover:border-cyan-500/30 transition-all cursor-pointer group flex flex-col justify-between block">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 block">{guide.category}</span>
              <h3 className="text-2xl font-bold text-slate-200 mb-3 group-hover:text-white transition-colors">{guide.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{guide.desc}</p>
            </div>
            <div className="flex items-center text-slate-500 text-sm font-medium">
              <span>{guide.read}</span>
              <span className="mx-2">•</span>
              <span className="text-cyan-500 group-hover:text-cyan-300 transition-colors font-bold flex items-center gap-1">
                Read Full Guide <span className="text-lg leading-none">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
