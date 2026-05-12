import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function InteractiveHeart() {
  const [clicked, setClicked] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [burst, setBurst] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    if (!clicked) setClicked(true);
    setPulseCount(p => p + 1);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBursts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x, y,
    }));
    setBurst(prev => [...prev, ...newBursts]);
    setTimeout(() => setBurst(prev => prev.filter(b => !newBursts.find(n => n.id === b.id))), 1200);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} onClick={handleClick}>
      {/* Burst particles */}
      <AnimatePresence>
        {burst.map((b, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const distance = 60 + Math.random() * 40;
          return (
            <motion.div
              key={b.id + i}
              initial={{ opacity: 1, scale: 1, x: b.x, y: b.y }}
              animate={{
                opacity: 0,
                scale: 0.5,
                x: b.x + Math.cos(angle) * distance,
                y: b.y + Math.sin(angle) * distance,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i % 2 === 0 ? '#f4a7bb' : '#d4a847',
                pointerEvents: 'none',
                zIndex: 10,
                boxShadow: `0 0 6px ${i % 2 === 0 ? '#f4a7bb' : '#d4a847'}`,
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Main heart */}
      <motion.div
        className="heart-throb"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          fontSize: 'clamp(5rem, 15vw, 12rem)',
          userSelect: 'none',
          cursor: 'none',
          lineHeight: 1,
          filter: clicked
            ? 'drop-shadow(0 0 40px rgba(244,167,187,1)) drop-shadow(0 0 80px rgba(201,132,154,0.8))'
            : 'drop-shadow(0 0 20px rgba(244,167,187,0.6))',
          transition: 'filter 0.5s ease',
        }}
      >
        ❤️
      </motion.div>

      {/* Pulse rings on click */}
      <AnimatePresence>
        {pulseCount > 0 && (
          <motion.div
            key={pulseCount}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(244, 167, 187, 0.6)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Click hint */}
      {!clicked && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="font-cinzel"
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'rgba(201, 132, 154, 0.6)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          Touch my heart
        </motion.p>
      )}
    </div>
  );
}

export default function FinalSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setHearts(
        Array.from({ length: 25 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 12 + 8,
          delay: Math.random() * 8,
          opacity: Math.random() * 0.4 + 0.15,
        }))
      );
    }
  }, []);

  return (
    <section
      ref={ref}
      className="section-full"
      style={{
        background: 'linear-gradient(180deg, #080818 0%, #1a0a10 20%, #250a0a 50%, #1a0810 80%, #0a0505 100%)',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      {/* Background image blend */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/golden-sunset.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.07,
          filter: 'blur(4px)',
          zIndex: 0,
        }}
      />

      {/* Golden ambient glow */}
      <motion.div
        animate={{
          opacity: inView ? [0.2, 0.4, 0.2] : 0,
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '60%',
          background: 'radial-gradient(ellipse at center bottom, rgba(212, 168, 71, 0.15) 0%, rgba(201, 132, 154, 0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Floating hearts */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
        {hearts.map(h => (
          <div
            key={h.id}
            style={{
              position: 'absolute',
              left: `${h.x}%`,
              bottom: '-30px',
              fontSize: `${h.size}px`,
              animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
              opacity: h.opacity,
              filter: 'drop-shadow(0 0 4px rgba(244,167,187,0.4))',
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(24px, 5vh, 56px)',
          textAlign: 'center',
          padding: '0 20px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.05em' }}
          animate={inView ? { opacity: 1, letterSpacing: '0.4em' } : {}}
          transition={{ duration: 2 }}
          className="font-cinzel"
          style={{
            fontSize: 'clamp(0.55rem, 1.5vw, 0.8rem)',
            color: 'rgba(212, 168, 71, 0.6)',
            textTransform: 'uppercase',
          }}
        >
          Always & Forever
        </motion.div>

        {/* Main quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <p
            className="font-garamond"
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 3.2rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.5,
            }}
          >
            "And if I had to wait all over again…
            <br />
            <motion.span
              animate={inView ? { color: ['rgba(255,255,255,0.9)', 'rgba(244,167,187,0.9)', 'rgba(255,255,255,0.9)'] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              style={{ display: 'inline-block' }}
            >
              I still would.
            </motion.span>
            <br />
            For you."
          </p>
        </motion.div>

        {/* Interactive Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ position: 'relative', padding: '40px 0' }}
        >
          <InteractiveHeart />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          style={{
            width: '250px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212, 168, 71, 0.6), rgba(244, 167, 187, 0.6), transparent)',
          }}
        />

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.23, 1, 0.32, 1] }}
        >
          {["I'll choose you.", 'Again.', 'And again.', 'And again.'].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="font-garamond"
              style={{
                fontSize: i === 0
                  ? 'clamp(1.5rem, 4vw, 3rem)'
                  : 'clamp(1.2rem, 3vw, 2.2rem)',
                color: i === 0
                  ? '#f4a7bb'
                  : `rgba(244, 167, 187, ${0.9 - i * 0.1})`,
                fontStyle: 'italic',
                fontWeight: i === 0 ? 600 : 400,
                lineHeight: i === 0 ? 1.3 : 1.8,
                textShadow: '0 0 30px rgba(244, 167, 187, 0.4)',
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 2.5 }}
          style={{ marginTop: '20px' }}
        >
          <div className="rose-divider" style={{ width: '200px', margin: '0 auto 20px' }} />
          <p
            className="font-cinzel gold-shimmer-text"
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)',
              letterSpacing: '0.15em',
              fontWeight: 500,
            }}
          >
            Counting Down to Us
          </p>
          <p
            className="font-eb"
            style={{
              fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
              color: 'rgba(255, 255, 255, 0.25)',
              marginTop: '8px',
              fontStyle: 'italic',
            }}
          >
            Every second apart felt endless…
            but every second now brings us closer together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
