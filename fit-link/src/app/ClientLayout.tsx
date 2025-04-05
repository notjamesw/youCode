'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import BottomNavbar from '@/components/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (reg) => console.log('SW registered:', reg),
          (err) => console.error('SW registration failed:', err)
        );
      });
    }
  }, []);

  return (
    <AuthProvider>
      <main className="pb-16">{children}</main> {/* padding bottom for nav */}
      <BottomNavbar />
    </AuthProvider>
  );
}