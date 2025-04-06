'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function MessagesPage() {
    const { user} = useAuth();
    const router = useRouter();
    
    if (!user) {
        router.push('/login'); // Redirect to login if not authenticated
        return <p>Redirecting...</p>;
    }
  return (
    <div className="container">
      <h1>Messages Page</h1>
      <p>Your messages will appear here.</p>
    </div>
  );
}