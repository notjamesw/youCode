'use client';

import Link from 'next/link';

export default function Navbar() {

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-300 z-50">
      <ul className="flex justify-around items-center py-2">
        <li>
          <Link href="/main">
            <img src="/images/link.png" alt="Home" className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link href="/message">
            <img src="/images/speechbubble.png" alt="Messages" className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link href="/saved">
            <img src="/images/bookmark.png" alt="Saved" className="w-6 h-6" />
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <img src="/images/profile.png" alt="Profile" className="w-6 h-6" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}