import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { OceanBackground } from './components/OceanBackground';
import { Fish } from './components/Fish';
import { RippleEffect } from './components/RippleEffect';
import { TypeWriter } from './components/TypeWriter';

const message = `For you whom smile as beautiful as the ocean,
I hope you always be showered by happiness
and always be surrounded by people who make you happy.
I'm sorry for everything.`;

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3');
    audio.loop = true;
    
    if (!isMuted) {
      audio.play().catch(() => {});
    }

    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      audio.pause();
      clearTimeout(timer);
    };
  }, [isMuted]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-900 overflow-hidden relative">
      <OceanBackground />
      <RippleEffect />
      
      {[...Array(5)].map((_, i) => (
        <Fish key={i} mousePosition={mousePosition} />
      ))}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl">
            <div className="text-white text-2xl font-light leading-relaxed">
              <TypeWriter text={message} delay={100} />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-4 right-4 z-20 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="text-white" size={24} />
        ) : (
          <Volume2 className="text-white" size={24} />
        )}
      </button>
    </div>
  );
}

export default App;