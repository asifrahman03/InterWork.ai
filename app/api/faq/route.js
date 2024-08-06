import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  const { question } = await request.json();

  try {
    const chatCompletion = await getGroqChatCompletion(`My name is [Your Name]. ${question}`);

    // Format the response to include bullet points and bold text
    let rawAnswer = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not process your question at this time.';
    rawAnswer = formatBoldText(rawAnswer);
    const formattedAnswer = rawAnswer.split('\n').map(line => `<li>${line}</li>`).join('');

    return NextResponse.json({ answer: `<ul>${formattedAnswer}</ul>` });
  } catch (error) {
    console.error('Error fetching response:', error);
    return NextResponse.json({ answer: 'Sorry, I could not process your question at this time.' });
  }
}

async function getGroqChatCompletion(question) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
    model: 'llama3-8b-8192',
  });
}

function formatBoldText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
