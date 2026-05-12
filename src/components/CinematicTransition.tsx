import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  active: boolean;
  onComplete: () => void;
}

export default function CinematicTransition({ active, onComplete }: Props) {
  const [phase, setPhase] = useState(0);
  // 0 = idle, 1 = freeze+fade, 2 = dark, 3 = text reveal, 4 = done

  useEffect(() => {
    if (!active) return;
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 1500);
    const t2 = setTimeout(() => setPhase(3), 3000);
    const t3 = setTimeout(() => {
      setPhase(4);
      onComplete();
    }, 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active, onComplete]);

  if (!active && phase === 0) return null;

  return (
    <AnimatePresence>
      {phase >= 1 && phase <= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase <= 4 ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '30px',
            background: '#000',
          }}
        >
          {/* Pink bloom behind text */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: '600px',
                  height: '400px',
                  background: 'radial-gradient(ellipse, rgba(244, 167, 187, 0.12) 0%, rgba(201, 132, 154, 0.05) 40%, transparent 70%)',
                  filter: 'blur(60px)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>

          {/* Heartbeat icon */}
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.8, 1, 0], scale: [0, 1.3, 1, 1.2, 0] }}
              transition={{ duration: 2, ease: 'easeInOut', times: [0, 0.3, 0.5, 0.7, 1] }}
              style={{ fontSize: '4rem', position: 'relative', zIndex: 2 }}
            >
              💓
            </motion.div>
          )}

          {/* Text Reveal */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 2,
                  padding: '0 40px',
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="font-garamond"
                  style={{
                    fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)',
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    marginBottom: '16px',
                  }}
                >
                  And now…
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, delay: 1.0 }}
                  className="font-garamond text-glow-blush"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                    color: '#f4a7bb',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    lineHeight: 1.2,
                  }}
                >
                  The wait is over.
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.8 }}
                  style={{
                    margin: '20px auto',
                    width: '200px',
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(244, 167, 187, 0.6), transparent)',
                  }}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 2.2 }}
                  className="font-eb"
                  style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                    color: 'rgba(255, 255, 255, 0.35)',
                    fontStyle: 'italic',
                    letterSpacing: '0.1em',
                  }}
                >
                  ✦ scroll to continue ✦
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
