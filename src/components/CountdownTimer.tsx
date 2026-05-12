import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Set your reunion date here — tomorrow at 6 PM
const TARGET_DATE = new Date('2026-05-13T18:00:00');

function getTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const target = TARGET_DATE.getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

function TimeUnit({ value, label }: { value: number; label: string }) {
  const display = pad(value);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Background card */}
        <div
          style={{
            background: 'rgba(5, 5, 16, 0.7)',
            border: '1px solid rgba(201, 132, 154, 0.25)',
            borderRadius: '12px',
            padding: '16px 20px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(201, 132, 154, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
            minWidth: 'clamp(70px, 12vw, 120px)',
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={display}
              initial={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="timer-glow font-cinzel"
              style={{
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                color: '#f4a7bb',
                letterSpacing: '0.05em',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: 1,
              }}
            >
              {display}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Corner accents */}
        <div style={{
          position: 'absolute', top: -1, left: -1, width: 8, height: 8,
          borderTop: '1px solid rgba(201, 132, 154, 0.6)',
          borderLeft: '1px solid rgba(201, 132, 154, 0.6)',
          borderRadius: '2px 0 0 0',
        }} />
        <div style={{
          position: 'absolute', top: -1, right: -1, width: 8, height: 8,
          borderTop: '1px solid rgba(201, 132, 154, 0.6)',
          borderRight: '1px solid rgba(201, 132, 154, 0.6)',
          borderRadius: '0 2px 0 0',
        }} />
        <div style={{
          position: 'absolute', bottom: -1, left: -1, width: 8, height: 8,
          borderBottom: '1px solid rgba(201, 132, 154, 0.6)',
          borderLeft: '1px solid rgba(201, 132, 154, 0.6)',
          borderRadius: '0 0 0 2px',
        }} />
        <div style={{
          position: 'absolute', bottom: -1, right: -1, width: 8, height: 8,
          borderBottom: '1px solid rgba(201, 132, 154, 0.6)',
          borderRight: '1px solid rgba(201, 132, 154, 0.6)',
          borderRadius: '0 0 2px 0',
        }} />
      </div>
      <span
        className="font-cinzel"
        style={{
          color: 'rgba(201, 132, 154, 0.7)',
          fontSize: 'clamp(0.55rem, 1.5vw, 0.85rem)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ onComplete }: { onComplete?: () => void }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const [complete, setComplete] = useState(false);
  const onCompleteRef = useCallback(() => onComplete?.(), [onComplete]);

  useEffect(() => {
    const tick = () => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0 && !complete) {
        setComplete(true);
        onCompleteRef();
      }
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [complete, onCompleteRef]);

  const separator = (
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="font-cinzel"
      style={{
        fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
        color: 'rgba(201, 132, 154, 0.6)',
        alignSelf: 'flex-start',
        marginTop: '12px',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      :
    </motion.span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 2vw, 20px)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <TimeUnit value={timeLeft.days} label="Days" />
        {separator}
        <TimeUnit value={timeLeft.hours} label="Hours" />
        {separator}
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        {separator}
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
}
