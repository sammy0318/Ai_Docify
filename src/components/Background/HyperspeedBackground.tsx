import React, { useEffect, useRef } from 'react';
import './HyperspeedBackground.module.css';

interface HyperspeedBackgroundProps {
  darkMode: boolean;
}

const HyperspeedBackground: React.FC<HyperspeedBackgroundProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const stars: { x: number; y: number; z: number; prevZ?: number }[] = [];
    const count = 800;
    const speed = 0.5;

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = darkMode ? 'rgba(18, 18, 18, 0.2)' : 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
          star.z = 1000;
          star.prevZ = undefined;
        }

        const screenX = (star.x / star.z) * 500 + centerX;
        const screenY = (star.y / star.z) * 500 + centerY;
        const size = Math.max(0.5, (1000 - star.z) * 0.01);
        const brightness = Math.min(1, (1000 - star.z) / 500);

        if (star.prevZ) {
          ctx.beginPath();
          const prevScreenX = (star.x / star.prevZ) * 500 + centerX;
          const prevScreenY = (star.y / star.prevZ) * 500 + centerY;
          ctx.moveTo(prevScreenX, prevScreenY);
          ctx.lineTo(screenX, screenY);
          ctx.strokeStyle = darkMode
            ? `rgba(255, 255, 255, ${brightness * 0.8})`
            : `rgba(100, 100, 255, ${brightness * 0.8})`;
          ctx.lineWidth = size;
          ctx.stroke();
        }

        star.prevZ = star.z;

        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode
          ? `rgba(255, 255, 255, ${brightness})`
          : `rgba(100, 100, 255, ${brightness})`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [darkMode]);

  return <canvas ref={canvasRef} className="hyperspeed-background" />;
};

export default HyperspeedBackground;
