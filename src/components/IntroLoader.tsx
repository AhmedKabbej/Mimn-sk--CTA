import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LETTERS = ['M', 'I', 'M', 'N', 'E', 'S', 'K', 'Õ'];

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
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
            onComplete: () => {
              setDone(true);
              onComplete();
            },
          });
        },
      });

      const els = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

      // Initial state — letters invisible, scattered
      els.forEach((el) => {
        gsap.set(el, {
          opacity: 0,
          y: gsap.utils.random(40, 80),
          x: gsap.utils.random(-20, 20),
          rotationX: gsap.utils.random(-60, 60),
          scale: 0.5,
          filter: 'blur(6px)',
        });
      });

      // Loading bar initial state
      gsap.set(barRef.current, { scaleX: 0 });
      gsap.set(barTrackRef.current, { opacity: 0 });

      // Letters appear (fast, fluid)
      tl.to(els, {
        opacity: 1,
        y: 0,
        x: 0,
        rotationX: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
        stagger: { each: 0.07, from: 'center' },
      }, 0.15);

      // Start loading bar simultaneously
      tl.to(barTrackRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
      }, 0.15);

      // Loading bar fills
      tl.to(barRef.current, {
        scaleX: 1,
        duration: 1.8,
        ease: 'power1.inOut',
      }, 0.15);

      // Brief hold
      tl.to({}, { duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        background: 'var(--color-bg)',
      }}
    >
      {/* Letters */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.02em',
          perspective: '600px',
        }}
      >
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el; }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-main)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              color: 'var(--color-black)',
              letterSpacing: '0.1em',
              lineHeight: 1,
              willChange: 'transform, opacity, filter',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Minimalist orange loading bar */}
      <div
        ref={barTrackRef}
        style={{
          width: 'clamp(120px, 20vw, 200px)',
          height: '2px',
          background: 'rgba(0,0,0,0.06)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--color-primary)',
            transformOrigin: 'left center',
            borderRadius: '1px',
          }}
        />
      </div>
    </div>
  );
}
