'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [router]);
}
