import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShieldIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CloudIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
  </svg>
);

const HeartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const solutionCards = [
  {
    icon: <ShieldIcon />,
    title: 'Propriété totale',
    description: "Vos données restent vôtres. Pas de revente, pas d'analyse par IA, pas de métadonnées exploitées.",
    stat: '100%',
    statLabel: 'CONTROL',
  },
  {
    icon: <CloudIcon />,
    title: 'Low-tech cloud',
    description: 'Infrastructure minimaliste et transparente. Hébergement éthique sur serveurs locaux et durables.',
    stat: '0g',
    statLabel: 'TRACKING',
  },
  {
    icon: <HeartIcon />,
    title: 'Expérience poétique',
    description: 'Interface narrative qui honore vos souvenirs au lieu de les monétiser. Archivage émotionnel.',
    stat: '∞',
    statLabel: 'RESPECT',
  },
];

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="sol-label"]', {
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="sol-label"]', start: 'top 85%' },
      });

      const title = titleRef.current!;
      const words = title.textContent!.split(' ');
      title.textContent = '';
      title.style.visibility = 'visible';
      const wordSpans = words.map((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        title.appendChild(span);
        if (i < words.length - 1) {
          const space = document.createTextNode(' ');
          title.appendChild(space);
        }
        return span;
      });
      gsap.from(wordSpans, {
        opacity: 0, y: 50, duration: 0.8, stagger: 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: title, start: 'top 85%' },
      });

      gsap.from('[data-anim="sol-underline"]', {
        scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power3.inOut',
        scrollTrigger: { trigger: '[data-anim="sol-underline"]', start: 'top 85%' },
      });

      gsap.from('[data-anim="sol-card"]', {
        opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="sol-card"]', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-[1123px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p data-anim="sol-label" className="text-[13px] mb-6 uppercase tracking-[0.55px] bold" style={{ color: 'var(--color-primary)' }}>
            FUNCTION MEETS EXPRESSION
          </p>
          <h2
            ref={titleRef}
            className="bold text-[48px] md:text-[64px] leading-[1] mb-6"
            style={{ color: 'var(--color-text)', visibility: 'hidden' }}
          >
            La solution
          </h2>
          <div data-anim="sol-underline" className="h-[3px] w-[80px]" style={{ background: 'var(--color-text)' }} />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {solutionCards.map((card) => (
            <div
              key={card.title}
              data-anim="sol-card"
              className="border-2 p-8 md:p-10 flex flex-col justify-between transition-shadow duration-300 hover:shadow-[6px_6px_0_var(--color-primary)]"
              style={{ borderColor: 'var(--color-text)', minHeight: '380px' }}
            >
              <div>
                <div className="mb-8" style={{ color: 'var(--color-text)' }}>{card.icon}</div>
                <h3 className="bold text-[22px] mb-4" style={{ color: 'var(--color-text)' }}>{card.title}</h3>
                <p className="text-[14px] leading-[22px]" style={{ color: 'var(--color-text-tertiary)' }}>{card.description}</p>
              </div>
              <div className="border-t pt-6 mt-8" style={{ borderColor: 'var(--color-border)' }}>
                <p className="bold text-[36px] leading-none" style={{ color: 'var(--color-text)' }}>{card.stat}</p>
                <p className="text-[11px] uppercase tracking-[0.6px] mt-1" style={{ color: 'var(--color-accent)' }}>{card.statLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
