'use client';

import  { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { user, signInWithGoogle, signInWithEmail, loading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      console.log("User signed in with Google:", user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user);
      router.push('/main'); // Redirect to the main page after login
    }
  }, [user, router]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    try{
      await signInWithEmail(email, password);
    } catch (error) {
      console.error("Error signing in with email and password", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-white">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 w-32">
            <img src="images/logo.png" alt="Arc'teryx Logo" className="w-full" />
          </div>
          <h2 className="text-xl font-bold text-black">Arc'Link</h2>
        </div>
        
        <h2 className="mb-2 text-xl font-semibold text-center text-black">Login</h2>
        <p className="mb-6 text-sm text-center text-gray-600">
          Enter your email to sign up for this app
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="text-gray-400 w-full px-3 py-2 border border-gray-400 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              className="text-gray-400 w-full px-3 py-2 border border-gray-400 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 text-black bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            Login
          </button>
        </form>

        <div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 text-black bg-blue-200 rounded-xl mt-4 hover:bg-blue-300"
          >
            Sign in with Google
          </button>
        </div>
        
        <p className="mt-6 text-xs text-center text-gray-500">
          By clicking continue, you agree to our{' '}
          <a href="#" className="text-black underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-black underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}