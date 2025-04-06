'use client';

import  { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { user, signInWithGoogle, logout, loading} = useAuth();
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
      console.log("User is logged in:", user);
      router.push('/main'); // Redirect to the main page after login
    }
  }, [user, router]);
  
  if(user) {
    return (
      <div>
        <h1>Welcome, {user.displayName || 'User'}!</h1>
        <p>You are logged in.</p>
        <button onClick={handleSignOut}>Sign Out</button>
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