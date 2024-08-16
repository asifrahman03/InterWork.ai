// app/components/ThemeToggle.js
'use client';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 bg-blue-500 text-white rounded-lg shadow-lg transition-colors hover:bg-blue-600 text-sm"
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}