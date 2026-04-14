import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

/* ── Intro loader (same animation as main IntroLoader) ── */
const LETTERS = ['C', 'L', 'O', 'U', 'D'];

function CloudLoader({ onComplete }: { onComplete: () => void }) {
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
            duration: 0.25,
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

      tl.to(els, { opacity: 1, y: 0, x: 0, rotationX: 0, scale: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out', stagger: { each: 0.04, from: 'center' } }, 0.1);
      tl.to(barTrackRef.current, { opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.1);
      tl.to(barRef.current, { scaleX: 1, duration: 0.8, ease: 'power1.inOut' }, 0.1);
      tl.to({}, { duration: 0.15 });
    }, containerRef);
    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', background: '#E4E4E4' }}>
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

/* ── Main Cloud Page ── */
export default function CloudPage() {
  const navigate = useNavigate();
  const [loaderDone, setLoaderDone] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderDone || !pageRef.current || !titleRef.current || !subtitleRef.current) return;

    const ctx = gsap.context(() => {
      /* Text-split: Title */
      const titleEl = titleRef.current!;
      const titleText = titleEl.textContent || '';
      titleEl.innerHTML = '';
      titleEl.style.visibility = 'visible';
      const titleChars: HTMLSpanElement[] = [];
      titleText.split(' ').forEach((word, wordIdx, arr) => {
        const wordWrap = document.createElement('span');
        wordWrap.style.display = 'inline-block';
        word.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          wordWrap.appendChild(span);
          titleChars.push(span);
        });
        titleEl.appendChild(wordWrap);
        if (wordIdx < arr.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          space.style.display = 'inline-block';
          titleEl.appendChild(space);
          titleChars.push(space);
        }
      });

      /* Text-split: Subtitle lines */
      const subEl = subtitleRef.current!;
      // Grab the raw text before clearing
      const rawSub = subEl.getAttribute('data-text') || subEl.textContent || '';
      subEl.innerHTML = '';
      subEl.style.visibility = 'visible';
      const subChars: HTMLSpanElement[] = [];
      rawSub.split('\n').filter(Boolean).forEach((line) => {
        const lineDiv = document.createElement('div');
        line.trim().split(' ').forEach((word, wordIdx, arr) => {
          const wordWrap = document.createElement('span');
          wordWrap.style.display = 'inline-block';
          word.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            wordWrap.appendChild(span);
            subChars.push(span);
          });
          lineDiv.appendChild(wordWrap);
          if (wordIdx < arr.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            space.style.display = 'inline-block';
            lineDiv.appendChild(space);
            subChars.push(space);
          }
        });
        subEl.appendChild(lineDiv);
      });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Everything starts simultaneously — slow, smooth reveal
      tl.from(imgRef.current, { opacity: 0, scale: 0.94, y: 25, duration: 1.6 }, 0);
      tl.from(titleChars, { opacity: 0, y: 35, rotateX: -90, duration: 1.4, stagger: 0.025, ease: 'power4.out' }, 0);
      tl.from(subChars, { opacity: 0, y: 20, rotateX: -60, duration: 1.2, stagger: 0.018, ease: 'power4.out' }, 0);
      tl.from('[data-cloud-feature]', { opacity: 0, y: 40, scale: 0.92, filter: 'blur(4px)', duration: 1.6, stagger: 0, ease: 'power3.out' }, 0);
      tl.from(ctaRef.current, { opacity: 0, y: 15, duration: 1.4 }, 0);
    }, pageRef);

    return () => ctx.revert();
  }, [loaderDone]);

  if (!loaderDone) {
    return <CloudLoader onComplete={() => setLoaderDone(true)} />;
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex flex-col items-center px-5 py-8 md:py-6 relative overflow-y-auto gap-4 md:gap-2"
      style={{ background: '#E4E4E4' }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 md:top-6 md:left-8 flex items-center gap-2 cursor-pointer z-20"
        style={{ color: 'var(--color-text-secondary)', fontSize: '13px', background: 'none', border: 'none' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Retour
      </button>

      {/* Center block */}
      <div className="w-full max-w-[900px] flex flex-col items-center text-center relative z-10 gap-2 md:gap-1">
        {/* Top — orange label */}
        <p className="mono uppercase bold mt-12 md:mt-8" style={{ fontSize: '11px', color: 'var(--color-primary)', letterSpacing: '3px' }}>
          Low-tech cloud · Ethical by design
        </p>

        {/* Image — hero */}
        <img
          ref={imgRef}
          src="/CloudBETA.png"
          alt="Mimneskõ Cloud"
          onClick={() => setZoomed(true)}
          className="w-[90vw] max-w-[90vw] md:w-[22vw] md:max-w-[280px] mb-3 md:mb-3 transition-transform duration-300 hover:scale-105"
          style={{ filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.10))', cursor: 'pointer' }}
        />

        {/* Title */}
        <h1
          ref={titleRef}
          className="bold uppercase leading-none mt-2 mb-2 md:mt-4 md:mb-2"
          style={{ fontSize: 'clamp(1.6rem, 5vw, 44px)', color: 'var(--color-black)', letterSpacing: '-0.03em', visibility: 'hidden' }}
        >
          Mimneskõ Cloud
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          data-text={'Un cloud low-tech, éthique et souverain.\nVos souvenirs vous appartiennent — pour toujours.'}
          className="mb-3 md:mb-3"
          style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-secondary)', maxWidth: '380px', visibility: 'hidden' }}
        >
          {'Un cloud low-tech, éthique et souverain.\nVos souvenirs vous appartiennent — pour toujours.'}
        </p>

        {/* Orange bar */}
        <div style={{ width: '50px', height: '3px', background: 'var(--color-primary)', marginBottom: '14px' }} />

        {/* Pricing cards — lifetime, hover select */}
        <div ref={featuresRef} className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 md:gap-4 w-full max-w-[720px] mb-4 md:mb-4">
          {/* Minimalist */}
          <div
            data-cloud-feature
            className="pricing-card flex flex-col items-center py-3 md:py-4 px-3 cursor-pointer"
            style={{ border: '1.5px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.5)' }}
          >
            <span className="mono uppercase bold" style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--color-primary)', marginBottom: '3px' }}>Minimalist</span>
            <span className="pricing-price bold" style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--color-black)', lineHeight: 1, transition: 'color 0.3s' }}>149€</span>
            <span className="mono" style={{ fontSize: '9px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>à vie</span>
            <div className="pricing-bar" style={{ width: '24px', height: '1.5px', background: 'var(--color-primary)', marginBottom: '6px', transition: 'width 0.3s' }} />
            <span className="bold" style={{ fontSize: '11px', color: 'var(--color-black)', marginBottom: '2px' }}>512 Go</span>
            <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', lineHeight: 1.4, textAlign: 'center' }}>
              Serveur compact
              <br />Idéal pour l'essentiel
            </span>
          </div>

          {/* Premium — highlighted */}
          <div
            data-cloud-feature
            className="pricing-card-featured flex flex-col items-center py-3 md:py-4 px-3 relative cursor-pointer"
            style={{ border: '2px solid var(--color-primary)', background: 'rgba(255,255,255,0.75)' }}
          >
            <span className="mono uppercase bold" style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--color-primary)', marginBottom: '3px' }}>Premium</span>
            <span className="pricing-price bold" style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--color-black)', lineHeight: 1, transition: 'color 0.3s' }}>299€</span>
            <span className="mono" style={{ fontSize: '9px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>à vie</span>
            <div className="pricing-bar" style={{ width: '24px', height: '1.5px', background: 'var(--color-primary)', marginBottom: '6px', transition: 'width 0.3s' }} />
            <span className="bold" style={{ fontSize: '11px', color: 'var(--color-black)', marginBottom: '2px' }}>2 To</span>
            <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', lineHeight: 1.4, textAlign: 'center' }}>
              Serveur performant
              <br />Capsules illimitées · E2E
            </span>
          </div>

          {/* Modern */}
          <div
            data-cloud-feature
            className="pricing-card flex flex-col items-center py-3 md:py-4 px-3 cursor-pointer"
            style={{ border: '1.5px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.5)' }}
          >
            <span className="mono uppercase bold" style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--color-primary)', marginBottom: '3px' }}>Modern</span>
            <span className="pricing-price bold" style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--color-black)', lineHeight: 1, transition: 'color 0.3s' }}>499€</span>
            <span className="mono" style={{ fontSize: '9px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>à vie</span>
            <div style={{ width: '24px', height: '1.5px', background: 'var(--color-primary)', marginBottom: '6px' }} />
            <span className="bold" style={{ fontSize: '11px', color: 'var(--color-black)', marginBottom: '2px' }}>8 To</span>
            <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', lineHeight: 1.4, textAlign: 'center' }}>
              Serveur souverain
              <br />Stockage massif · Priorité
            </span>
          </div>
        </div>

        {/* Orange note */}
        <p className="mono" style={{ fontSize: '10px', color: 'var(--color-primary)', letterSpacing: '0.5px', marginTop: '8px', marginBottom: '10px' }}>
          * Serveur physique livré chez vous · Paiement unique à vie
        </p>

        {/* CTA disabled */}
        <div ref={ctaRef} className="flex flex-col items-center gap-2">
          <button
            disabled
            className="bold uppercase"
            style={{
              height: '46px',
              padding: '0 32px',
              fontSize: '12px',
              letterSpacing: '2px',
              background: 'var(--color-black)',
              color: 'var(--color-white)',
              border: '2px solid var(--color-black)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: 0.3,
              cursor: 'not-allowed',
            }}
          >
            Pré-commander
          </button>
          <span className="mono uppercase" style={{ fontSize: '9px', color: 'var(--color-primary)', letterSpacing: '2px' }}>
            Bientôt disponible
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3">
        <div style={{ width: '20px', height: '1.5px', background: 'var(--color-primary)' }} />
        <p className="mono uppercase" style={{ fontSize: '9px', color: 'var(--color-accent)', letterSpacing: '2px' }}>
          Mimneskõ Cloud · Beta 2026
        </p>
        <div style={{ width: '20px', height: '1.5px', background: 'var(--color-primary)' }} />
      </div>

      {/* Lightbox zoom */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
        >
          <img
            src="/CloudBETA.png"
            alt="Mimneskõ Cloud"
            className="max-w-[90vw] max-h-[85vh] object-contain"
            style={{ filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.3))' }}
          />
        </div>
      )}
    </div>
  );
}
