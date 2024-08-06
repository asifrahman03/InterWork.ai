// app/layout.js
'use client';

import { ThemeProvider } from './context/ThemeContext';
import './globals.css'; // Ensure global styles are imported

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
