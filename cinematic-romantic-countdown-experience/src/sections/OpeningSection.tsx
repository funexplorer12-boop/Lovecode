import type React from 'react';
import { motion } from 'framer-motion';
import CountdownTimer from '../components/CountdownTimer';

function AnimatedTitle({ text, className, style }: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.045, ease: 'easeOut' }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function MistLayer() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Ambient orbs */}
      {[
        { x: '15%', y: '25%', size: 300, color: 'rgba(45, 10, 78, 0.5)', blur: 80, delay: 0 },
        { x: '75%', y: '60%', size: 250, color: 'rgba(201, 132, 154, 0.06)', blur: 60, delay: 1.5 },
        { x: '50%', y: '80%', size: 400, color: 'rgba(26, 8, 46, 0.8)', blur: 100, delay: 3 },
        { x: '85%', y: '15%', size: 200, color: 'rgba(212, 168, 71, 0.04)', blur: 50, delay: 2 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            opacity: [0.6, 1, 0.8, 0.6],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
          }}
        />
      ))}
    </div>
  );
}

function BackgroundImage() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/stars-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.18,
        filter: 'blur(2px) saturate(0.7)',
      }}
    />
  );
}

function DecorativeLines() {
  return (
    <>
      {/* Top left corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{
          position: 'absolute',
          top: '6%',
          left: '5%',
          width: '60px',
          height: '60px',
          borderTop: '1px solid rgba(201, 132, 154, 0.25)',
          borderLeft: '1px solid rgba(201, 132, 154, 0.25)',
        }}
      />
      {/* Top right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '6%',
          right: '5%',
          width: '60px',
          height: '60px',
          borderTop: '1px solid rgba(201, 132, 154, 0.25)',
          borderRight: '1px solid rgba(201, 132, 154, 0.25)',
        }}
      />
      {/* Bottom left corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '5%',
          width: '60px',
          height: '60px',
          borderBottom: '1px solid rgba(201, 132, 154, 0.25)',
          borderLeft: '1px solid rgba(201, 132, 154, 0.25)',
        }}
      />
      {/* Bottom right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '5%',
          width: '60px',
          height: '60px',
          borderBottom: '1px solid rgba(201, 132, 154, 0.25)',
          borderRight: '1px solid rgba(201, 132, 154, 0.25)',
        }}
      />
    </>
  );
}

function FloatingQuotes() {
  const quotes = [
    { text: '∞', x: '8%', y: '35%', size: '1.2rem', delay: 2 },
    { text: '♡', x: '92%', y: '40%', size: '1.1rem', delay: 2.5 },
    { text: '✦', x: '5%', y: '65%', size: '0.8rem', delay: 3 },
    { text: '✦', x: '95%', y: '70%', size: '0.8rem', delay: 3.5 },
  ];

  return (
    <>
      {quotes.map((q, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.15, 0.3] }}
          transition={{ duration: 4, delay: q.delay, repeat: Infinity, ease: 'easeInOut' }}
          className="font-garamond"
          style={{
            position: 'absolute',
            left: q.x,
            top: q.y,
            fontSize: q.size,
            color: 'rgba(201, 132, 154, 0.5)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {q.text}
        </motion.div>
      ))}
    </>
  );
}

export default function OpeningSection({ onCountdownEnd }: { onCountdownEnd: () => void }) {


  return (
    <section
      className="section-full"
      style={{
        background: 'linear-gradient(180deg, #020208 0%, #080818 30%, #0d0525 60%, #080818 80%, #020208 100%)',
        zIndex: 1,
        paddingTop: '5vh',
        paddingBottom: '15vh',
        position: 'relative',
      }}
    >
      <BackgroundImage />
      <MistLayer />
      <DecorativeLines />
      <FloatingQuotes />

      {/* Main center glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '50vh',
          background: 'radial-gradient(ellipse, rgba(201, 132, 154, 0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(16px, 3.5vh, 44px)',
          padding: '0 20px',
          textAlign: 'center',
          maxWidth: '1000px',
          width: '100%',
        }}
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ width: '30px', height: '1px', background: 'rgba(201, 132, 154, 0.4)' }} />
          <motion.span
            initial={{ letterSpacing: '0.1em', opacity: 0 }}
            animate={{ letterSpacing: '0.4em', opacity: 1 }}
            transition={{ duration: 2, delay: 0.2 }}
            className="font-cinzel"
            style={{
              fontSize: 'clamp(0.55rem, 1.5vw, 0.82rem)',
              color: 'rgba(201, 132, 154, 0.6)',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Counting Down to Us
          </motion.span>
          <div style={{ width: '30px', height: '1px', background: 'rgba(201, 132, 154, 0.4)' }} />
        </motion.div>

        {/* Main Heading */}
        <div style={{ lineHeight: 1.1 }}>
          <AnimatedTitle
            text="Until I Finally"
            className="font-garamond text-glow-white"
            style={{
              display: 'block',
              fontSize: 'clamp(2rem, 6.5vw, 6.5rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 300,
              fontStyle: 'italic',
              marginBottom: '4px',
            }}
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 1.0, ease: [0.23, 1, 0.32, 1] }}
            className="font-garamond gold-shimmer-text"
            style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 8.5vw, 8rem)',
              fontWeight: 700,
              fontStyle: 'italic',
            }}
          >
            Hold You Again…
          </motion.span>
        </div>

        {/* Divider with ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            maxWidth: '320px',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201, 132, 154, 0.5))' }} />
          <span style={{ color: 'rgba(201, 132, 154, 0.6)', fontSize: '0.7rem' }}>♡</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201, 132, 154, 0.5))' }} />
        </motion.div>

        {/* Timer */}
        <CountdownTimer onComplete={onCountdownEnd} />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="font-eb"
          style={{
            fontSize: 'clamp(0.95rem, 2.2vw, 1.4rem)',
            color: 'rgba(255, 255, 255, 0.35)',
            fontStyle: 'italic',
            maxWidth: '480px',
            lineHeight: 1.8,
          }}
        >
          "Distance taught me how precious you are."
        </motion.p>

        {/* Small decorative bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
        >
          {['✦', '❤️', '✦'].map((s, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
              style={{
                fontSize: i === 1 ? '0.9rem' : '0.65rem',
                color: 'rgba(201, 132, 154, 0.5)',
              }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 5,
        }}
      >
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="font-cinzel"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.35em',
            color: 'rgba(201, 132, 154, 0.5)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </motion.span>
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
          <rect x="1" y="1" width="16" height="26" rx="8" stroke="rgba(201, 132, 154, 0.3)" strokeWidth="1"/>
          <motion.circle
            cx="9" cy="7" r="3"
            fill="rgba(201, 132, 154, 0.6)"
            animate={{ cy: [7, 17, 7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
