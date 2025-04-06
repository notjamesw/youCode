'use client';

import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { user, signInWithGoogle, logout } = useAuth();

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