'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout, loading} = useAuth();
  const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

      const handleSignOut = async () => {
      try {
        await logout();

      } catch (error) {
      console.error("Error signing out", error);
      }
  }

  return (
    <div className="container bg-white text-black p-4 rounded-lg shadow-md">
      <h1>Profile Page</h1>
      {user && <p>Welcome, {user.displayName || 'User'}!</p>}
      <p>This is your profile page.</p>
      <button onClick={handleSignOut}>Logout</button>
      <button onClick={() => router.push('/bio')}>Go to Bio Page</button>
    </div>
  );
}