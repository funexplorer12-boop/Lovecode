import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  active: boolean;
  angle: number;
}

const STAR_COLORS = [
  'rgba(255, 255, 255,',
  'rgba(220, 220, 255,',
  'rgba(255, 220, 220,',
  'rgba(255, 240, 200,',
  'rgba(200, 220, 255,',
];

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 2000);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random(),
        radius: Math.random() * 1.5 + 0.2,
        opacity: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));

      shootingStarsRef.current = Array.from({ length: 3 }, () => ({
        x: 0, y: 0, length: 0, speed: 0, opacity: 0, active: false, angle: 0,
      }));
    };

    const spawnShootingStar = () => {
      const s = shootingStarsRef.current.find(s => !s.active);
      if (!s) return;
      s.x = Math.random() * canvas.width * 0.7;
      s.y = Math.random() * canvas.height * 0.4;
      s.length = Math.random() * 120 + 80;
      s.speed = Math.random() * 8 + 4;
      s.opacity = 1;
      s.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      s.active = true;
    };

    let shootingInterval = setInterval(spawnShootingStar, 4000);

    const draw = (timestamp: number) => {
      timeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach(star => {
        const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * (0.6 + twinkle * 0.4);
        const r = star.radius * (0.8 + twinkle * 0.2);

        ctx.beginPath();
        ctx.arc(star.x, star.y, r, 0, Math.PI * 2);

        // Glow for larger stars
        if (star.radius > 1) {
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, r * 3);
          gradient.addColorStop(0, `${star.color}${alpha})`);
          gradient.addColorStop(0.5, `${star.color}${alpha * 0.3})`);
          gradient.addColorStop(1, `${star.color}0)`);
          ctx.fillStyle = gradient;
          ctx.arc(star.x, star.y, r * 3, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `${star.color}${alpha})`;
        }
        ctx.fill();
      });

      // Draw shooting stars
      shootingStarsRef.current.forEach(s => {
        if (!s.active) return;
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        const gradient = ctx.createLinearGradient(0, 0, s.length, 0);
        gradient.addColorStop(0, `rgba(255, 240, 220, 0)`);
        gradient.addColorStop(0.3, `rgba(255, 240, 220, ${s.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(s.length, 0);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.015;
        if (s.opacity <= 0) s.active = false;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(shootingInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
