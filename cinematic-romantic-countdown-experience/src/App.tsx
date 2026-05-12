import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarCanvas from './components/StarCanvas';
import AmbientCanvas from './components/AmbientCanvas';
import CustomCursor from './components/CustomCursor';
import FloatingParticles from './components/FloatingParticles';
import CinematicTransition from './components/CinematicTransition';
import LoadingScreen from './components/LoadingScreen';
import OpeningSection from './sections/OpeningSection';
import LoveRevealSection from './sections/LoveRevealSection';
import MemorySection from './sections/MemorySection';
import TimelineSection from './sections/TimelineSection';
import FinalSection from './sections/FinalSection';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleLoadDone = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleCountdownEnd = useCallback(() => {
    setTimerEnded(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setTimeout(() => setShowNav(true), 600);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#050510',
        overflowX: 'hidden',
      }}
    >
      {/* Loading Screen */}
      <LoadingScreen onDone={handleLoadDone} />

      {/* Global Backgrounds */}
      <StarCanvas />
      <AmbientCanvas />
      <FloatingParticles count={18} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Transition (when timer ends) */}
      <CinematicTransition
        active={timerEnded}
        onComplete={handleTransitionComplete}
      />

      {/* Top Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(12px, 4vw, 40px)',
              padding: '20px',
              background: 'linear-gradient(to bottom, rgba(5,5,16,0.95) 0%, transparent 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {[
              { label: 'Home', href: '#opening' },
              { label: 'Love', href: '#love' },
              { label: 'Memories', href: '#memories' },
              { label: 'Our Story', href: '#timeline' },
              { label: 'Forever', href: '#final' },
            ].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="font-cinzel"
                style={{
                  fontSize: 'clamp(0.5rem, 1.2vw, 0.72rem)',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(201, 132, 154, 0.65)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'none',
                  padding: '4px 0',
                  borderBottom: '1px solid transparent',
                }}
                onMouseEnter={e => {
                  const el = e.target as HTMLElement;
                  el.style.color = 'rgba(244, 167, 187, 1)';
                  el.style.borderBottomColor = 'rgba(244, 167, 187, 0.4)';
                }}
                onMouseLeave={e => {
                  const el = e.target as HTMLElement;
                  el.style.color = 'rgba(201, 132, 154, 0.65)';
                  el.style.borderBottomColor = 'transparent';
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content — shown after loading */}
      <AnimatePresence>
        {loaded && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 3 }}
          >
            {/* Section 1: Opening / Countdown */}
            <div id="opening">
              <OpeningSection onCountdownEnd={handleCountdownEnd} />
            </div>

            {/* Subtle section divider */}
            <SectionDivider />

            {/* Section 2: I Love You */}
            <div id="love">
              <LoveRevealSection />
            </div>

            <SectionDivider />

            {/* Section 3: Memories */}
            <div id="memories">
              <MemorySection />
            </div>

            <SectionDivider />

            {/* Section 4: Timeline */}
            <div id="timeline">
              <TimelineSection />
            </div>

            <SectionDivider />

            {/* Section 5: Final / Ending */}
            <div id="final">
              <FinalSection />
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Global cinematic vignette */}
      <div
        className="cinematic-vignette"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* Grain film overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          pointerEvents: 'none',
          zIndex: 5,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 3,
        padding: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: '200px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(201, 132, 154, 0.2))',
        }}
      />
      <motion.span
        animate={{ opacity: [0.3, 0.8, 0.3], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: '0.9rem', opacity: 0.5 }}
      >
        ✦
      </motion.span>
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: '1rem', opacity: 0.6 }}
      >
        ❤️
      </motion.span>
      <motion.span
        animate={{ opacity: [0.3, 0.8, 0.3], rotate: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ fontSize: '0.9rem', opacity: 0.5 }}
      >
        ✦
      </motion.span>
      <div
        style={{
          flex: 1,
          maxWidth: '200px',
          height: '1px',
          background: 'linear-gradient(to left, transparent, rgba(201, 132, 154, 0.2))',
        }}
      />
    </div>
  );
}
