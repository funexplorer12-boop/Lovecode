import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle' | 'orb';
  opacity: number;
}

const HeartSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ opacity }}
  >
    <path
      d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
      fill="rgba(244, 167, 187, 0.8)"
      stroke="rgba(201, 132, 154, 0.4)"
      strokeWidth="0.5"
    />
  </svg>
);

const SparkleSVG = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ opacity }}
  >
    <path
      d="M12 2L13.5 9 20 12 13.5 15 12 22 10.5 15 4 12 10.5 9Z"
      fill="rgba(212, 168, 71, 0.8)"
      stroke="rgba(244, 220, 150, 0.4)"
      strokeWidth="0.5"
    />
  </svg>
);

export default function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: Array<'heart' | 'sparkle' | 'orb'> = ['heart', 'sparkle', 'orb'];
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 6,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      type: types[Math.floor(Math.random() * types.length)],
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-20px',
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.type === 'heart' && <HeartSVG size={p.size} opacity={p.opacity} />}
          {p.type === 'sparkle' && <SparkleSVG size={p.size} opacity={p.opacity} />}
          {p.type === 'orb' && (
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(201, 132, 154, ${p.opacity}) 0%, transparent 70%)`,
                boxShadow: `0 0 ${p.size}px rgba(201, 132, 154, 0.4)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
