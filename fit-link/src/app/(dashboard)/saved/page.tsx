'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SavedPage() {
    const { user, loading} = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

  return (
    <div className="container w-screen min-h-screen bg-white">
      <div className ="text-black">
        <div className="max-w-screen mx-0 bg-white flex flex-col">
          {/* Header */}
          <div className="relative p-4 grid grid-cols-3 items-center">
            <div></div> {/* Left spacer */}
            <h1 className="text-xl font-bold text-black text-center">Arc'Link</h1>
            <div></div> {/* Right spacer */}
          </div>
        </div>
        <h1 className="text-2xl font-bold">Saved</h1>
        <p className="mt-4">Your Saves posts are here.</p>
      </div>
    </div>
  );
}