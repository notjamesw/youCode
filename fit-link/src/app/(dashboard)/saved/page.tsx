'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Paperclip, MessageCircle, Bookmark, User, Check } from 'lucide-react';

// Event Card Component
interface EventCardProps {
  title: string;
  host: string;
  date: string;
  time: string;
  groupSize: string;
  description: string;
  status: 'approved' | 'pending' | 'created';
}

const EventCard: React.FC<EventCardProps> = ({ title, host, date, time, groupSize, description, status }) => {
  // Status styling and indicator
  const getStatusStyle = () => {
    switch (status) {
      case 'approved':
        return 'text-purple-600';
      case 'pending':
        return 'text-gray-500';
      case 'created':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'approved':
        return (
          <div className="flex items-center">
            <span>Approved Request</span>
            <Check size={16} className="ml-1 text-purple-600" />
          </div>
        );
      case 'pending':
        return 'Pending request...';
      case 'created':
        return 'Created (check requests)';
      default:
        return '';
    }
  };

  return (
    <div className="p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm italic">
        {host} | {date} | {time} | {groupSize} Group
      </p>
      <p className="text-sm my-1">{description}</p>
      <p className={`text-right text-sm ${getStatusStyle()}`}>
        {getStatusText()}
      </p>
    </div>
  );
};

// Tab Component
interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-sm ${
        active 
          ? 'bg-black text-white rounded-full' 
          : 'text-gray-700'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default function SavedPage() {
    const { user, loading} = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('All');

    const events: EventCardProps[] = [
      {
        title: 'BMO Run Team',
        host: 'Jasmine Sol (Host)',
        date: '2025/05/05',
        time: '10AM',
        groupSize: '2/3',
        description: 'Looking for a team to train and participate in the BMO run.',
        status: 'approved'
      },
      {
        title: 'Gym Leg-Day',
        host: 'Penelope Anthony',
        date: '2025/06/18',
        time: '12AM',
        groupSize: '2/3',
        description: 'WHO TRYNA HIT LEGS!!!',
        status: 'approved'
      },
      {
        title: 'Climbing Volunteer - Climbing Mentorship Day',
        host: 'Max Verstappen',
        date: '2025/06/15',
        time: '9AM',
        groupSize: '1/3',
        description: "We're looking for experienced climbers to volunteer as mentors...",
        status: 'pending'
      },
      {
        title: 'Pilates trial',
        host: 'Saul Hough',
        date: '2025/05/26',
        time: '12PM',
        groupSize: '1/2',
        description: "I've always wanted to try Pilates, will anyone come with me?",
        status: 'created'
      },
      {
        title: 'Grouse Grind Trail Day',
        host: 'John Lo',
        date: '2025/05/25',
        time: '6AM',
        groupSize: '1/5',
        description: 'Anyone available to climb Grouse on this day?',
        status: 'pending'
      }
    ];
    
    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

      // Filter events based on active tab
  const filteredEvents = () => {
    if (activeTab === 'All') return events;
    
    return events.filter(event => {
      if (activeTab === 'Pending') return event.status === 'pending';
      if (activeTab === 'Requested') return event.status === 'approved';
      if (activeTab === 'Created') return event.status === 'created';
      return true;
    });
  };


  return (
    <div className="container max-w-screen min-h-screen bg-white pb-16">
      <div className ="text-black">
        <div className="max-w-screen mx-0 bg-white flex flex-col">
          {/* Header */}
          <div className="relative p-4 grid grid-cols-3 items-center">
            <div></div> {/* Left spacer */}
            <h1 className="text-xl font-bold text-black text-center">Arc'Link</h1>
            <div></div> {/* Right spacer */}
          </div>
        </div>
        <div className="flex justify-center space-x-2 p-2 border-b border-gray-300">
        {['All', 'Pending', 'Requested', 'Created'].map(tab => (
          <Tab
            key={tab}
            label={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      
      <div className="overflow-y-auto max-h-screen">
        {filteredEvents().map(event => (
          <EventCard
            title={event.title}
            host={event.host}
            date={event.date}
            time={event.time}
            groupSize={event.groupSize}
            description={event.description}
            status={event.status}
          />
        ))}
      </div>
      </div>
    </div>
  );
}