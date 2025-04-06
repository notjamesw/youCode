'use client';

import { useEffect, useState} from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { MessageCircle, Search, Paperclip, Bookmark, User } from 'lucide-react';
import MessagePreview from '@/components/Message';

export default function MessagesPage() {
    const { user, loading} = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState([
      {
        id: 1,
        contact: 'Daniel',
        lastMessage: "I'll probably be there...",
        time: '24 min',
        unread: 1,
        avatar: '/images/pfp7.png'
      },
      {
        id: 2,
        contact: 'Grace',
        lastMessage: 'You: Great! Just let me...',
        time: '27 min',
        unread: 0,
        avatar: '/images/pfp8.png'
      },
      {
        id: 3,
        contact: 'Max',
        lastMessage: 'Ok, see you then.',
        time: '33 min',
        unread: 0,
        avatar: '/images/pfp1.png'
      },
      {
        id: 4,
        contact: 'Penelope',
        lastMessage: 'You: Hey! Down for a run...',
        time: '50 min',
        unread: 2,
        avatar: '/images/pfp2.png'
      },
      {
        id: 5,
        contact: 'Saul',
        lastMessage: "I'll probably be there...",
        time: '55 min',
        unread: 0,
        avatar: '/images/pfp3.png'
      },
      {
        id: 6,
        contact: 'Isaac',
        lastMessage: 'You: K! I will organize it...',
        time: '1 hour',
        unread: 0,
        avatar: '/images/pfp4.png'
      },
      {
        id: 7,
        contact: 'Veronica',
        lastMessage: 'Ok, see you then.',
        time: '1.5 hr',
        unread: 0,
        avatar: '/images/pfp5.png'
      },
      {
        id: 8,
        contact: 'Anya',
        lastMessage: '',
        time: '33 min',
        unread: 0,
        avatar: '/images/pfp6.png'
      }
    ]);
    
    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

  return (
    <div className="bg-white shadow-lg rounded-lg h-full">
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-bold text-center text-gray-800">Arc'Link</h1>
      </div>
      
      <div className="p-3 bg-white height-full">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      
      <div className="px-4 py-2 bg-white border-b">
        <h2 className="text-md font-semibold text-gray-800">Messages</h2>
      </div>
      
      <div className="overflow-y-auto">
        {messages.map(message => (
          <MessagePreview 
            key={message.id}
            contact={message.contact}
            lastMessage={message.lastMessage}
            time={message.time}
            unread={message.unread}
            avatar={message.avatar}
          />
        ))}
      </div>
    </div>
      );
}