'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User
} from 'firebase/auth';
import { auth } from '../firebase/firebase-config'; // Updated relative path

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>; // Add the new function
}

// Provide a default value that matches the AuthContextType
const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  logout: () => Promise.resolve(), // No-op promise
  signInWithGoogle: () => Promise.resolve(), // No-op promise
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setloading(true);
      if (user) {
        console.log('User is signed in:', user);
      }
      else {
        console.log('No user is signed in');
      }
      setloading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const value: AuthContextType = {
    user,
    logout,
    signInWithGoogle: googleSignIn, // Add it to the context value
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}