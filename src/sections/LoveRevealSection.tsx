import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LOVE_TEXT = 'I LOVE YOU';

// Pre-computed stable petal data
const PETALS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 37.3 + 5) % 100,
  width: (i % 8) + 8,
  height: (i % 10) + 10,
  rotate: (i * 47) % 360,
  fallDuration: (i % 10) + 8,
  fallDelay: (i * 0.4) % 5,
  swayDuration: (i % 3) + 2,
}));

// Pre-computed sparkle data
const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 13.7 + 3) % 100,
  y: 20 + (i * 7.3) % 60,
  size: (i % 4) + 3,
  delay: i * 0.3,
  color: i % 2 === 0
    ? `rgba(212, ${168 + (i % 40)}, 71, 0.9)`
    : `rgba(244, ${167 + (i % 30)}, 187, 0.9)`,
}));

function RosePetal({ petal }: { petal: typeof PETALS[0] }) {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: '-20px',
    left: `${petal.left}%`,
    width: `${petal.width}px`,
    height: `${petal.height}px`,
    background: `radial-gradient(ellipse at 30% 30%, rgba(255, 180, 190, 0.9), rgba(201, 132, 154, 0.7))`,
    borderRadius: '50% 0 50% 50%',
    transform: `rotate(${petal.rotate}deg)`,
    animation: `petal-fall ${petal.fallDuration}s linear ${petal.fallDelay}s infinite`,
    boxShadow: '0 2px 8px rgba(201, 132, 154, 0.3)',
  };
  return <div style={style} />;
}

function FloatSparkle({ sparkle }: { sparkle: typeof SPARKLES[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1.2, 0.8, 0],
        y: [0, -(60 + sparkle.id * 3)],
        x: [0, (sparkle.id % 2 === 0 ? 1 : -1) * (20 + sparkle.id * 2)],
      }}
      transition={{
        duration: 2 + (sparkle.id % 3) * 0.3,
        delay: sparkle.delay,
        repeat: Infinity,
        repeatDelay: (sparkle.id % 3) + 1,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        left: `${sparkle.x}%`,
        top: `${sparkle.y}%`,
        width: sparkle.size,
        height: sparkle.size,
        borderRadius: '50%',
        background: sparkle.color,
        boxShadow: `0 0 6px rgba(212, 168, 71, 0.7)`,
        pointerEvents: 'none',
      }}
    />
  );
}

export default function LoveRevealSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView && !revealed) {
      setTimeout(() => setRevealed(true), 300);
    }
  }, [inView, revealed]);

  return (
    <section
      ref={ref}
      className="section-full"
      style={{
        background: 'linear-gradient(180deg, #080818 0%, #1a0828 30%, #0f0520 60%, #080818 100%)',
        overflow: 'hidden',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Rose petals */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {PETALS.map(p => <RosePetal key={p.id} petal={p} />)}
      </div>

      {/* Sparkles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
        {SPARKLES.map(s => <FloatSparkle key={s.id} sparkle={s} />)}
      </div>

      {/* Large background bloom */}
      <motion.div
        animate={{
          opacity: revealed ? [0.3, 0.7, 0.3] : 0.1,
          scale: revealed ? [1, 1.15, 1] : 0.8,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          height: '70vh',
          background: 'radial-gradient(ellipse, rgba(244, 167, 187, 0.18) 0%, rgba(201, 132, 154, 0.06) 40%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Decorative corner arcs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 1.5 }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}
      >
        {/* Top-left arc */}
        <div style={{
          position: 'absolute', top: '8%', left: '8%',
          width: '80px', height: '80px',
          borderTop: '1px solid rgba(244, 167, 187, 0.2)',
          borderLeft: '1px solid rgba(244, 167, 187, 0.2)',
          borderRadius: '12px 0 0 0',
        }} />
        {/* Bottom-right arc */}
        <div style={{
          position: 'absolute', bottom: '8%', right: '8%',
          width: '80px', height: '80px',
          borderBottom: '1px solid rgba(244, 167, 187, 0.2)',
          borderRight: '1px solid rgba(244, 167, 187, 0.2)',
          borderRadius: '0 0 12px 0',
        }} />
      </motion.div>

      {/* Main content */}
      <div
        style={{
          position: 'relative', zIndex: 4,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 'clamp(16px, 4vh, 40px)',
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.05em' }}
          animate={revealed ? { opacity: 1, letterSpacing: '0.4em' } : {}}
          transition={{ duration: 1.5 }}
          className="font-cinzel"
          style={{
            fontSize: 'clamp(0.55rem, 1.5vw, 0.8rem)',
            color: 'rgba(244, 167, 187, 0.5)',
            textTransform: 'uppercase',
          }}
        >
          From the bottom of my heart
        </motion.div>

        {/* Top hearts */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {(['❤️', '💕', '❤️'] as const).map((emoji, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={revealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'inline-block',
                animation: revealed ? `heartbeat ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` : 'none',
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* I LOVE YOU — cinematic letter reveal */}
        <div
          className="font-cinzel"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 10rem)',
            fontWeight: 900,
            letterSpacing: '0.06em',
            lineHeight: 1,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.03em' }}>
            {LOVE_TEXT.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 70, scale: 0.4, filter: 'blur(12px)', rotateX: 60 }}
                animate={revealed ? {
                  opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', rotateX: 0,
                } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + i * 0.09,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-glow-blush"
                style={{
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                  color: '#f4a7bb',
                  textShadow: '0 0 40px rgba(244,167,187,0.9), 0 0 80px rgba(244,167,187,0.5), 0 0 120px rgba(244,167,187,0.3)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={revealed ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
            maxWidth: '380px',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(244,167,187,0.5))' }} />
          <span style={{ color: 'rgba(244, 167, 187, 0.8)', fontSize: '1rem' }}>♡</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(244,167,187,0.5))' }} />
        </motion.div>

        {/* Sub message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}
          style={{ maxWidth: '620px' }}
        >
          <p
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.9rem)',
              color: 'rgba(255, 255, 255, 0.72)',
              fontStyle: 'italic',
              lineHeight: 1.8,
            }}
          >
            "No matter how long the distance,
            <br />
            my heart has always been right next to yours."
          </p>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 2.0 }}
          style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '10px' }}
        >
          {(['💕', '❤️', '💕'] as const).map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.8, delay: i * 0.4 + 2, repeat: Infinity }}
              style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)' }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
