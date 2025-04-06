'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout, loading} = useAuth();
  const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/');
      }
    }, [user, loading, router]);

  return (
    <div className="container">
      <h1>Profile Page</h1>
      {user && <p>Welcome, {user.displayName || 'User'}!</p>}
      <p>This is your profile page.</p>
    </div>
  );
}