import React, { useEffect, useRef } from 'react';
import { Fish as FishIcon } from 'lucide-react';

interface FishProps {
  mousePosition: { x: number; y: number };
}

export const Fish: React.FC<FishProps> = ({ mousePosition }) => {
  const fishRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!fishRef.current) return;

      const targetX = mousePosition.x;
      const targetY = mousePosition.y;
      
      const dx = targetX - positionRef.current.x;
      const dy = targetY - positionRef.current.y;
      
      velocityRef.current.x += dx * 0.01;
      velocityRef.current.y += dy * 0.01;
      
      velocityRef.current.x *= 0.95;
      velocityRef.current.y *= 0.95;
      
      positionRef.current.x += velocityRef.current.x;
      positionRef.current.y += velocityRef.current.y;

      const rotation = Math.atan2(velocityRef.current.y, velocityRef.current.x);
      
      fishRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) rotate(${rotation}rad)`;
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  return (
    <div
      ref={fishRef}
      className="fixed pointer-events-none transition-transform duration-300 ease-out"
      style={{ transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)` }}
    >
      <FishIcon
        className="text-blue-400/50 animate-pulse"
        size={24}
      />
    </div>
  );
};