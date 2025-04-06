'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface MessagePreviewProps {
    contact: string;
    lastMessage: string;
    time: string;
    unread: number;
    avatar: string;
}
// Message Component
const MessagePreview: React.FC<MessagePreviewProps> = ({ contact, lastMessage, time, unread, avatar}) => {
    const router = useRouter();
  return (
    <div 
      className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          if (contact.toLowerCase() === 'grace') {
            router.push('/message/chat');
          }
        }}
    >
      <div className="relative mr-4">
        <img 
          src={avatar} 
          alt={contact} 
          className="w-10 h-10 rounded-full object-cover"
        />
        {unread > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unread}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">{contact}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
      </div>
    </div>
  );
};

export default MessagePreview;