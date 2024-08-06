import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Store conversation history
let conversationHistory = [];

export async function POST(request) {
  const { question, isIntro } = await request.json();

  try {
    // If it's an introductory message, reset conversation history
    if (isIntro) {
      conversationHistory = [{ role: 'system', content: 'Hello! How can I assist you today?' }];
    }

    // Add the user question to the conversation history
    conversationHistory.push({ role: 'user', content: question });

    // Get the response from Groq
    const chatCompletion = await getGroqChatCompletion(conversationHistory);

    // Update the conversation history with the response
    const botMessage = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not process your question at this time.';
    conversationHistory.push({ role: 'assistant', content: botMessage });

    // Format the response
    let rawAnswer = formatBoldText(botMessage);
    const formattedAnswer = rawAnswer.split('\n').map(line => `<li>${line}</li>`).join('');

    return NextResponse.json({ answer: `<ul>${formattedAnswer}</ul>` });
  } catch (error) {
    console.error('Error fetching response:', error);
    return NextResponse.json({ answer: 'Sorry, I could not process your question at this time.' });
  }
}

async function getGroqChatCompletion(conversationHistory) {
  return groq.chat.completions.create({
    messages: conversationHistory,
    model: 'llama3-8b-8192',
  });
}

function formatBoldText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
