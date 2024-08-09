'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Fuse from 'fuse.js';

// Define your hard-coded responses
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

  useEffect(() => {
    const sendIntroductoryMessage = async () => {
      const introMessage = 'Hello! How can I assist you today?';

      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: introMessage, isIntro: true }),
      });

      const data = await response.json();
      const botMessage = { text: data.answer, user: false };
      setMessages([botMessage]);
    };

    sendIntroductoryMessage();
  }, []);

  // Initialize Fuse.js with hard-coded responses
  const fuse = new Fuse(Object.keys(hardCodedResponses), {
    includeScore: true,
    threshold: 0.4, // Adjust threshold for fuzziness
  });

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);

    // Fuzzy match input to hard-coded responses
    const result = fuse.search(input.toLowerCase());
    const matchedKey = result.length > 0 ? result[0].item : null;
    const hardCodedResponse = hardCodedResponses[matchedKey];

    if (hardCodedResponse) {
      // Use hard-coded response
      const botMessage = { text: hardCodedResponse, user: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } else {
      // Fallback to API call
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.answer, user: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }

    setInput('');
  };

  return (
    <div className={`w-full max-w-4xl ${darkMode ? 'bg-zinc-700' : 'bg-slate-100'} rounded-lg shadow-xl p-6`}>
      <div className="overflow-y-auto h-[70vh] mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-3 rounded-lg max-w-[80%] ${
                message.user ? 'bg-blue-500 text-white' : `${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`
              }`}
              dangerouslySetInnerHTML={{ __html: message.text }}
            >
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
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
