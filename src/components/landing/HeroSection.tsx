import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="header"]', {
        opacity: 0, y: -20, duration: 0.8, ease: 'power3.out',
      });

      const title = titleRef.current!;
      const text = title.textContent || '';
      title.textContent = '';
      title.style.visibility = 'visible';
      const chars: HTMLSpanElement[] = [];
      text.split(' ').forEach((word, wordIdx, arr) => {
        const wordWrap = document.createElement('span');
        wordWrap.style.display = 'inline-block';
        wordWrap.style.whiteSpace = 'nowrap';
        word.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          wordWrap.appendChild(span);
          chars.push(span);
        });
        title.appendChild(wordWrap);
        if (wordIdx < arr.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          space.style.display = 'inline-block';
          title.appendChild(space);
          chars.push(space);
        }
      });
      gsap.from(chars, {
        opacity: 0, y: 80, rotateX: -90,
        duration: 1, stagger: 0.04, delay: 0.3, ease: 'power4.out',
      });

      gsap.from('[data-anim="bar"]', {
        scaleX: 0, transformOrigin: 'left center',
        duration: 1, delay: 0.8, ease: 'power3.inOut',
      });

      gsap.from('[data-anim="desc"]', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.15, delay: 1, ease: 'power2.out',
      });

      gsap.from('[data-anim="cta"]', {
        opacity: 0, y: 20, duration: 0.6, delay: 1.4, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen px-6 py-20 overflow-hidden"
      style={{ background: 'var(--color-bg)', scrollSnapAlign: 'start' }}
    >
      <div className="w-full max-w-[1123px] mx-auto">
        {/* Header */}
        <div data-anim="header" className="flex justify-between items-start mb-[140px] md:mb-[188px]">
          <div>
            <p className="bold text-[14px] tracking-[0.55px] uppercase" style={{ color: 'var(--color-text)' }}>
              MEMORY PLATFORM
            </p>
            <p className="text-[14px] tracking-[0.55px] uppercase" style={{ color: 'var(--color-text-secondary)' }}>
              SINCE 2026
            </p>
          </div>
          <div className="text-right">
            <p className="mono text-[14px]" style={{ color: 'var(--color-primary)' }}>19</p>
            <p className="text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>→</p>
            <p className="mono bold text-[14px]" style={{ color: 'var(--color-text)' }}>26</p>
          </div>
        </div>

        {/* Title + Orange Bar */}
        <div>
          <h1
            ref={titleRef}
            className="bold"
            style={{
              fontSize: 'clamp(3rem, 12vw, 175px)',
              lineHeight: 0.85,
              color: 'var(--color-text)',
              letterSpacing: '-0.05em',
              visibility: 'hidden',
            }}
          >
            MIMNESKÕ
          </h1>
          <div data-anim="bar" className="w-full mt-8" style={{ height: '8px', background: 'var(--color-primary)' }} />
        </div>

        {/* Description Block */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-20 mt-20">
          <div data-anim="desc">
            <p className="text-[22px] md:text-[26px] leading-[1.55]" style={{ color: 'var(--color-text)', fontWeight: 400 }}>
              Une expérience immersive et poétique qui transforme notre manière de conserver et de ressentir nos souvenirs numériques.
            </p>
          </div>
          <div data-anim="desc" className="flex flex-col justify-start pt-1">
            <p className="text-[14px] leading-[23px] mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Vos photos, vos moments, vos émotions vous appartiennent. Mimneskõ refuse l'exploitation des données et propose une alternative poétique au cloud traditionnel.
            </p>
            <div className="flex items-center gap-3">
              <div style={{ height: '1px', width: '40px', background: 'var(--color-primary)' }} />
              <p className="text-[12px] tracking-[0.6px] uppercase bold" style={{ color: 'var(--color-primary)' }}>
                Low-tech / High care
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div data-anim="cta" className="mt-16">
          <button
            className="h-[52px] px-8 flex items-center justify-center gap-2 group cursor-pointer transition-all duration-300 hover:bg-[var(--color-primary)]"
            style={{ background: 'var(--color-black)', border: 'none' }}
          >
            <span className="bold text-[13px] uppercase tracking-[1.5px]" style={{ color: 'var(--color-white)' }}>
              ENTER
            </span>
            <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--color-white)' }}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
