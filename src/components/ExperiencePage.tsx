import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

/* ── Loader ── */
const LETTERS = ['S', 'T', 'A', 'R', 'T'];

function ExperienceLoader({ onComplete }: { onComplete: () => void }) {
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
            opacity: 0, duration: 0.45, ease: 'power2.inOut',
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
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', background: '#0a0a0a' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.02em', perspective: '600px' }}>
        {LETTERS.map((letter, i) => (
          <span key={i} ref={(el) => { lettersRef.current[i] = el; }} style={{ display: 'inline-block', fontFamily: 'var(--font-main)', fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 6rem)', color: '#fff', letterSpacing: '0.1em', lineHeight: 1, willChange: 'transform, opacity, filter', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}>
            {letter}
          </span>
        ))}
      </div>
      <div ref={barTrackRef} style={{ width: 'clamp(120px, 20vw, 200px)', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
        <div ref={barRef} style={{ width: '100%', height: '100%', background: 'var(--color-primary)', transformOrigin: 'left center', borderRadius: '1px' }} />
      </div>
    </div>
  );
}

/* ── Experience Page ── */
export default function ExperiencePage() {
  const navigate = useNavigate();
  const [loaderDone, setLoaderDone] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderDone || !pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-exp-back]', { opacity: 0, x: -20, duration: 0.6, delay: 0.2, ease: 'power2.out' });
      gsap.from(cardRef.current, { opacity: 0, y: 40, duration: 1, delay: 0.3, ease: 'power3.out' });
      gsap.from('[data-exp-badge]', { opacity: 0, scale: 0.8, duration: 0.6, delay: 0.6, ease: 'back.out(1.7)' });
    }, pageRef);
    return () => ctx.revert();
  }, [loaderDone]);

  if (!loaderDone) {
    return <ExperienceLoader onComplete={() => setLoaderDone(true)} />;
  }

  return (
    <div
      ref={pageRef}
      className="h-screen w-screen relative overflow-hidden flex items-center justify-center"
    >
      {/* Full-page background image */}
      <img
        src="/Illustration%20cloud%20de%20stockage.png"
        alt="Mimneskõ Cloud Storage"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)', zIndex: 1 }} />

      {/* Back button */}
      <button
        data-exp-back
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 md:top-8 md:left-8 flex items-center gap-2 cursor-pointer z-20"
        style={{ color: '#fff', fontSize: '14px', fontWeight: 600, background: 'rgba(0,0,0,0.5)', border: 'none', padding: '8px 16px', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Retour
      </button>

      {/* Coming soon badge */}
      <div
        data-exp-badge
        className="absolute top-5 right-5 md:top-8 md:right-8 mono uppercase bold"
        style={{
          fontSize: '10px',
          letterSpacing: '3px',
          color: 'var(--color-primary)',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '8px 16px',
          zIndex: 20,
        }}
      >
        Coming soon
      </div>

      {/* Glassmorphism card */}
      <div
        ref={cardRef}
        className="relative z-10 flex flex-col items-center text-center px-8 py-10 md:px-14 md:py-14 mx-4"
        style={{
          maxWidth: '540px',
          width: '100%',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Orange accent line */}
        <div style={{ width: '40px', height: '3px', background: 'var(--color-primary)', marginBottom: '24px' }} />

        <h1
          className="bold uppercase leading-tight mb-3"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 40px)', color: '#fff', letterSpacing: '-0.02em' }}
        >
          L'expérience
          <br />
          <span style={{ color: 'var(--color-primary)' }}>commence ici.</span>
        </h1>

        <p
          className="mb-6"
          style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '380px' }}
        >
          Tout se passera dans cet espace. Uploadez, archivez et revivez vos souvenirs dans un cloud poétique, éthique et entièrement souverain.
        </p>

        {/* Divider */}
        <div className="w-full mb-6" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

        {/* Features mini */}
        <div className="grid grid-cols-3 gap-4 w-full mb-8">
          <div className="flex flex-col items-center gap-1">
            <span className="mono bold" style={{ fontSize: '18px', color: 'var(--color-primary)' }}>↑</span>
            <span className="mono uppercase" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px' }}>Upload</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="mono bold" style={{ fontSize: '18px', color: 'var(--color-primary)' }}>◆</span>
            <span className="mono uppercase" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px' }}>Archive</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="mono bold" style={{ fontSize: '18px', color: 'var(--color-primary)' }}>∞</span>
            <span className="mono uppercase" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px' }}>Revive</span>
          </div>
        </div>

        {/* CTA disabled */}
        <button
          disabled
          className="bold uppercase w-full"
          style={{
            height: '48px',
            fontSize: '12px',
            letterSpacing: '2px',
            background: 'rgba(255,90,0,0.15)',
            color: 'var(--color-primary)',
            border: '1.5px solid rgba(255,90,0,0.3)',
            cursor: 'not-allowed',
            opacity: 0.7,
          }}
        >
          Lancement bientôt
        </button>

        <p className="mono mt-3" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px' }}>
          Votre espace mémoire est en préparation.
        </p>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-5 flex items-center gap-3 z-10">
        <div style={{ width: '16px', height: '1.5px', background: 'var(--color-primary)' }} />
        <p className="mono uppercase" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
          Mimneskõ · 2026
        </p>
        <div style={{ width: '16px', height: '1.5px', background: 'var(--color-primary)' }} />
      </div>
    </div>
  );
}
