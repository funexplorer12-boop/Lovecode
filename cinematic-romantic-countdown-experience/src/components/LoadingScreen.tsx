import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0 = heart appears, 1 = text fades in, 2 = fades out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2800);
    const t3 = setTimeout(onDone, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#020208',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Center heart */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ fontSize: '4rem', lineHeight: 1 }}
            className="heartbeat"
          >
            ❤️
          </motion.div>

          {/* Title */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center' }}
              >
                <p
                  className="font-cinzel gold-shimmer-text"
                  style={{
                    fontSize: 'clamp(0.9rem, 3vw, 1.4rem)',
                    letterSpacing: '0.3em',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  Counting Down to Us
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="font-eb"
                  style={{
                    fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                    color: 'rgba(255,255,255,0.3)',
                    marginTop: '8px',
                    fontStyle: 'italic',
                    letterSpacing: '0.1em',
                  }}
                >
                  A love story, told in time.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <motion.div
            style={{
              width: '160px',
              height: '1px',
              background: 'rgba(201, 132, 154, 0.15)',
              borderRadius: '1px',
              overflow: 'hidden',
              marginTop: '8px',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(to right, rgba(201, 132, 154, 0.6), rgba(244, 167, 187, 0.9))',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
