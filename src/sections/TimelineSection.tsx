import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timelineEvents = [
  {
    title: 'The Day We Met',
    date: 'The Beginning',
    description:
      'Time stopped. In a world full of noise, you were the only sound that mattered. I didn\'t know it then, but I had just found the person who would change everything.',
    icon: '✨',
    side: 'left' as const,
    color: '#f4a7bb',
  },
  {
    title: 'Our First Laugh',
    date: 'The Spark',
    description:
      'There was a moment when everything clicked — a laugh we shared that felt like it had always existed between us. Pure. Effortless. Ours.',
    icon: '💫',
    side: 'right' as const,
    color: '#d4a847',
  },
  {
    title: 'The Hard Days We Survived',
    date: 'The Distance',
    description:
      'Miles apart. But even in the silence between calls, even in the ache of missing you — I never stopped choosing you. Every single day.',
    icon: '🌙',
    side: 'left' as const,
    color: '#a08bcc',
  },
  {
    title: 'Finally Together Again',
    date: 'The Return',
    description:
      'When I finally hold you again, all the waiting will dissolve. Every tear, every night apart — they were all worth it. Because you are worth everything.',
    icon: '❤️',
    side: 'right' as const,
    color: '#f4a7bb',
  },
];

function TimelineCard({ event }: { event: typeof timelineEvents[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const isLeft = event.side === 'left';

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        position: 'relative',
        width: '100%',
        paddingBottom: '60px',
      }}
    >
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '28px',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(40px, 5vw, 56px)',
          height: 'clamp(40px, 5vw, 56px)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${event.color}33 0%, ${event.color}11 70%)`,
          border: `1px solid ${event.color}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          zIndex: 3,
          boxShadow: `0 0 20px ${event.color}40`,
        }}
      >
        {event.icon}
      </motion.div>

      {/* Content card */}
      <motion.div
        initial={{
          opacity: 0,
          x: isLeft ? -80 : 80,
          filter: 'blur(6px)',
        }}
        animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        style={{
          width: 'calc(50% - clamp(50px, 6vw, 80px))',
          background: 'rgba(5, 5, 16, 0.7)',
          border: `1px solid ${event.color}20`,
          borderRadius: '16px',
          padding: 'clamp(20px, 3vw, 36px)',
          backdropFilter: 'blur(20px)',
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${event.color}10`,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        {/* Card glow corner */}
        <div style={{
          position: 'absolute',
          top: 0,
          [isLeft ? 'right' : 'left']: 0,
          width: '60px',
          height: '60px',
          background: `radial-gradient(circle, ${event.color}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-cinzel"
          style={{
            fontSize: 'clamp(0.5rem, 1.2vw, 0.7rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: event.color,
            opacity: 0.8,
            marginBottom: '12px',
          }}
        >
          {event.date}
        </motion.div>

        <h3
          className="font-garamond"
          style={{
            fontSize: 'clamp(1.3rem, 2.5vw, 2.2rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            fontWeight: 500,
            marginBottom: '12px',
            lineHeight: 1.2,
          }}
        >
          {event.title}
        </h3>
        <div
          style={{
            width: '40px',
            height: '1px',
            background: `linear-gradient(to right, ${event.color}80, transparent)`,
            marginBottom: '14px',
          }}
        />
        <p
          className="font-eb"
          style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
            color: 'rgba(255, 255, 255, 0.55)',
            fontStyle: 'italic',
            lineHeight: 1.8,
          }}
        >
          {event.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function TimelineSection() {
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <section
      className="section-full"
      style={{
        background: 'linear-gradient(180deg, #080818 0%, #0a0520 30%, #100825 60%, #080818 100%)',
        minHeight: '100vh',
        paddingTop: '80px',
        paddingBottom: '80px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(ellipse, rgba(201, 132, 154, 0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Title */}
      <motion.div
        ref={titleRef}
        style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 4 }}
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
          Our journey together
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
          Our{' '}
          <span className="gold-shimmer-text" style={{ fontStyle: 'italic', fontWeight: 600 }}>
            Love Story
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

      {/* Timeline container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 20px',
          width: '100%',
          zIndex: 4,
        }}
      >
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(201, 132, 154, 0.5) 10%, rgba(201, 132, 154, 0.3) 90%, transparent)',
            transformOrigin: 'top',
          }}
        />

        {timelineEvents.map((event, i) => (
          <TimelineCard key={i} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
