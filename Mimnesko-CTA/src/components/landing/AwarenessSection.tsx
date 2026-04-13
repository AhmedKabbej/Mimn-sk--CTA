import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DatabaseIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </svg>
);

const EyeIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LightningIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const concerns = [
  {
    icon: <DatabaseIcon />,
    title: 'Exploitation des données',
    description: 'Vos photos entraînent des IA sans votre consentement explicite',
  },
  {
    icon: <EyeIcon />,
    title: 'Surveillance constante',
    description: 'Métadonnées géolocalisées, reconnaissance faciale, analyse comportementale',
  },
  {
    icon: <LightningIcon />,
    title: 'Perte de contrôle',
    description: 'Conditions générales opaques, propriété intellectuelle floue',
  },
];

export default function AwarenessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="warning"]', {
        opacity: 0, x: -30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="warning"]', start: 'top 85%' },
      });

      const heading = headingRef.current!;
      const words = heading.textContent!.split(' ');
      heading.textContent = '';
      heading.style.visibility = 'visible';
      const wordSpans = words.map((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        heading.appendChild(span);
        if (i < words.length - 1) {
          const space = document.createTextNode(' ');
          heading.appendChild(space);
        }
        return span;
      });
      gsap.from(wordSpans, {
        opacity: 0, y: 60, duration: 0.8, stagger: 0.08, ease: 'power4.out',
        scrollTrigger: { trigger: heading, start: 'top 80%' },
      });

      gsap.from('[data-anim="line"]', {
        opacity: 0, x: -20, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="line"]', start: 'top 85%' },
      });

      gsap.from('[data-anim="accent"]', {
        opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="accent"]', start: 'top 85%' },
      });

      gsap.from('[data-anim="card"]', {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="card"]', start: 'top 85%' },
      });

      gsap.from('[data-anim="quote"]', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="quote"]', start: 'top 90%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: 'var(--color-black)' }}>
      <div className="max-w-[1123px] mx-auto px-6 py-24 md:py-32 relative">
        {/* Warning Header */}
        <div data-anim="warning" className="flex items-center gap-4 mb-16">
          <div className="shrink-0" style={{ color: 'var(--color-primary)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <p className="mono text-[18px] leading-[24px] tracking-[1px]" style={{ color: 'var(--color-primary)' }}>
              SYSTEM WARNING
            </p>
            <p className="mono text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
              Unauthorized access detected
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column */}
          <div>
            <h2
              ref={headingRef}
              className="bold text-[36px] sm:text-[48px] md:text-[56px] leading-[1.1] mb-10"
              style={{ color: 'var(--color-white)', visibility: 'hidden' }}
            >
              Mais qui possède vraiment vos souvenirs?
            </h2>

            <div className="space-y-1 mb-6">
              <p data-anim="line" className="text-[16px] leading-[26px]" style={{ color: '#d1d5dc', fontWeight: 300 }}>
                Chaque photo téléversée.
              </p>
              <p data-anim="line" className="text-[16px] leading-[26px]" style={{ color: '#d1d5dc', fontWeight: 300 }}>
                Chaque moment saisi.
              </p>
              <p data-anim="line" className="text-[16px] leading-[26px]" style={{ color: '#d1d5dc', fontWeight: 300 }}>
                Chaque trace émotionnelle.
              </p>
            </div>

            <p data-anim="accent" className="text-[16px] leading-[26px] mb-6" style={{ color: 'var(--color-primary)' }}>
              Ils ne vous appartiennent plus.
            </p>

            <div className="space-y-1">
              <p data-anim="line" className="text-[14px] leading-[22px]" style={{ color: 'var(--color-accent)', fontWeight: 300 }}>
                Les géants du cloud analysent, indexent, et monétisent
              </p>
              <p data-anim="line" className="text-[14px] leading-[22px]" style={{ color: 'var(--color-accent)', fontWeight: 300 }}>
                vos instants les plus intimes.
              </p>
              <p data-anim="line" className="text-[14px] leading-[22px]" style={{ color: 'var(--color-accent)', fontWeight: 300 }}>
                L'intelligence artificielle apprend de vos émotions.
              </p>
              <p data-anim="line" className="text-[14px] leading-[22px]" style={{ color: 'var(--color-accent)', fontWeight: 300 }}>
                Vos mémoires deviennent leur produit.
              </p>
            </div>
          </div>

          {/* Right Column - Concern Cards */}
          <div className="flex flex-col gap-4">
            {concerns.map((concern) => (
              <div
                key={concern.title}
                data-anim="card"
                className="p-6 border transition-colors duration-300 hover:border-[var(--color-primary)]"
                style={{ background: 'rgba(9,9,11,0.5)', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="mb-4" style={{ color: 'var(--color-primary)' }}>{concern.icon}</div>
                <h3 className="bold text-[18px] mb-2" style={{ color: 'var(--color-white)' }}>{concern.title}</h3>
                <p className="text-[14px] leading-[22px]" style={{ color: 'var(--color-accent)' }}>{concern.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Orange gradient divider */}
        <div
          className="h-[2px] w-full mt-16 mb-12"
          style={{ backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,90,0,0.4) 50%, rgba(0,0,0,0) 100%)' }}
        />

        {/* Bottom Quote */}
        <div data-anim="quote" className="text-center pb-8">
          <p className="text-[18px] md:text-[22px] italic" style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}>
            Il est temps de reprendre le contrôle.
          </p>
        </div>
      </div>
    </section>
  );
}
