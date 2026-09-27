import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as Blob;

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API Key not configured' }, { status: 500 });
    }

    // 1. Transcribe Audio using Groq Whisper
    const groqFormData = new FormData();
    
    // Check mime type to assign correct extension (Crucial for iOS Support)
    const mimeType = audioFile.type || '';
    let ext = 'webm';
    if (mimeType.includes('mp4') || mimeType.includes('m4a')) ext = 'm4a';
    else if (mimeType.includes('ogg')) ext = 'ogg';
    else if (mimeType.includes('wav')) ext = 'wav';
    else if (mimeType.includes('mpeg') || mimeType.includes('mp3')) ext = 'mp3';

    groqFormData.append('file', audioFile, `audio.${ext}`);
    groqFormData.append('model', 'whisper-large-v3-turbo');
    groqFormData.append('response_format', 'json');

    const whisperRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: groqFormData
    });

    if (!whisperRes.ok) {
      const err = await whisperRes.text();
      console.error('Whisper Error:', err);
      return NextResponse.json({ error: 'Failed to transcribe audio. Ensure mic has access.' }, { status: 500 });
    }

    const whisperData = await whisperRes.json();
    const transcript = whisperData.text;

    if (!transcript || transcript.trim().length < 2) {
       return NextResponse.json({ error: 'Audio was too short or empty. Please speak clearly.' }, { status: 400 });
    }

    // 2. Generate LinkedIn Post & Slides using Groq LLaMA
    const prompt = `You are an expert B2B LinkedIn ghostwriter for SaaS founders and agency owners. 
    Turn the following raw voice transcript into a viral LinkedIn post and a 5-slide PDF carousel.
    
    Transcript: "${transcript}"
    
    Respond ONLY with a valid JSON object matching this schema:
    {
      "post": "The full text for the LinkedIn caption, formatted beautifully with line breaks. No hashtags.",
      "slides": [
        { "title": "Slide 1 Hook", "content": "Bold statement or question" },
        { "title": "Slide 2 Context", "content": "Why does this matter?" },
        { "title": "Slide 3 Insight", "content": "The core lesson" },
        { "title": "Slide 4 Example", "content": "Actionable takeaway" },
        { "title": "Slide 5 CTA", "content": "Call to action for the comments" }
      ]
    }`;

    const chatRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!chatRes.ok) {
      const err = await chatRes.text();
      console.error('LLaMA Error:', err);
      return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }

    const chatData = await chatRes.json();
    const resultContent = chatData.choices[0].message.content;
    const parsedResult = JSON.parse(resultContent);

    return NextResponse.json({
      transcript: transcript,
      post: parsedResult.post,
      slides: parsedResult.slides
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
