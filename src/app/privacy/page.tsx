export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-10 text-slate-100">Privacy Policy</h1>
      <div className="prose prose-invert prose-slate space-y-6 text-slate-400 text-sm leading-relaxed">
        <p>Last Updated: September 2026</p>
        
        <h2 className="text-xl font-semibold text-slate-200 mt-8 mb-4">1. Data Collection & Voice Recordings</h2>
        <p>
          At EchoPost, your voice is your intellectual property. When you record audio using our platform, the audio data is temporarily processed to generate text transcripts. We DO NOT store raw audio files on our servers after the transcription process is complete.
        </p>

        <h2 className="text-xl font-semibold text-slate-200 mt-8 mb-4">2. AI Training</h2>
        <p>
          We explicitly opt out of using our customers' proprietary data and generated posts to train foundational LLMs. Your industry secrets, client stories, and unique insights remain exclusively yours.
        </p>

        <h2 className="text-xl font-semibold text-slate-200 mt-8 mb-4">3. Third-Party Integrations</h2>
        <p>
          To publish directly to your feed, we authenticate with LinkedIn via their official API (OAuth 2.0). We do not store your LinkedIn passwords. We only request the minimum permissions required to post on your behalf.
        </p>
      </div>
    </div>
  );
}
