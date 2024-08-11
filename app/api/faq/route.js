import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//conversation history and context
let conversationHistory = [];
let companyName = '';   // storing company name if mentioned by a user

export async function POST(request) {
  const { question, isIntro } = await request.json();

  try {
    // If introductory message, reset conversation history and context
    if (isIntro) {
      const introduction = `
        Hello! I am Jinny, your Interview Bot. 
        I can help you with sample coding questions, HR questions, and technical managerial questions. 
        Feel free to ask anything related to these topics, and I'll do my best to assist you. 
        If you ask something outside these topics, I may not be able to help, but I'll let you know!
      `;
      conversationHistory = [{ role: 'system', content: introduction }];
      companyName = ''; // Reset company name
    }

    // Check if the user mentions a company and store it
    const companyMatch = question.match(/interview at ([a-zA-Z\s]+)/i);
    if (companyMatch) {
      companyName = companyMatch[1].trim();
    }

    // Add  user quesn to  history
    conversationHistory.push({ role: 'user', content: question });

    // Adjust prompt template based on the company name
    let companyClause = companyName ? ` specific to ${companyName}` : '';
    const promptTemplate = `
      You are an AI interview bot specialized in providing sample coding questions, HR questions, and technical managerial questions.
      Respond only to these topics${companyClause}. If the question is outside these domains, reply with:
      "I am sorry, I am not trained on it."
      
      Question: "${question}"
      
      Response:
    `;

    // Add prompt to conversation history
    conversationHistory.push({ role: 'system', content: promptTemplate });

    // Get response from Groq based on prompt template
    const chatCompletion = await getGroqChatCompletion(conversationHistory);

    // Extract the bot's message from the completion
    const botMessage = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not process your question at this time.';

    // Update the conversation history with the response
    conversationHistory.push({ role: 'assistant', content: botMessage });

    // Prettify the output
    let rawAnswer = formatBoldText(botMessage);
    const formattedAnswer = rawAnswer.split('\n').map(line => `<li>${line}</li>`).join('');

    return NextResponse.json({ answer: `<ul>${formattedAnswer}</ul>` });
  } catch (error) {
    console.error('Error fetching response:', error);
    return NextResponse.json({ answer: 'Sorry, I could not process your question at this time.' });
  }
}

// Llama 3.1B model
async function getGroqChatCompletion(conversationHistory) {
  return groq.chat.completions.create({
    messages: conversationHistory,
    model: 'llama3-8b-8192',
  });
}

function formatBoldText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// import { NextResponse } from 'next/server';
// import Groq from 'groq-sdk';

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // Store conversation
// let conversationHistory = [];

// export async function POST(request) {
//   const { question, isIntro } = await request.json();

//   try {
//     // If introductory message, reset conversation history
//     if (isIntro) {
//       const introduction = `
//         Hello! I am Jinny, your Interview Bot. 
//         I can help you with sample coding questions, HR questions, and technical managerial questions. 
//         Feel free to ask anything related to these topics, and I'll do my best to assist you. 
//         If you ask something outside these topics, I may not be able to help, but I'll let you know!
//       `;
//       conversationHistory = [{ role: 'system', content: introduction }];
//     }

//     // Add  user qsn to the convr history
//     conversationHistory.push({ role: 'user', content: question });

//     // prompt
//     const promptTemplate = `
//       You are an AI interview bot specialized in providing sample coding questions, HR questions, and technical managerial questions.
//       Respond only to these topics. If the question is outside these domains, reply with:
//       "I am sorry, I am not trained on it."
      
//       Question: "${question}"
      
//       Response:
//     `;

//     // Add the prompt to chat histry
//     conversationHistory.push({ role: 'system', content: promptTemplate });

//     // response fromgroq based on the prompt template
//     const chatCompletion = await getGroqChatCompletion(conversationHistory);

//     // Extract  bot's msg 
//     const botMessage = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not process your question at this time.';

//     // Updat history
//     conversationHistory.push({ role: 'assistant', content: botMessage });

//     // prettify output
//     let rawAnswer = formatBoldText(botMessage);
//     const formattedAnswer = rawAnswer.split('\n').map(line => `<li>${line}</li>`).join('');

//     return NextResponse.json({ answer: `<ul>${formattedAnswer}</ul>` });
//   } catch (error) {
//     console.error('Error fetching response:', error);
//     return NextResponse.json({ answer: 'Sorry, I could not process your question at this time.' });
//   }
// }
// //model llama 3.1B
// async function getGroqChatCompletion(conversationHistory) {
//   return groq.chat.completions.create({
//     messages: conversationHistory,
//     model: 'llama3-8b-8192',
//   });
// }

// function formatBoldText(text) {
//   return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
// }
