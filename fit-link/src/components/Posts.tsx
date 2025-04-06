'use client';
import React from 'react';

export interface PostProps {
  author: string;
  timestamp: string;
  type: string;
  children: React.ReactNode;
}

export interface StoryPostProps {
  author: string;
  timestamp: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface RequestPostProps {
  author: string;
  timestamp: string;
  title: string;
}

export interface TabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}


// Post Component
const Post: React.FC<PostProps> = ({ author, timestamp, type, children }) => {
  return (
    <div className="p-4 border-b">
      {/* User info */}
      <div className="flex items-center mb-3">
        <img 
          src="/api/placeholder/40/40" 
          alt={author} 
          className="w-10 h-10 rounded-full object-cover" 
        />
        <div className="ml-3">
          <p className="font-medium">{author}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>{timestamp}</span>
            <span className="mx-1">•</span>
            <span className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">{type}</span>
          </div>
        </div>
      </div>

      {/* Post content */}
      <div>{children}</div>
    </div>
  );
};

// Story Post Component
const StoryPost: React.FC<StoryPostProps> = ({ author, timestamp, title, content, imageUrl }) => {
  return (
    <Post author={author} timestamp={timestamp} type="Story">
      <h2 className="text-lg font-bold mb-1">{title}</h2>
      <p className="text-sm mb-3">{content}</p>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={`${title} image`} 
          className="w-full h-48 object-cover rounded-lg mb-2"
        />
      )}
    </Post>
  );
};

// Request Post Component
const RequestPost: React.FC<RequestPostProps> = ({ author, timestamp, title }) => {
  return (
    <Post author={author} timestamp={timestamp} type="Request">
      <h2 className="text-lg font-bold">{title}</h2>
    </Post>
  );
};

// Navigation Tab Component
const TabButton: React.FC<TabButtonProps> = ({ children, isActive, onClick }) => {
  return (
    <button 
      className={`px-4 py-2 rounded-full font-medium ${
        isActive ? 'bg-black text-white' : 'text-gray-600'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Post, StoryPost, RequestPost, TabButton };