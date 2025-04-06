'use client';

import { useEffect , useState} from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {StoryPost, RequestPost, TabButton} from '@/components/Posts';

export default function FeedPage() {
    const { user, loading} = useAuth();
    const [activeTab, setActiveTab] = useState('all');
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

  return (
    <div className="container relative max-w-screen min-h-screen bg-white">
      <div className ="text-black">
          <div className="max-w-screen mx-0 bg-white flex flex-col">
            {/* Header */}
            <div className="relative pt-2 grid grid-cols-3 items-center">
              <div></div> {/* Left spacer */}
              <h1 className="text-xl font-bold text-black text-center">Arc'Link</h1>
              <div></div> {/* Right spacer */}
            </div>

            {/* Navigation Tabs */}
            <div className="px-4 py-2 flex space-x-3 overflow-x-auto border-b border-gray-300">
              <button className="p-2 rounded-full bg-gray-100 text-black">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
              <TabButton 
                isActive={activeTab === 'all'} 
                onClick={() => setActiveTab('all')}
              >
                All
              </TabButton>
              <TabButton 
                isActive={activeTab === 'stories'} 
                onClick={() => setActiveTab('stories')}
              >
                Stories
              </TabButton>
              <TabButton 
                isActive={activeTab === 'events'} 
                onClick={() => setActiveTab('events')}
              >
                Events
              </TabButton>
              <TabButton 
                isActive={activeTab === 'requests'} 
                onClick={() => setActiveTab('requests')}
              >
                Requests
              </TabButton>
            </div>

            {/* Feed Content */}
            <div className="overflow-y-auto max-w-screen overflow-x-hidden">
              <StoryPost 
                author="Jane Doe"
                profileURL="/images/pfp10.png"
                timestamp="Today - 7:01 am"
                title="First Project Pride Climb In Banff!"
                content="Thrilled to kick off our very first Project Pride Climb in Banff! 🏔️ 🌈 Celebrating strength, unity, and inclusivity as we conquer new heights together. Here's to breaking barriers, making memories, and embracing our true selves. #PrideClimb #BanffAdventure #ProjectPride #ClimbForUnity"
                imageUrl="/images/iceclimb.jpg"
              />

              <RequestPost
                author="Sammy Hill"
                profileURL="/images/pfp9.png"
                timestamp="Yesterday - 3:30am"
                title="Would anyone be willing to lend me a sleeping bag?"
              />
              <StoryPost
                author="Max Verstappen"
                profileURL="/images/pfp1.png" // Replace with actual image path
                timestamp="Today • 7:01 am"
                title="Call for Experienced Climbers – LGBTQ+ Climbing Mentorship Day"
                content={`📍 Location: Smoke Bluffs Park, Squamish, BC \n
              📅 Date: Saturday, June 15 \n
              🕘 Time: 9:00 AM – 3:00 PM \n
              🧠 Hosted by: Climbers Together (2023 Arc’teryx Grant Recipient) \n
              🎯 Description:
              We're organizing a community climbing day focused on creating a safe, inclusive space for LGBTQ+ newcomers to the sport. We're looking for experienced climbers to volunteer as mentors, helping guide small groups through basic skills and top-rope routes.`}
                imageUrl="/images/climbing-event.jpg" // Replace with actual image path or use "/mnt/data/image.png" if directly referencing the uploaded file
              />
            </div>
          </div>
      </div>
    </div>

    // <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
    //   <div className="w-full max-w-md bg-white text-black rounded-lg overflow-hidden">
    //     {/* Header */}
    //     <div className="py-4 px-4 flex justify-center items-center border-b">
    //       <h1 className="text-xl font-bold">Arc'Link</h1>
    //     </div>

    //     {/* Navigation Tabs */}
    //     <div className="px-4 py-2 flex space-x-3 overflow-x-auto border-b">
    //       <button className="p-2 rounded-full bg-gray-100 text-black">
    //         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //           <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
    //         </svg>
    //       </button>
    //       <button className="px-4 py-2 rounded-full bg-black text-white font-medium">All</button>
    //       <button className="px-4 py-2 rounded-full text-gray-600 font-medium">Stories</button>
    //       <button className="px-4 py-2 rounded-full text-gray-600 font-medium">Events</button>
    //       <button className="px-4 py-2 rounded-full text-gray-600 font-medium">Requests</button>
    //     </div>

    //     {/* Feed Content */}
    //     <div className="overflow-y-auto">
    //       {/* Post 1 */}
    //       <div className="p-4 border-b">
    //         {/* User info */}
    //         <div className="flex items-center mb-3">
    //           <img src="/api/placeholder/40/40" alt="Jane Doe" className="w-10 h-10 rounded-full object-cover" />
    //           <div className="ml-3">
    //             <p className="font-medium">Jane Doe</p>
    //             <div className="flex items-center text-xs text-gray-500">
    //               <span>Today - 7:01 am</span>
    //               <span className="mx-1">•</span>
    //               <span className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">Story</span>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Post content */}
    //         <div>
    //           <h2 className="text-lg font-bold mb-1">First Project Pride Climb In Banff!</h2>
    //           <p className="text-sm mb-3">
    //             Thrilled to kick off our very first Project Pride Climb in Banff! 🏔️ 🌈 Celebrating strength, unity, and inclusivity as we conquer new heights together. Here's to breaking barriers, making memories, and embracing our true selves. #PrideClimb #BanffAdventure #ProjectPride #ClimbForUnity
    //           </p>
    //           <img 
    //             src="/api/placeholder/400/200" 
    //             alt="Group mountain climbing photo" 
    //             className="w-full h-48 object-cover rounded-lg mb-2"
    //           />
    //         </div>
    //       </div>

    //       {/* Post 2 */}
    //       <div className="p-4">
    //         {/* User info */}
    //         <div className="flex items-center mb-3">
    //           <img src="/api/placeholder/40/40" alt="Sammy Hill" className="w-10 h-10 rounded-full object-cover" />
    //           <div className="ml-3">
    //             <p className="font-medium">Sammy Hill</p>
    //             <div className="flex items-center text-xs text-gray-500">
    //               <span>Yesterday - 3:30am</span>
    //               <span className="mx-1">•</span>
    //               <span className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">Request</span>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Post content */}
    //         <div>
    //           <h2 className="text-lg font-bold">Would anyone be willing to lend me a sleeping bag?</h2>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Bottom Navigation
    //     <div className="flex justify-around items-center py-3 border-t bg-white">
    //       <button className="p-2">
    //         <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
    //         </svg>
    //       </button>
    //       <button className="p-2">
    //         <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    //         </svg>
    //       </button>
    //       <button className="p-2">
    //         <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    //         </svg>
    //       </button>
    //       <button className="p-2">
    //         <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    //         </svg>
    //       </button>
    //     </div> */}
    //   </div>
    // </div>
  );
}