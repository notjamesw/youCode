'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/firebase-config';
import { doc, setDoc } from 'firebase/firestore';

const ArcLinkBioPage = () => {
  const [name, setName] = useState<string>('');
  const [pronouns, setPronouns] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [interests, setInterests] = useState<string[]>([]);
  const [currentInterest, setCurrentInterest] = useState<string>('');

  const { user } = useAuth();

  const router = useRouter();
  
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleChangePronouns = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPronouns(e.target.value);
  }

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  }

    const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthday(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
         if (!user?.uid) {
            alert("You're not logged in.");
            return;
        }

        const bioData = {
            name,
            pronouns,
            location,
            birthday,
        };

        try {
            await setDoc(doc(db, 'bios', user.uid), bioData);
        } catch (error) {
            console.error("Failed to save bio:", error);
            alert("Something went wrong. Please try again.");
        }
        router.push('/profile'); // Redirect to the main dashboard page after submission
    }

  return (
    <div className="w-full h-screen bg-white text-black">
        <div className="p-4 relative">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <svg viewBox="0 0 100 60" className="w-16 h-16">
              <path 
                d="M10,30 L20,10 L40,15 L60,5 L70,15 L90,10 L80,30 L60,40 L40,30 L30,45 L10,30" 
                stroke="black" 
                strokeWidth="2" 
                fill="none" 
              />
              <path 
                d="M20,10 L30,20 M60,5 L50,15 M90,10 L80,20 M10,30 L20,35 L30,45 M60,40 L50,50" 
                stroke="black" 
                strokeWidth="1.5" 
                fill="none" 
              />
            </svg>
            <h1 className="text-xl font-bold mt-2">Arc'Link</h1>
            <p className="text-sm">Create your bio</p>
            <p className="text-xs text-gray-500">Answer some questions below</p>
          </div>
          
          {/* Profile pic placeholder */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center relative">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="absolute bottom-0 right-0 bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Name..." 
              name="name"
              value={name}
              onChange={handleChangeName}
              className="w-full p-3 border rounded text-sm"
            />
            
            <input 
              type="text" 
              placeholder="Pronouns" 
              name="pronouns"
              value={pronouns}
              onChange={handleChangePronouns}
              className="w-full p-3 border rounded text-sm"
            />
            
            <input 
              type="text" 
              placeholder="Location" 
              name="location"
              value={location}
              onChange={handleChangeLocation}
              className="w-full p-3 border rounded text-sm"
            />
            
            <input 
              type="text" 
              placeholder="Birthday" 
              name="birthday"
              value={birthday}
              onChange={handleChangeBirthday}
              className="w-full p-3 border rounded text-sm"
            />

            <button 
              onClick={handleSubmit}
              className="w-full bg-gray-200 p-3 rounded text-black font-medium mt-4"
            >
              Continue
            </button>
            
            {/* <div className="flex items-center">
              <input 
                type="text" 
                placeholder="I'm interested in ..." 
                value={currentInterest}
                onChange={(e) => setCurrentInterest(e.target.value)}
                className="w-full p-3 border rounded-l text-sm"
              />
              <button 
                type="button"
                onClick={handleAddInterest}
                className="bg-white p-3 border rounded-r border-l-0"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div> */}
          </form>
        </div>
    </div>
  );
};

export default ArcLinkBioPage;