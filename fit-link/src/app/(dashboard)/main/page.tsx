'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function MessagesPage() {
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
        <h1 className="text-2xl font-bold">Feed</h1>
        <p className="mt-4">This is the feed page.</p>
      </div>
    </div>
  );
}