import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const sphere2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;
    const ctx = gsap.context(() => {
      // Headline text-split (chars)
      const headline = headlineRef.current!;
      const text = headline.getAttribute('data-text') || '';
      headline.innerHTML = '';
      headline.style.visibility = 'visible';

      const lines = text.split('\n').filter(Boolean);
      const allChars: HTMLSpanElement[] = [];
      lines.forEach((line, lineIdx) => {
        const lineDiv = document.createElement('div');
        // Split by words to prevent mid-word breaks on mobile
        line.split(' ').forEach((word, wordIdx) => {
          const wordWrap = document.createElement('span');
          wordWrap.style.display = 'inline-block';
          word.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            wordWrap.appendChild(span);
            allChars.push(span);
          });
          lineDiv.appendChild(wordWrap);
          // Add space between words
          if (wordIdx < line.split(' ').length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            space.style.display = 'inline-block';
            lineDiv.appendChild(space);
            allChars.push(space);
          }
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
    <section ref={sectionRef} className="relative overflow-hidden md:min-h-screen flex flex-col justify-center" style={{ background: 'var(--color-black)', scrollSnapAlign: 'start' }}>
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

      <div className="max-w-[800px] mx-auto px-6 py-12 md:py-40 text-center relative z-10">
        {/* Headline */}
        <h2
          ref={headlineRef}
          data-text={'Réappropriez-vous\nvos souvenirs.'}
          className="bold leading-[1.05] mb-6 md:mb-8"
          style={{
            fontSize: 'clamp(1.6rem, 7vw, 80px)',
            color: 'var(--color-white)',
            visibility: 'hidden',
          }}
        >
          {'Réappropriez-vous\nvos souvenirs.'}
        </h2>

        {/* Subtitle */}
        <div className="mb-6 md:mb-12">
          <p data-anim="cta-sub" className="text-[14px] md:text-[18px]" style={{ color: 'var(--color-accent)', fontWeight: 300 }}>
            Mimneskõ vous offre une alternative éthique et poétique
          </p>
          <p data-anim="cta-sub" className="text-[14px] md:text-[18px]" style={{ color: 'var(--color-accent)', fontWeight: 300 }}>
            pour préserver vos souvenirs sans compromis.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-20 w-full">
          <button
            data-anim="cta-btn"
            onClick={() => navigate('/experience')}
            className="cursor-pointer whitespace-nowrap bold btn-cta-primary w-full sm:w-auto"
            style={{ height: '48px', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '15px', background: 'var(--color-primary)', color: 'var(--color-white)', border: 'none' }}
          >
            Start experience
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
          <button
            data-anim="cta-btn"
            onClick={() => navigate('/cloud')}
            className="cursor-pointer whitespace-nowrap bold btn-cta-outline w-full sm:w-auto"
            style={{ height: '48px', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '15px', background: 'transparent', color: 'var(--color-white)', border: '2px solid rgba(255,255,255,0.25)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /></svg>
            Discover low-tech cloud
          </button>
        </div>

        {/* Horizontal divider with center vertical tick */}
        <div className="relative flex items-center justify-center mb-6 md:mb-16">
          <div className="w-full max-w-[600px] h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="absolute w-px h-[20px] md:h-[60px]" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Footer */}
        <div data-anim="footer" className="border-t pt-4 md:pt-8 pb-4 md:pb-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="mono text-[10px] md:text-[13px] text-center tracking-[1px]" style={{ color: 'var(--color-text-tertiary)' }}>
            <span className="hidden md:inline whitespace-nowrap">
              MIMNESKÕ © 2026<br />A POETIC RESISTANCE
            </span>
            <span className="inline md:hidden">
              MIMNESKÕ © 2026 — A POETIC RESISTANCE
            </span>
          </p>
          <button
            onClick={() => setShowPopup(true)}
            className="mono uppercase cursor-pointer mt-3 mx-auto block"
            style={{ fontSize: '10px', letterSpacing: '1.5px', color: 'var(--color-primary)', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,90,0,0.3)', paddingBottom: '2px' }}
          >
            En partenariat avec Infomaniak →
          </button>
        </div>
      </div>

      {/* Infomaniak Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px]"
            style={{
              background: 'rgba(20,20,20,0.85)',
              backdropFilter: 'blur(32px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
              padding: '32px 28px',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 cursor-pointer"
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '20px', lineHeight: 1 }}
            >
              ×
            </button>

            {/* Orange bar */}
            <div style={{ width: '36px', height: '3px', background: 'var(--color-primary)', marginBottom: '16px' }} />

            {/* Title */}
            <h3 className="bold" style={{ fontSize: '20px', color: '#fff', marginBottom: '4px', lineHeight: 1.2 }}>
              Votre cloud privé, <span style={{ color: 'var(--color-primary)' }}>chez vous.</span>
            </h3>

            {/* Subtitle */}
            <p className="mono uppercase" style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--color-primary)', marginBottom: '14px' }}>
              Imaginé par Mimneskõ · Assemblé avec Infomaniak
            </p>

            {/* Scrollable content on mobile */}
            <div className="overflow-y-auto" style={{ maxHeight: '55vh', paddingRight: '4px' }}>
              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '14px' }} />

              {/* Description — compact */}
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                <strong style={{ color: '#fff' }}>Infomaniak</strong> est un hébergeur suisse qui propose du stockage cloud standard. Leur particularité : zéro climatisation, la chaleur des serveurs <strong style={{ color: '#fff' }}>chauffe des habitations en Suisse</strong>. 100% énergie renouvelable.
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                Mimneskõ s'appuie sur ce savoir-faire. <strong style={{ color: '#fff' }}>Infomaniak conçoit et assemble nos serveurs privés</strong> dans cette même démarche éthique. Nous les transformons en une <strong style={{ color: 'var(--color-primary)' }}>expérience immersive, poétique et profondément personnelle</strong> pour stocker et revivre vos souvenirs.
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                Résultat : un cloud <strong style={{ color: '#fff' }}>chez vous</strong>. Dans la cabane de votre jardin ou rangé dans un meuble — compact, silencieux, entièrement vôtre. Vos données ne transitent plus par personne.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3" style={{ marginBottom: '16px' }}>
                <div className="flex flex-col items-center gap-1">
                  <span className="mono bold" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>0</span>
                  <span className="mono uppercase" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>Climatisation</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="mono bold" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>100%</span>
                  <span className="mono uppercase" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>Renouvelable</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="mono bold" style={{ fontSize: '16px', color: 'var(--color-primary)' }}>🇨🇭</span>
                  <span className="mono uppercase" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>Suisse</span>
                </div>
              </div>
            </div>

            {/* Footer — logo discret en bas */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '12px' }} />
            <div className="flex items-center justify-center gap-3">
              <img src="/Infomaniak.png" alt="Infomaniak" style={{ height: '14px', opacity: 0.35 }} />
              <span className="mono" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px', position: 'relative', top: '3px' }}>
                GENÈVE, SUISSE · SINCE 1994
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
