import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About EchoPost | The Organic AI Engine for LinkedIn Growth',
  description: 'Discover how EchoPost helps founders use voice AI for authentic LinkedIn personal branding and lead generation without paying expensive ghostwriters.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-slate-100">About EchoPost</h1>
      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300 leading-relaxed text-lg">
        <p>
          EchoPost was built for one simple reason: <strong>Founders have brilliant insights, but zero time to format them for the LinkedIn algorithm.</strong>
        </p>
        <p>
          We noticed that the market was flooded with generic AI writing tools that generated robotic, soul-less text. We hated it. The algorithm hated it. According to <a href="https://www.linkedin.com/business/marketing/blog" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">LinkedIn's official marketing insights</a>, authentic, human-first content drives 3x more engagement than generic corporate posts.
        </p>
        <p>
          So we built a completely organic engine. We realized that the most authentic ideas come when you are just speaking naturally—during your commute, after a client call, or while grabbing coffee. EchoPost simply acts as your professional B2B translator, taking your raw audio and structuring it for maximum engagement while preserving 100% of your unique human tone.
        </p>
        
        <h2 className="text-3xl font-bold text-slate-100 mt-12 mb-6">Our Mission</h2>
        <p>
          To democratize personal branding. You shouldn't need to pay a ghostwriter $3,000 a month to share your industry expertise with the world. You just need a microphone and something valuable to say. By automating the heavy lifting of <Link href="/guides" className="text-cyan-400 hover:underline">PDF Carousel generation and SEO formatting</Link>, we give founders their time back.
        </p>

        <div className="mt-12 p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <h3 className="text-xl font-bold text-slate-200 mb-3">Join the Revolution</h3>
          <p className="text-base text-slate-400 mb-6">Ready to dominate your industry's feed? Reach out directly and let's scale your authority.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors">
            Contact the Founder
          </Link>
        </div>
      </div>
    </div>
  );
}
