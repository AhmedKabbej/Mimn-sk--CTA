import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Upload',
    description: 'Téléversez vos photos et vidéos. Chiffrement de bout en bout automatique.',
  },
  {
    number: '02',
    title: 'Archive',
    description: 'Organisez vos souvenirs par émotions, dates, ou récits. Interface narrative unique.',
  },
  {
    number: '03',
    title: 'Revive',
    description: 'Explorez vos mémoires dans une expérience immersive et poétique.',
  },
];

const infoCards = [
  {
    label: 'TIME',
    value: '∞',
    description: 'Conservation illimitée de vos mémoires',
    bg: 'var(--color-white)',
    text: 'var(--color-text)',
    accent: 'var(--color-primary)',
    valueSize: 'text-[72px]',
    border: true,
  },
  {
    label: 'DATE',
    value: '30.06.2026',
    description: 'Lancement de la beta privée',
    bg: 'var(--color-primary)',
    text: 'var(--color-white)',
    accent: 'rgba(255,255,255,0.8)',
    valueSize: 'text-[42px] md:text-[48px]',
    border: false,
  },
  {
    label: 'AGENCY',
    value: 'Reprenez le contrôle',
    description: 'Vos souvenirs ne sont pas un produit. Ils sont votre histoire.',
    bg: 'var(--color-black)',
    text: 'var(--color-white)',
    accent: 'var(--color-primary)',
    valueSize: 'text-[22px] md:text-[24px]',
    border: false,
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="hiw-label"]', {
        opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="hiw-label"]', start: 'top 85%' },
      });

      const title = titleRef.current!;
      const text = title.textContent || '';
      title.textContent = '';
      title.style.visibility = 'visible';
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? ' ' : char;
        span.style.display = 'inline-block';
        if (char === ' ') span.style.whiteSpace = 'pre';
        title.appendChild(span);
        return span;
      });
      gsap.from(chars, {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.02, ease: 'power4.out',
        scrollTrigger: { trigger: title, start: 'top 85%' },
      });

      gsap.from('[data-anim="step"]', {
        opacity: 0, x: -30, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="step"]', start: 'top 85%' },
      });

      gsap.from('[data-anim="info-card"]', {
        opacity: 0, y: 40, scale: 0.95, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="info-card"]', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1123px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Left Column */}
          <div>
            <p data-anim="hiw-label" className="text-[13px] mb-10 uppercase tracking-[0.55px]" style={{ color: 'var(--color-text)' }}>
              ORIGIN → MATERIALS → PROCESS
            </p>
            <h2
              ref={titleRef}
              className="bold text-[40px] md:text-[48px] leading-[1.1] mb-14"
              style={{ color: 'var(--color-text)', visibility: 'hidden' }}
            >
              Comment ça marche?
            </h2>

            {/* Steps */}
            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.number} data-anim="step" className="flex gap-6 items-start">
                  <p className="bold text-[52px] md:text-[60px] leading-none shrink-0" style={{ color: 'rgba(255,90,0,0.15)' }}>
                    {step.number}
                  </p>
                  <div className="pt-3">
                    <h3 className="bold text-[22px] mb-2" style={{ color: 'var(--color-text)' }}>{step.title}</h3>
                    <p className="text-[14px] leading-[22px]" style={{ color: 'var(--color-text-tertiary)' }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="flex flex-col gap-6">
            {infoCards.map((card) => (
              <div
                key={card.label}
                data-anim="info-card"
                className="p-8 md:p-10 rounded-lg"
                style={{
                  background: card.bg,
                  border: card.border ? '2px solid var(--color-text)' : 'none',
                }}
              >
                <p className="text-[13px] mb-4 uppercase tracking-[0.55px] bold" style={{ color: card.accent }}>{card.label}</p>
                <p className={`bold ${card.valueSize} mb-3 leading-tight`} style={{ color: card.text }}>{card.value}</p>
                <p className="text-[14px] leading-[22px]" style={{ color: card.text, opacity: 0.75 }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
