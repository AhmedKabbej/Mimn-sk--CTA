import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

/* ── Loader (same pattern as IntroLoader) ── */
const LETTERS = ['S', 'C', 'H', 'É', 'M', 'A'];

function SchemaLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.45,
            ease: 'power2.inOut',
            onComplete: () => { setDone(true); onComplete(); },
          });
        },
      });

      const els = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
      els.forEach((el) => {
        gsap.set(el, { opacity: 0, y: gsap.utils.random(40, 80), x: gsap.utils.random(-20, 20), rotationX: gsap.utils.random(-60, 60), scale: 0.5, filter: 'blur(6px)' });
      });
      gsap.set(barRef.current, { scaleX: 0 });
      gsap.set(barTrackRef.current, { opacity: 0 });

      tl.to(els, { opacity: 1, y: 0, x: 0, rotationX: 0, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', stagger: { each: 0.07, from: 'center' } }, 0.15);
      tl.to(barTrackRef.current, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 0.15);
      tl.to(barRef.current, { scaleX: 1, duration: 1.8, ease: 'power1.inOut' }, 0.15);
      tl.to({}, { duration: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', background: 'var(--color-bg)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.02em', perspective: '600px' }}>
        {LETTERS.map((letter, i) => (
          <span key={i} ref={(el) => { lettersRef.current[i] = el; }} style={{ display: 'inline-block', fontFamily: 'var(--font-main)', fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 6rem)', color: 'var(--color-black)', letterSpacing: '0.1em', lineHeight: 1, willChange: 'transform, opacity, filter', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}>
            {letter}
          </span>
        ))}
      </div>
      <div ref={barTrackRef} style={{ width: 'clamp(120px, 20vw, 200px)', height: '2px', background: 'rgba(0,0,0,0.06)', borderRadius: '1px', overflow: 'hidden' }}>
        <div ref={barRef} style={{ width: '100%', height: '100%', background: 'var(--color-primary)', transformOrigin: 'left center', borderRadius: '1px' }} />
      </div>
    </div>
  );
}

/* ── Schema Page ── */
export default function SchemaPage() {
  const navigate = useNavigate();
  const [loaderDone, setLoaderDone] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!loaderDone || !pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, { opacity: 0, scale: 0.92, duration: 1.2, ease: 'power3.out' });
      gsap.from('[data-schema-back]', { opacity: 0, x: -20, duration: 0.6, delay: 0.4, ease: 'power2.out' });
    }, pageRef);
    return () => ctx.revert();
  }, [loaderDone]);

  if (!loaderDone) {
    return <SchemaLoader onComplete={() => setLoaderDone(true)} />;
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Back button — high-contrast pill */}
      <button
        data-schema-back
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 cursor-pointer z-20"
        style={{ color: '#fff', fontSize: '14px', fontWeight: 600, background: 'rgba(0,0,0,0.7)', border: 'none', padding: '8px 16px', backdropFilter: 'blur(8px)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Retour
      </button>

      {/* Full-screen schema image */}
      <img
        ref={imgRef}
        src="/MimneskoShema.png"
        alt="Schéma Mimneskõ"
        style={{
          width: '100%',
          height: '100vh',
          objectFit: 'contain',
          padding: '24px',
        }}
      />
    </div>
  );
}
