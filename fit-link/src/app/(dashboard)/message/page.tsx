'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function MessagesPage() {
    const { user, loading} = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !user) {
        router.push('/');
      }
    }, [user, loading, router]);

  return (
    <div className="container">
      <h1>Messages Page</h1>
      <p>Your messages will appear here.</p>
    </div>
  );
}