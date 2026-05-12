import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = [
      'rgba(201, 132, 154,',
      'rgba(244, 167, 187,',
      'rgba(212, 168, 71,',
      'rgba(180, 130, 200,',
    ];

    const spawnOrb = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.5 + 0.1;
      const life = Math.random() * 120 + 80;
      orbsRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3,
        radius: Math.random() * 20 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0,
        life,
        maxLife: life,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (Math.random() < 0.15) {
        spawnOrb(e.clientX + (Math.random() - 0.5) * 40, e.clientY + (Math.random() - 0.5) * 40);
      }
    };

    // Spawn ambient orbs periodically
    const ambientInterval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      spawnOrb(x, y);
    }, 800);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Limit orbs
      if (orbsRef.current.length > 80) {
        orbsRef.current = orbsRef.current.slice(-80);
      }

      orbsRef.current = orbsRef.current.filter(orb => orb.life > 0);

      orbsRef.current.forEach(orb => {
        orb.life -= 1;
        const progress = 1 - orb.life / orb.maxLife;
        orb.opacity = progress < 0.3
          ? progress / 0.3 * 0.15
          : (1 - (progress - 0.3) / 0.7) * 0.15;

        orb.x += orb.vx;
        orb.y += orb.vy;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `${orb.color}${orb.opacity})`);
        gradient.addColorStop(0.5, `${orb.color}${orb.opacity * 0.5})`);
        gradient.addColorStop(1, `${orb.color}0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(ambientInterval);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
      }}
    />
  );
}
