'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

type Bio = {
  name: string;
  pronouns: string;
  location: string;
  birthday: string;  // Optional if you want to allow missing birthday
};

export default function ProfilePage() {
  const { user, logout, loading} = useAuth();
  const router = useRouter();
  const [interests, setInterests] = useState([
    'Hiking', 'Weightlifting', 'Ice Climbing', 'Yoga', 'Climbing', 'Snowshoeing'
  ]);

  const [nickname, setNickname] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [location, setLocation] = useState('');
  const [birthday, setBirthday] = useState('');
  
  const [communities, setCommunities] = useState([
    { name: 'UBC YouCode', icon: '/path-to-icon.png', color: 'purple' },
    { name: 'Project Pride Climbing', icon: '/path-to-icon.png', color: 'pink' }
  ]);

  const [posts, setPosts] = useState([
    { 
      title: 'First Project Pride Climb In Banff!',
      date: 'Today',
      time: '7:03 am',
      communities: ['Project Pride Climbing'],
      image: '/path-to-image.png',
      likes: 12,
      comments: 5
    },
    { 
      title: 'In need of lifting buddies',
      date: 'Wednesday',
      time: '10:26 am',
      communities: ['UBC YouCode', 'Project Pride Climbing'],
      content: 'Hey guys! I\'ve been wanting to get back into lifting lately, but I\'m scared to go alone.',
      likes: 3,
      comments: 8
    },
    { 
      title: 'Looking for used climbing gear',
      date: 'Saturday',
      time: '10:05 pm',
      communities: ['Project Pride Climbing'],
      content: 'Hey folks! Trying to head to Squamish this weekend.',
      likes: 2,
      comments: 1
    }
  ]);

  useEffect(() => {
    const fetchBio = async () => {
      if (user?.uid) {
        try {
          const bio = await fetchUserBio(user.uid);
          
          // Safely setting the values in state
          setNickname(bio.name || '');
          setPronouns(bio.pronouns || '');
          setLocation(bio.location || '');
          setBirthday(bio.birthday || '');

          // Logging to check if the bio is retrieved correctly
          console.log('Bio fetched:', bio);
          console.log('Bio Name:', bio.name);
          console.log('Bio Pronouns:', bio.pronouns);
          console.log('Bio Location:', bio.location);
        } catch (error) {
          console.error('Error fetching bio:', error);
        }
      }
    };

    if (user) {
      fetchBio();
    }
  }, [user]); // Only run when `user` is available

  const fetchUserBio = async (uid: string): Promise<Bio> => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to fetch user bio');
    }

    return data.bio;
  };

  // Define the exact color options as a type
  type ColorOption = 'purple' | 'pink' | 'blue' | 'green' | 'red';

  // Define the Community type using this color option
  type Community = {
    name: string;
    icon: string;
    color: ColorOption;
  };

  // Create the color classes mapping with proper typing
  const colorClasses: Record<ColorOption, string> = {
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500'
  };


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleEditBio = () => {
    router.push('/bio'); // Redirect to the bio page
  }

  return (
    <div className="max-w-screen mx-0 bg-white flex flex-col">
      {/* Header */}
      <div className="relative p-4 grid grid-cols-3 items-center">
        <div></div> {/* Left spacer */}
        <h1 className="text-xl font-bold text-black text-center">Arc'Link</h1>
        <button className="text-black text-xl justify-self-end" onClick={handleEditBio}>Edit</button>
      </div>
      
      {/* Profile Header with Mountains */}
      <div className="relative flex-shrink-0">
        <div className="h-20 bg-gray-100 flex items-center justify-center">
          <svg className="w-full h-16 text-gray-300" viewBox="0 0 400 100">
            <path d="M0,100 L50,30 L100,70 L150,20 L200,50 L250,10 L300,60 L350,40 L400,90 L400,100 Z" 
                  fill="none" stroke="#D1D5DB" strokeWidth="3"/>
          </svg>
        </div>
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center -mt-10">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="text-black text-center mt-2">
            <h2 className="mt-2 text-xl font-bold">
              {nickname === '' ? user?.displayName : nickname}
            </h2>
            <p className="text-gray-500 text-sm">{pronouns}</p>
            <p className="text-gray-500 text-sm">{location}</p>
            <p className="text-gray-500 text-sm">{birthday}</p>
          </div>
        </div>
      </div>
      
      {/* Interest Tags */}
      <div className="px-4 mt-4 flex flex-wrap gap-2 justify-center">
        {interests.map((interest, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
            {interest}
          </span>
        ))}
      </div>
      
      {/* Communities */}
      <div className="px-4 mt-6 flex-shrink-0">
        <h3 className="font-bold text-black mb-2">Communities</h3>
        <div className="flex gap-2 overflow-x-auto">
          {communities.map((community, index) => (
            <div key={index} className="min-w-32 bg-gray-100 p-3 rounded-lg">
              <div className={`w-12 h-12 mx-auto rounded-full ${colorClasses[community.color as ColorOption]} flex items-center justify-center`}>
                <span className="text-white text-xs">{community.name.charAt(0)}</span>
              </div>
              <p className="text-center text-black text-sm mt-2">{community.name}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Posts */}
      <div className="px-4 mt-6 pb-16 text-black flex-grow overflow-y-auto">
        <h3 className="font-bold text-black mb-2">Posts</h3>
        {posts.map((post, index) => (
          <div key={index} className="border-2 border-gray-300 bg-gray-200 rounded-md py-3 my-4">
            <div className="flex justify-between">
              <h4 className="font-medium">{post.title}</h4>
              <div className="text-xs text-gray-500">
                <div>{post.date}</div>
                <div>{post.time}</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {post.communities.map((community, cIdx) => (
                <span key={cIdx} className="mr-2">#{community}</span>
              ))}
            </div>
            {post.image && (
              <div className="mt-2 h-32 bg-gray-200 rounded"></div>
            )}
            {post.content && (
              <p className="text-sm mt-2">{post.content}</p>
            )}
            <div className="flex mt-2">
              <button className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}