import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const sphere2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;
    const ctx = gsap.context(() => {
      // Headline text-split (chars)
      const headline = headlineRef.current!;
      const text = headline.textContent || '';
      headline.innerHTML = '';
      headline.style.visibility = 'visible';

      const lines = text.split('\n').filter(Boolean);
      const allChars: HTMLSpanElement[] = [];
      lines.forEach((line, lineIdx) => {
        const lineDiv = document.createElement('div');
        line.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? ' ' : char;
          span.style.display = 'inline-block';
          if (char === ' ') span.style.whiteSpace = 'pre';
          lineDiv.appendChild(span);
          allChars.push(span);
        });
        headline.appendChild(lineDiv);
        if (lineIdx < lines.length - 1) {
          headline.appendChild(document.createElement('br'));
        }
      });

      gsap.from(allChars, {
        opacity: 0, y: 60, rotateX: -90, duration: 0.8, stagger: 0.02, ease: 'power4.out',
        scrollTrigger: { trigger: headline, start: 'top 80%' },
      });

      // Subtitle
      gsap.from('[data-anim="cta-sub"]', {
        opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="cta-sub"]', start: 'top 85%' },
      });

      // Buttons
      gsap.from('[data-anim="cta-btn"]', {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="cta-btn"]', start: 'top 85%' },
      });

      // Footer
      gsap.from('[data-anim="footer"]', {
        opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="footer"]', start: 'top 95%' },
      });

      // Sphere random floating animation (never stops) — covers entire section
      const sphere = sphereRef.current;
      const section = sectionRef.current;
      if (sphere && section) {
        const float = () => {
          const sW = section.offsetWidth;
          const sH = section.offsetHeight;
          const sphereSize = sphere.offsetWidth;
          // random position anywhere inside the section (clamped so it stays within bounds)
          const maxX = sW - sphereSize / 2;
          const maxY = sH - sphereSize / 2;
          gsap.to(sphere, {
            left: gsap.utils.random(-sphereSize / 2, maxX),
            top: gsap.utils.random(-sphereSize / 2, maxY),
            scale: gsap.utils.random(0.8, 1.2),
            duration: gsap.utils.random(2, 4),
            ease: 'sine.inOut',
            onComplete: float,
          });
        };
        float();
      }

      // Second sphere random floating animation
      const sphere2 = sphere2Ref.current;
      if (sphere2 && section) {
        const float2 = () => {
          const sW = section.offsetWidth;
          const sH = section.offsetHeight;
          const sphereSize = sphere2.offsetWidth;
          const maxX = sW - sphereSize / 2;
          const maxY = sH - sphereSize / 2;
          gsap.to(sphere2, {
            left: gsap.utils.random(-sphereSize / 2, maxX),
            top: gsap.utils.random(-sphereSize / 2, maxY),
            scale: gsap.utils.random(0.7, 1.15),
            duration: gsap.utils.random(3, 5),
            ease: 'sine.inOut',
            onComplete: float2,
          });
        };
        float2();
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex flex-col justify-center" style={{ background: 'var(--color-black)', scrollSnapAlign: 'start' }}>
      {/* Orange glow sphere */}
      <div
        ref={sphereRef}
        className="absolute pointer-events-none"
        style={{
          top: '0px',
          left: '0px',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,90,0,0.32) 0%, rgba(255,90,0,0.10) 45%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform, left, top',
        }}
      />

      {/* Second sphere */}
      <div
        ref={sphere2Ref}
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          right: '0px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,120,30,0.22) 0%, rgba(255,90,0,0.06) 50%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform, left, top',
        }}
      />

      <div className="max-w-[800px] mx-auto px-6 py-28 md:py-40 text-center relative z-10">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="bold leading-[1.05] mb-8"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 80px)',
            color: 'var(--color-white)',
            visibility: 'hidden',
          }}
        >
          {'Réappropriez-vous\nvos souvenirs.'}
        </h2>

        {/* Subtitle */}
        <div className="mb-12">
          <p data-anim="cta-sub" className="text-[16px] md:text-[18px]" style={{ color: 'var(--color-accent)', fontWeight: 300 }}>
            Mimneskõ vous offre une alternative éthique et poétique
          </p>
          <p data-anim="cta-sub" className="text-[16px] md:text-[18px]" style={{ color: 'var(--color-accent)', fontWeight: 300 }}>
            pour préserver vos souvenirs sans compromis.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '80px' }}>
          <button
            data-anim="cta-btn"
            className="cursor-pointer whitespace-nowrap bold btn-cta-primary"
            style={{ height: '72px', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '18px', background: 'var(--color-primary)', color: 'var(--color-white)', border: 'none' }}
          >
            Start experience
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
          <button
            data-anim="cta-btn"
            className="cursor-pointer whitespace-nowrap bold btn-cta-outline"
            style={{ height: '72px', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '18px', background: 'transparent', color: 'var(--color-white)', border: '2px solid rgba(255,255,255,0.25)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /></svg>
            Discover low-tech cloud
          </button>
        </div>

        {/* Horizontal divider with center vertical tick */}
        <div className="relative flex items-center justify-center mb-16">
          <div className="w-full max-w-[600px] h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="absolute w-px h-[60px]" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Footer */}
        <div data-anim="footer" className="border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="mono text-[13px] text-center tracking-[1px]" style={{ color: 'var(--color-text-tertiary)' }}>
            MIMNESKÕ © 2026 — A POETIC RESISTANCE
          </p>
        </div>
      </div>
    </section>
  );
}
