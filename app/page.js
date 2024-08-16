
// app/page.js
'use client';

import React from 'react';
import Sidebar from './components/sidebar';
import Chat from './components/Chat';
import { useTheme } from './context/ThemeContext';

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition-colors duration-200`}>
      <Sidebar />
      <div className="flex-grow p-4">
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