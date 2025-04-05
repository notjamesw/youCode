'use client';

import Link from 'next/link';

export default function Navbar() {

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t z-50">
      <ul className="flex justify-around items-center py-2">
        <li>
          <Link href="/" className="text-gray-500">Home</Link>
        </li>
        <li>
          <Link href="/profile" className="text-gray-500">Profile</Link>
        </li>
        <li>
          <Link href="/messages" className="text-gray-500">Messages</Link>
        </li>
      </ul>
    </nav>
  );
}