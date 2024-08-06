'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebaseConfig';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignUp() {
  const router = useRouter();

  const handleAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/Chat'); 
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 md:p-8">
      <div className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg max-w-sm md:max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <GoogleIcon className="text-4xl md:text-5xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 md:mb-6">
          Sign Up / Sign In
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 text-center">
          Please sign in with your Google account to continue.
        </p>
        <button
          onClick={handleAuth}
          className="flex items-center justify-center w-full py-2 md:py-3 px-4 md:px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          <GoogleIcon className="mr-2" /> Sign In with Google
        </button>
      </div>
    </div>
  );
}