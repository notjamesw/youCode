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
        <h1 className="text-2xl font-bold">Saved</h1>
        <p className="mt-4">Your Saves posts are here.</p>
      </div>
    </div>
  );
}