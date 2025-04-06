'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/landing');
    }, 1000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [router]);

  return (
    <div className='w-full h-screen bg-white items-center justify-center flex'>
      <img src="/images/arclinklogo.png" alt="Logo" className="m-0" />
    </div>
  )
}
