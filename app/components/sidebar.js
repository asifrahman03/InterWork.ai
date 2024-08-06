// app/components/Sidebar.js
'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';

const sidebar = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`w-64 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} h-screen p-4`}>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-4">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">About</a></li>
        <li><a href="#" className="hover:underline">Services</a></li>
        <li><a href="#" className="hover:underline">Contact</a></li>
      </ul>
    </div>
  );
};

export default sidebar;
