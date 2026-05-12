import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const memories = [
  {
    image: '/images/polaroid-1.jpg',
    caption: 'The day I realized…',
    sub: 'that you were the one my heart had been searching for.',
    rotate: -4,
    color: '#f4a7bb',
  },
  {
    image: '/images/polaroid-2.jpg',
    caption: 'Your smile, my weakness.',
    sub: 'Every moment with you felt like home.',
    rotate: 3,
    color: '#d4a847',
  },
  {
    image: '/images/polaroid-3.jpg',
    caption: 'Our forever starts here.',
    sub: 'Hand in hand, always.',
    rotate: -2,
    color: '#f4a7bb',
  },
];

function PolaroidCard({ memory, index }: { memory: typeof memories[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: isEven ? -100 : 100,
        rotate: memory.rotate - 5,
        filter: 'blur(8px)',
      }}
      animate={inView ? {
        opacity: 1,
        x: 0,
        rotate: memory.rotate,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10,
        boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
        transition: { duration: 0.4 },
      }}
      style={{
        position: 'relative',
        cursor: 'none',
      }}
    >
      <div className="polaroid" style={{ maxWidth: '280px', position: 'relative' }}>
        {/* Photo */}
        <div style={{
          width: '100%',
          paddingBottom: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#ddd',
        }}>
          <img
            src={memory.image}
            alt={memory.caption}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'sepia(15%) contrast(1.05) brightness(1.02)',
            }}
          />
          {/* Photo overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
        </div>
        {/* Caption area */}
        <div style={{ padding: '12px 4px 0', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Caveat', 'EB Garamond', cursive",
            fontSize: '1.1rem',
            color: '#2a1a1a',
            fontWeight: 600,
            lineHeight: 1.3,
          }}>
            {memory.caption}
          </p>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '0.7rem',
            color: '#6a4a4a',
            marginTop: '4px',
            fontStyle: 'italic',
            lineHeight: 1.4,
          }}>
            {memory.sub}
          </p>
        </div>
        {/* Tape effect */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-3deg)',
          width: '60px',
          height: '22px',
          background: 'rgba(212, 168, 71, 0.35)',
          borderRadius: '2px',
          backdropFilter: 'blur(4px)',
        }} />
      </div>
      {/* Heart pin on polaroid */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
        style={{
          position: 'absolute',
          top: '-8px',
          right: '20px',
          fontSize: '20px',
          filter: 'drop-shadow(0 2px 4px rgba(244,167,187,0.5))',
        }}
      >
        📌
      </motion.div>
    </motion.div>
  );
}

function DriftingOrb({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

export default function MemorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section
      ref={containerRef}
      className="section-full"
      style={{
        background: 'linear-gradient(180deg, #080818 0%, #0f0a20 30%, #150830 60%, #0a0520 80%, #080818 100%)',
        minHeight: '100vh',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      {/* Drifting orbs background */}
      <DriftingOrb style={{
        top: '15%', left: '5%', width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(201, 132, 154, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <DriftingOrb style={{
        top: '60%', right: '8%', width: 280, height: 280,
        background: 'radial-gradient(circle, rgba(212, 168, 71, 0.06) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      <DriftingOrb style={{
        top: '40%', left: '60%', width: 150, height: 150,
        background: 'radial-gradient(circle, rgba(244, 167, 187, 0.1) 0%, transparent 70%)',
        filter: 'blur(30px)',
      }} />

      {/* Section Title */}
      <motion.div
        ref={titleRef}
        style={{ position: 'relative', zIndex: 4, textAlign: 'center', marginBottom: '60px' }}
      >
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.05em' }}
          animate={titleInView ? { opacity: 1, letterSpacing: '0.35em' } : {}}
          transition={{ duration: 1.5 }}
          className="font-cinzel"
          style={{
            fontSize: 'clamp(0.55rem, 1.5vw, 0.8rem)',
            color: 'rgba(201, 132, 154, 0.5)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Captured in time
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-garamond"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          Our Beautiful{' '}
          <span className="gold-shimmer-text" style={{ fontStyle: 'italic', fontWeight: 600 }}>
            Memories
          </span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={titleInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            margin: '24px auto 0',
            width: '200px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201, 132, 154, 0.6), transparent)',
          }}
        />
      </motion.div>

      {/* Polaroid grid */}
      <motion.div
        style={{
          y: bgY,
          position: 'relative',
          zIndex: 4,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(30px, 5vw, 60px)',
          padding: '20px clamp(20px, 5vw, 80px)',
          alignItems: 'center',
        }}
      >
        {memories.map((memory, i) => (
          <PolaroidCard key={i} memory={memory} index={i} />
        ))}
      </motion.div>

      {/* Bottom quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          marginTop: '60px',
          padding: '0 20px',
        }}
      >
        <p
          className="font-garamond"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            color: 'rgba(255, 255, 255, 0.4)',
            fontStyle: 'italic',
          }}
        >
          "Some moments are too beautiful to keep only in the heart…"
        </p>
      </motion.div>
    </section>
  );
}
