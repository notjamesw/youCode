'use client';

import React, { useState } from 'react';
import { MoreVertical, Send, Mic, Clock } from 'lucide-react';

interface MessageProps {
    text: string;
    time: string;
    isUser: boolean;
    read: boolean;
}

interface DateSeparatorProps {
    date: string;
}

// Message Component
const Message: React.FC<MessageProps> = ({ text, time, isUser, read }) => {
  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
      <div className={`rounded-lg px-3 py-2 max-w-xs ${isUser ? 'bg-pink-100 rounded-br-none' : 'bg-gray-100 rounded-bl-none'}`}>
        <p className="text-sm">{text}</p>
      </div>
      <div className="flex items-center mt-1">
        <span className="text-xs text-gray-500">{time}</span>
        {isUser && read && (
          <span className="ml-1 text-pink-500 text-xs">✓</span>
        )}
      </div>
    </div>
  );
};

// Date Separator
const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="px-4 py-1 text-xs text-gray-500">
        {date}
      </div>
    </div>
  );
};


// Chat Detail Popup Component
const ChatDetailPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState('');
  
  // Sample conversation data
  const conversation = {
    contact: "Grace",
    subtitle: "Project Pride Connection",
    messages: [
      {
        id: 1,
        text: "Hi Jane, I saw you're looking for some climbing gear? I've got a bunch of extra equipment that I'd be happy to lend!",
        time: "2:55 PM",
        isUser: false,
        read: false,
        date: "Today"
      },
      {
        id: 2,
        text: "That would be incredible! I really appreciate your generosity Grace! We'll be extra careful :)",
        time: "3:02 PM",
        isUser: true,
        read: true,
        date: "Today"
      },
      {
        id: 3,
        text: "Ofc! I'll set up the swap :)",
        time: "3:30 PM",
        isUser: false,
        read: false,
        date: "Today"
      },
      {
        id: 4,
        text: "Great! Just let me know when you're free, I can swing by yours to grab it",
        time: "3:12 PM",
        isUser: true,
        read: true,
        date: "Today"
      }
    ]
  };

  let currentDate: string | null = null;

  return (
    <div className="w-screen text-black h-screen flex items-end justify-center z-50">
      <div className="bg-white w-full h-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <img 
              src="/images/pfp8.png" 
              alt={conversation.contact} 
              className="w-12 h-12 rounded-full mr-3" 
            />
            <div>
              <h2 className="font-bold text-lg">{conversation.contact}</h2>
              <p className="text-sm text-gray-500">{conversation.subtitle}</p>
            </div>
          </div>
          <button className="p-2">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>
        
        {/* Messages */}
        <div className="overflow-y-auto p-4">
          {conversation.messages.map((message, index) => {
            // Check if we need to add a date separator
            const showDateSeparator = currentDate !== message.date;
            if (showDateSeparator) {
              currentDate = message.date;
            }
            
            return (
              <React.Fragment key={message.id}>
                {showDateSeparator && <DateSeparator date={message.date} />}
                <Message 
                  text={message.text}
                  time={message.time}
                  isUser={message.isUser}
                  read={message.read}
                />
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Message Input */}
        <div className="p-3 flex items-center border-t border-gray-300 ">
          <input
            type="text"
            placeholder="Your message"
            className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="p-2 ml-2 text-gray-500">
            <Clock size={20} />
          </button>
          <button className="p-2 ml-1 text-gray-500">
            <Mic size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Add a simple animation for slide-up effect
const styleElement = document.createElement('style');
styleElement.textContent = `
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  .animate-slide-up {
    animation: slideUp 0.3s ease-out forwards;
  }
`;
document.head.appendChild(styleElement);

export default ChatDetailPopup;