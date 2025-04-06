import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function CreateAccountPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Account creation attempt with:', { email, password });
    // Add your account creation logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md px-6 py-8 bg-white text-black rounded-lg">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4 w-32">
            <img src="images/logo.png" alt="Arc'teryx Logo" className="w-full" />
          </div>
          <h2 className="text-xl font-bold text-black">Arc'Link</h2>
        </div>
        
        {/* Form Title and Description */}
        <div className="text-center mb-6 text-black">
          <h3 className="text-lg font-semibold">Create an account</h3>
          <p className="text-sm text-gray-600">Enter your email to sign up for this app</p>
        </div>
        
        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-md" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gray-200 text-black rounded-md hover:bg-gray-300"
          >
            Create
          </button>
        </form>
        
        {/* Terms */}
        <div className="mt-6 text-center text-xs text-gray-500">
          By clicking continue, you agree to our{' '}
          <a href="#" className="underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};