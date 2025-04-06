import { ReactNode } from 'react';
import Navbar from '@/components/Navbar'; // Adjust the import path as necessary

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {children}
      <Navbar /> {/* Place navbar at the bottom */}
    </div>
  );
}