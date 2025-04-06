import React, { useState } from 'react';

const ArcLinkBioPage = () => {
  interface FormData {
      name: string;
      pronouns: string;
      location: string;
      birthday: string;
      interests: string[];
  }
  
  const [formData, setFormData] = useState<FormData>({
      name: '',
      pronouns: '',
      location: '',
      birthday: '',
      interests: []
  });
  
  const [currentInterest, setCurrentInterest] = useState<string>('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        interests: [...(prev.interests || []), currentInterest.trim()]
      }));
  };
  
  const handleAddInterest = () => {
    if (currentInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, currentInterest.trim()]
      }));
      setCurrentInterest('');
    }
  };
  
  return (
    <div className="bg-black text-white min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-sm bg-white text-black rounded-lg overflow-hidden">
        <div className="p-4 relative">
          {/* Status bar */}
          <div className="flex justify-between text-black mb-6">
            <span>9:41</span>
            <div className="flex space-x-1">
              <span className="font-bold">•••</span>
              <span>📱</span>
            </div>
          </div>
          
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
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded text-sm"
            />
            
            <input 
              type="text" 
              placeholder="Pronouns" 
              name="pronouns"
              value={formData.pronouns}
              onChange={handleChange}
              className="w-full p-3 border rounded text-sm"
            />
            
            <input 
              type="text" 
              placeholder="Location" 
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border rounded text-sm"
            />
            
            <input 
              type="text" 
              placeholder="Birthday" 
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full p-3 border rounded text-sm"
            />
            
            <div className="flex items-center">
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
            </div>
            
            {formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest, idx) => (
                  <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {interest}
                  </span>
                ))}
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-gray-200 p-3 rounded text-black font-medium mt-4"
            >
              Login
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
            </p>
          </form>
          
          {/* Bottom indicator */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-300 rounded-full mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default ArcLinkBioPage;