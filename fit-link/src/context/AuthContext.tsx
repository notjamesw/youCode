'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { auth } from '../firebase/firebase-config'; // Updated relative path

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>; // Add the new function
  signInWithEmail: (email: string, password: string) => Promise<void>; // Add email sign-in function
  createUserWithEmail: (email: string, password: string) => Promise<void>; // Add email registration function
  loading: boolean; // Add loading state to the context type
}

// Provide a default value that matches the AuthContextType
const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  logout: () => Promise.resolve(), // No-op promise
  signInWithGoogle: () => Promise.resolve(), // No-op promise
  signInWithEmail: () => Promise.resolve(), // No-op promise
  createUserWithEmail: () => Promise.resolve(), // No-op promise
  loading: false, // Default loading state
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

  const emailSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in with email and password", error);
    }
  }

  const registerWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
      console.error("Error registering with email and password", error);
    }
  };

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
    signInWithEmail: emailSignIn, // Add email sign-in function to the context value
    createUserWithEmail: registerWithEmail, // Add email registration function to the context value
    loading, // Add loading state to the context value
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