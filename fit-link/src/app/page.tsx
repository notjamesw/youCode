'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { user, signInWithGoogle, logout } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }

  const handleSignOut = async () => {
      try {
      await logout();
      } catch (error) {
      console.error("Error signing out", error);
      }
  }

  useEffect(() => {
    if (user) {
      router.push('/home'); // Redirect to home page if user is signed in
    }
  }, [user]);
  
  if(user) {
    return (
      <div>
        <h1>You are already signed in!</h1>
        <p>Welcome, {user.displayName || 'User'}!</p>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    );
  } else {
      return (
        <div>
        <h1>Please sign in to view content</h1>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
  }
}
