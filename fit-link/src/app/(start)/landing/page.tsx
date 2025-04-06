'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const router = useRouter();

    const handleLoginIn = async () => {
        router.push('/login');
    }

    const handleRegister = async () => {
        router.push('/register');
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md px-6 py-8 bg-white text-black rounded-lg">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 w-32">
            <img src="images/logo.png" alt="Arc'teryx Logo" className="w-full" />
          </div>
          <h2 className="text-xl font-bold">Arc'Link</h2>
        </div>
        
        {/* Buttons */}
        <div className="space-y-4">
          <button onClick={handleRegister}
            className="w-full py-3 bg-black text-white rounded-md">
            Create an account
          </button>
          
          <div className="flex items-center justify-center my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          
          <button onClick={handleLoginIn} className="w-full py-3 bg-gray-200 text-black rounded-md">
            Login
          </button>
        </div>
        
        {/* Terms */}
        <div className="mt-8 text-center text-xs text-gray-500">
          By clicking continue, you agree to our{' '}
          <a href="#" className="underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};