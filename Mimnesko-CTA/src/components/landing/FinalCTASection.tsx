import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          if (char === ' ') span.style.minWidth = '0.3em';
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: 'var(--color-black)' }}>
      {/* Orange glow top-left */}
      <div
        className="absolute top-0 left-0 w-[250px] h-[250px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,90,0,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            data-anim="cta-btn"
            className="h-[60px] px-10 rounded-xl flex items-center gap-3 text-[16px] bold cursor-pointer transition-opacity duration-300 hover:opacity-90"
            style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}
          >
            Start experience
            <span className="text-[18px]">→</span>
          </button>
          <button
            data-anim="cta-btn"
            className="h-[60px] px-10 rounded-xl flex items-center gap-3 text-[16px] bold border cursor-pointer transition-all duration-300 hover:border-[var(--color-primary)]"
            style={{ background: 'transparent', color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
            </svg>
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
