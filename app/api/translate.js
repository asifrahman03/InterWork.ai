import { NextResponse } from 'next/server';

//end a POST request to the Hugging Face API to perform tasks like translation,
//summarization,etc 
//payload= parameters for huggingface API
async function query(payload) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/mbart-large-50-many-to-many-mmt",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  const result = await response.json();
  return result;
}

// detect the language of text using a Hugging Face language
async function detectLanguage(text) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/papluca/xlm-roberta-base-language-detection",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );
    const result = await response.json();
    const languageCode = result[0]?.language;
    return languageCode || 'en';
  } catch (error) {
    console.error('Language detection failed:', error);
    return 'en';
  }
}
//main handler function for a POST request. 
//It takes the  incoming request to either detectLanguage of a text or translatetext
export async function POST(request) {
  const { text, action, sourceLang, targetLang } = await request.json();

  try {
    if (action === 'detect') {
      const detectedLang = await detectLanguage(text);
      return NextResponse.json({ detectedLang });
    } else if (action === 'translate') {
      const payload = {
        inputs: text,
        parameters: {
          src_lang: sourceLang,
          tgt_lang: targetLang,
        },
      };
      const result = await query(payload);
      return NextResponse.json({ translatedText: result[0]?.translation_text || text });
    } else {
      throw new Error('Invalid action');
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}