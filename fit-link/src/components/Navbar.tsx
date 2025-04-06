'use client';

import Link from 'next/link';
import { LinkIcon, MessageCircle, Bookmark, User } from 'lucide-react';

export default function Navbar() {

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-300 z-50">
      <div className="flex justify-around items-center p-4 bg-white border-t">
        <Link href="/main" className="p-2 text-gray-500 hover:text-gray-800">
          <LinkIcon size={24} />
        </Link>
        <Link href="/message" className="p-2 text-gray-500 hover:text-gray-800">
          <MessageCircle size={24} />
        </Link>
        <Link href="/saved" className="p-2 text-gray-500 hover:text-gray-800">
          <Bookmark size={24} />
        </Link>
        <Link href="/profile" className="p-2 text-gray-500 hover:text-gray-800">
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
}