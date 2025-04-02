import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

export const RippleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createRipple = (x: number, y: number) => {
      ripples.current.push({ x, y, size: 0, alpha: 1 });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.size, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
        ctx.stroke();
        
        ripple.size += 2;
        ripple.alpha *= 0.95;

        if (ripple.alpha < 0.01) {
          ripples.current.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    const handleClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('click', handleClick);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
};