'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Fuse from 'fuse.js';
import axios from 'axios';

// Define your hard-coded responses in English
const hardCodedResponses = {
  'hello': 'Hello! I am Jinny, your AI assistant. How can I assist you today?',
  'what can you do?': 'I can assist you with your questions and provide information.',
  'hi': 'Hello! How can I help you today?',
  'how are you': 'I am just a program, but I am here to help you!',
  'whats your name': 'My name is Jinny. How can I assist you today?'
};

const Chat = () => {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userLang, setUserLang] = useState('fr'); // Default to French for example

  useEffect(() => {
    const sendIntroductoryMessage = async () => {
      const introMessage = 'Hello! How can I assist you today?';
      
      // Translate introductory message
      const translatedIntroMessage = await translateText(introMessage, userLang);
      
      const response = await axios.post('/api/faq', { question: translatedIntroMessage, isIntro: true });

      const botMessage = { text: await translateText(response.data.answer, userLang), user: false };
      setMessages([botMessage]);
    };

    sendIntroductoryMessage();
  }, [userLang]);

  const fuse = new Fuse(Object.keys(hardCodedResponses), {
    includeScore: true,
    threshold: 0.4,
  });

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);

    // Detect language of user input (for simplicity, set userLang manually)
    setUserLang('fr'); // Set to French for example

    // Fuzzy match input to hard-coded responses
    const result = fuse.search(input.toLowerCase());
    const matchedKey = result.length > 0 ? result[0].item : null;
    const hardCodedResponse = hardCodedResponses[matchedKey];

    let botMessage;
    if (hardCodedResponse) {
      // Translate hard-coded response
      const translatedResponse = await translateText(hardCodedResponse, userLang);
      botMessage = { text: translatedResponse, user: false };
    } else {
      // Fallback to API call and translate
      const response = await axios.post('/api/faq', { question: input });
      botMessage = { text: await translateText(response.data.answer, userLang), user: false };
    }

    setMessages(prevMessages => [...prevMessages, botMessage]);
    setInput('');
  };

  // Function to translate text
  const translateText = async (text, targetLang) => {
    try {
      const response = await axios.post('/api/translate', { text: text, targetLang: targetLang });
      return response.data.translated_text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }
  };

  return (
    <div className={`w-full max-w-4xl ${darkMode ? 'bg-zinc-700' : 'bg-slate-100'} rounded-lg shadow-xl p-4 sm:p-6`}>
      <div className="overflow-y-auto h-[50vh] sm:h-[70vh] mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-2 sm:p-3 rounded-lg max-w-[90%] sm:max-w-[80%] ${
                message.user ? 'bg-blue-500 text-white' : `${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`
              }`}
              dangerouslySetInnerHTML={{ __html: message.text }}
            >
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className={`flex-grow p-2 ${darkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-200 text-black border border-gray-300'} rounded-lg`}
          placeholder="Type your question here..."
        />
        <button 
          onClick={sendMessage} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;