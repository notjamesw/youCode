import { ReactNode } from 'react';
import Navbar from '@/components/Navbar'; // Adjust the import path as necessary

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <Navbar /> {/* Place navbar at the bottom */}
    </div>
  );
}