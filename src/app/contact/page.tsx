import type { Metadata } from 'next';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact EchoPost Support | B2B Voice AI & Enterprise Plans',
  description: 'Get in touch with EchoPost for enterprise AI plans, custom integrations, or LinkedIn growth support. Email or WhatsApp our team for instant assistance.',
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-100">Get in Touch</h1>
      <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
        Have questions about Enterprise plans, custom integrations, or just want to say hi? We're all ears.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto">
        
        {/* Direct Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-200 mb-6">Direct Support</h2>
            <p className="text-slate-400 mb-8">We believe in human connections. Reach out to our founder directly via email or WhatsApp for priority B2B support.</p>
          </div>
          
          <div className="space-y-6">
            <a href="mailto:naveedkhtri7@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Mail className="text-cyan-400" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Email Us</p>
                <p className="text-lg font-semibold text-slate-200">naveedkhtri7@gmail.com</p>
              </div>
            </a>
            
            <a href="https://wa.me/923323219981" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-green-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">WhatsApp (Priority)</p>
                <p className="text-lg font-semibold text-slate-200">+92 332 321 9981</p>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl glass-panel shadow-2xl shadow-cyan-900/10">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Work Email</label>
              <input type="email" required className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea rows={5} required className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="How can we help you grow?"></textarea>
            </div>
            <button type="button" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/20">
              Send Message
            </button>
            <p className="text-xs text-slate-500 text-center mt-4">
              *Form submissions are securely routed to our support desk.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
