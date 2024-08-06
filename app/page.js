// app/page.js
'use client';

import React from 'react';
import Sidebar from './components/sidebar';
import Chat from './components/Chat';
import { useTheme } from './context/ThemeContext';

export default function Home() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Sidebar />
      <div className="flex-grow p-4">
        <button 
          onClick={toggleTheme} 
          className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-lg shadow-lg transition-colors hover:bg-blue-600"
        >
          Toggle Theme
        </button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to the FAQ Bot</h1>
          <p className="text-lg mt-2">Ask any questions you have about our product or service, and get instant answers!</p>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <Chat />
        </div>
      </div>
    </div>
  );
}
