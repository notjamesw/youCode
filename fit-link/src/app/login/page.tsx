'use client';

import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }

  return (
    <div>
      <h1>Please sign in to view content</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
}