import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Store conversation
let conversationHistory = [];

export async function POST(request) {
  const { question, isIntro } = await request.json();

  try {
    // If introductory message, reset conversation history
    if (isIntro) {
      const introduction = `
        Hello! I am Jinny, your Interview Bot. 
        I can help you with sample coding questions, HR questions, and technical managerial questions. 
        Feel free to ask anything related to these topics, and I'll do my best to assist you. 
        If you ask something outside these topics, I may not be able to help, but I'll let you know!
      `;
      conversationHistory = [{ role: 'system', content: introduction }];
    }

    // Add  user qsn to the convr history
    conversationHistory.push({ role: 'user', content: question });

    // prompt
    const promptTemplate = `
      You are an AI interview bot specialized in providing sample coding questions, HR questions, and technical managerial questions.
      Respond only to these topics. If the question is outside these domains, reply with:
      "I am sorry, I am not trained on it."
      
      Question: "${question}"
      
      Response:
    `;

    // Add the prompt to chat histry
    conversationHistory.push({ role: 'system', content: promptTemplate });

    // response fromgroq based on the prompt template
    const chatCompletion = await getGroqChatCompletion(conversationHistory);

    // Extract  bot's msg 
    const botMessage = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not process your question at this time.';

    // Updat history
    conversationHistory.push({ role: 'assistant', content: botMessage });

    // prettify output
    let rawAnswer = formatBoldText(botMessage);
    const formattedAnswer = rawAnswer.split('\n').map(line => `<li>${line}</li>`).join('');

    return NextResponse.json({ answer: `<ul>${formattedAnswer}</ul>` });
  } catch (error) {
    console.error('Error fetching response:', error);
    return NextResponse.json({ answer: 'Sorry, I could not process your question at this time.' });
  }
}
//model llama 3.1B
async function getGroqChatCompletion(conversationHistory) {
  return groq.chat.completions.create({
    messages: conversationHistory,
    model: 'llama3-8b-8192',
  });
}

function formatBoldText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
