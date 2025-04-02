import React, { useEffect, useRef } from 'react';

interface Wave {
  y: number;
  length: number;
  amplitude: number;
  frequency: number;
}

export const OceanBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const waves: Wave[] = [
      { y: 0.3, length: 0.5, amplitude: 20, frequency: 0.02 },
      { y: 0.4, length: 0.7, amplitude: 30, frequency: 0.01 },
      { y: 0.5, length: 0.9, amplitude: 40, frequency: 0.015 }
    ];

    let frame = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWave = (wave: Wave) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * wave.y);

      for (let x = 0; x < canvas.width; x++) {
        const dx = x * wave.length;
        const y = Math.sin(dx + frame * wave.frequency) * wave.amplitude;
        ctx.lineTo(x, canvas.height * wave.y + y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      return ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach((wave, index) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(64, 169, 255, ${0.1 + index * 0.1})`);
        gradient.addColorStop(1, `rgba(13, 71, 161, ${0.1 + index * 0.1})`);
        ctx.fillStyle = gradient;
        drawWave(wave);
      });

      frame += 1;
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};