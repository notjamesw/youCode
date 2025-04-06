'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user} = useAuth();
    const router = useRouter();
  
    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
      return <p>Redirecting...</p>;
    }

  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
    </div>
  );
}
