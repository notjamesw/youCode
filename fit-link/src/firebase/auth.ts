import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from './firebase-config'; // Import auth object from firebase-config

const googleProvider = new GoogleAuthProvider();

export const onAuthStateChanged = (callback: (user: any) => void) => {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
}

// Function to log in with Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('Google login successful:', user);
    return user;
  } catch (error) {
    console.error('Google login failed:', error);
    throw new Error('Failed to log in with Google');
  }
};

// Function to log out the user
export const logout = async ()=> {
  try {
    return signOut(auth);
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}