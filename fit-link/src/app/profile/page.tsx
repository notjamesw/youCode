'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login'); // Redirect to login if not authenticated
    return <p>Redirecting...</p>;
  }

  return (
    <div className="container">
      <h1>Profile Page</h1>
      <p>Welcome, {user.displayName || 'User'}!</p>
      <p>This is your profile page.</p>
    </div>
  );
}