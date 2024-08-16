
'use client';
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <html lang="en">
          <body className="w-full min-h-screen transition-colors duration-200">
            <header className='flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200'>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">InterWork.ai</h1>
              <SignedIn>
                <div className="flex flex-col items-end space-y-2">
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10",
                        userButtonOuterIdentifier: "text-sm font-medium text-gray-800 dark:text-white",
                      }
                    }}
                    showName={true}
                  />
                  <ThemeToggle />
                </div>
              </SignedIn>
            </header>
            <SignedOut>
              <div className="flex items-center justify-center w-full h-screen">
                <SignIn routing='hash' />
              </div>
            </SignedOut>
            <SignedIn>
              <main className="w-full">
                {children}
              </main>
            </SignedIn>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}