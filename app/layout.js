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
          <body className="w-full min-h-screen transition-colors duration-200 dark:bg-gray-800 shadow-md">
            <header className='flex flex-col sm:flex-row justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200'>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">InterWork.ai</h1>
              <SignedIn>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
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
              <div className="flex items-center justify-center w-full h-screen p-4 sm:p-0">
                <div className="w-full max-w-sm sm:max-w-md">
                  <SignIn routing='hash' />
                </div>
              </div>
            </SignedOut>
            <SignedIn>
              <main className="w-full p-4">
                {children}
              </main>
            </SignedIn>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}