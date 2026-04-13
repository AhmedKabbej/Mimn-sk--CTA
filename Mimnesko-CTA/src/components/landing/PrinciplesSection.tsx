import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Icons matching Figma screenshot — all rendered in orange */
const BookLockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <rect x="9" y="7" width="6" height="5" rx="1" />
    <path d="M10 7V5.5a2 2 0 014 0V7" />
  </svg>
);

const CylinderIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const HeartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const principles = [
  {
    icon: <BookLockIcon />,
    title: 'Chiffrement total',
    description: "Vos fichiers sont chiffrés avant même de quitter votre appareil. Personne, pas même nous, ne peut y accéder.",
  },
  {
    icon: <CylinderIcon />,
    title: 'Zéro exploitation',
    description: "Pas d'analyse IA de vos photos, pas de reconnaissance faciale, pas de métadonnées collectées.",
  },
  {
    icon: <ShieldIcon />,
    title: 'Transparence absolue',
    description: "Code open-source, hébergement décentralisé, conditions d'utilisation en français simple.",
  },
  {
    icon: <HeartIcon />,
    title: 'Design émotionnel',
    description: 'Interface poétique qui respecte la profondeur de vos souvenirs au lieu de les réduire à des pixels.',
  },
];

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      const title = titleRef.current!;
      const text = title.textContent || '';
      title.textContent = '';
      title.style.visibility = 'visible';
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        if (char === ' ') span.style.minWidth = '0.3em';
        title.appendChild(span);
        return span;
      });
      gsap.from(chars, {
        opacity: 0, y: 50, rotateX: -45, duration: 0.7, stagger: 0.03, ease: 'power4.out',
        scrollTrigger: { trigger: title, start: 'top 85%' },
      });

      gsap.from('[data-anim="prin-subtitle"]', {
        opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="prin-subtitle"]', start: 'top 85%' },
      });

      gsap.from('[data-anim="principle"]', {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="principle"]', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-[1123px] mx-auto">
        {/* Section Header — centered */}
        <div className="text-center mb-20 md:mb-24">
          <h2
            ref={titleRef}
            className="bold text-[48px] md:text-[72px] leading-[1] mb-8"
            style={{ color: 'var(--color-text)', visibility: 'hidden' }}
          >
            Nos principes
          </h2>
          <div data-anim="prin-subtitle" className="flex items-center justify-center gap-4 md:gap-6 flex-wrap text-[11px] md:text-[12px] uppercase tracking-[0.6px]" style={{ color: 'var(--color-accent)' }}>
            {['DESIGN', 'CAN', 'BE', 'BOLD', 'WITHOUT', 'LOSING', 'WARMTH'].map((word, i, arr) => (
              <span key={word} className="flex items-center gap-4 md:gap-6">
                <span>{word}</span>
                {i < arr.length - 1 && <span className="h-px w-8 md:w-12 inline-block" style={{ background: 'var(--color-gray)' }} />}
              </span>
            ))}
          </div>
        </div>

        {/* Principles Grid — 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14 max-w-[960px] mx-auto">
          {principles.map((p) => (
            <div key={p.title} data-anim="principle" className="flex gap-5 items-start">
              <div className="shrink-0 mt-1" style={{ color: 'var(--color-primary)' }}>{p.icon}</div>
              <div>
                <h3 className="bold text-[20px] mb-3" style={{ color: 'var(--color-text)' }}>{p.title}</h3>
                <p className="text-[14px] leading-[22px]" style={{ color: 'var(--color-text-tertiary)' }}>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
