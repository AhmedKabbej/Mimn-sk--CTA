import { COLORS } from '../constants/colors';
import { motion } from 'framer-motion';

const principles = [
  {
    icon: (
      <svg className="block size-8" fill="none" viewBox="0 0 32 32">
        <path d="M22.6667 1.33333H4C2.52724 1.33333 1.33333 2.52724 1.33333 4V13.3333C1.33333 14.8061 2.52724 16 4 16H22.6667C24.1394 16 25.3333 14.8061 25.3333 13.3333V4C25.3333 2.52724 24.1394 1.33333 22.6667 1.33333Z" stroke={COLORS.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
        <path d="M1.33333 13.3333V8C1.33333 6.23189 2.03571 4.5362 3.28595 3.28595C4.5362 2.03571 6.23189 1.33333 8 1.33333C9.76811 1.33333 11.4638 2.03571 12.714 3.28595C13.9643 4.5362 14.6667 6.23189 14.6667 8V13.3333" stroke={COLORS.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
      </svg>
    ),
    title: 'Chiffrement total',
    description: 'Vos fichiers sont chiffrés avant même de quitter votre appareil. Personne, pas même nous, ne peut y accéder.',
  },
  {
    icon: (
      <svg className="block size-8" fill="none" viewBox="0 0 32 32">
        <path d="M13.3333 9.33333C19.9608 9.33333 25.3333 7.54247 25.3333 5.33333C25.3333 3.12419 19.9608 1.33333 13.3333 1.33333C6.70592 1.33333 1.33333 3.12419 1.33333 5.33333C1.33333 7.54247 6.70592 9.33333 13.3333 9.33333Z" stroke={COLORS.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
        <path d="M1.33333 1.33333V20C1.33333 21.0609 2.59762 22.0783 4.84805 22.8284C7.09849 23.5786 10.1507 24 13.3333 24C16.5159 24 19.5682 23.5786 21.8186 22.8284C24.0691 22.0783 25.3333 21.0609 25.3333 20V1.33333" stroke={COLORS.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
        <path d="M1.33333 1.33333C1.33333 2.3942 2.59762 3.41162 4.84805 4.16176C7.09849 4.91191 10.1507 5.33333 13.3333 5.33333C16.5159 5.33333 19.5682 4.91191 21.8186 4.16176C24.0691 3.41162 25.3333 2.3942 25.3333 1.33333" stroke={COLORS.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
      </svg>
    ),
    title: 'Zéro exploitation',
    description: 'Pas d\'analyse IA de vos photos, pas de reconnaissance faciale, pas de métadonnées collectées.',
  },
  {
    icon: (
      <svg className="block size-8" fill="none" viewBox="0 0 32 32">
        <path d="M22.6667 16.0006C22.6667 22.6673 18 26.0006 12.4533 27.9339C12.1629 28.0324 11.8474 28.0276 11.56 27.9206C6 26.0006 1.33333 22.6673 1.33333 16.0006V6.66727C1.33333 6.31364 1.47381 5.97451 1.72386 5.72446C1.97391 5.47441 2.31304 5.33393 2.66667 5.33393C5.33333 5.33393 8.66667 3.73393 10.9867 1.70727C11.2691 1.46593 11.6285 1.33333 12 1.33333C12.3715 1.33333 12.7309 1.46593 13.0133 1.70727C15.3467 3.74727 18.6667 5.33393 21.3333 5.33393C21.687 5.33393 22.0261 5.47441 22.2761 5.72446C22.5262 5.97451 22.6667 6.31364 22.6667 6.66727V16.0006Z" stroke={COLORS.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
      </svg>
    ),
    title: 'Transparence absolue',
    description: 'Code open-source, hébergement décentralisé, conditions d\'utilisation en français simple.',
  },
  {
    icon: (
      <svg className="block size-8" fill="none" viewBox="0 0 32 32">
        <path d="M24 16C25.9867 14.0533 28 11.72 28 8.66667C28 6.72175 27.2274 4.85648 25.8521 3.48122C24.4769 2.10595 22.6116 1.33333 20.6667 1.33333C18.32 1.33333 16.6667 2 14.6667 4C12.6667 2 11.0133 1.33333 8.66667 1.33333C6.72175 1.33333 4.85648 2.10595 3.48122 3.48122C2.10595 4.85648 1.33333 6.72175 1.33333 8.66667C1.33333 11.7333 3.33333 14.0667 5.33333 16L14.6667 25.3333L24 16Z" stroke={COLORS.primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
      </svg>
    ),
    title: 'Design émotionnel',
    description: 'Interface poétique qui respecte la profondeur de vos souvenirs au lieu de les réduire à des pixels.',
  },
];

export function PrinciplesSection() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-[1123px] mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-bold text-[60px] mb-6" style={{ color: COLORS.text }}>
            Nos principes
          </h2>
          <div className="flex items-center justify-center gap-8 text-[12px] uppercase" style={{ color: COLORS.accent }}>
            <span>DESIGN</span>
            <div className="h-px w-12" style={{ background: COLORS.gray }} />
            <span>CAN</span>
            <div className="h-px w-12" style={{ background: COLORS.gray }} />
            <span>BE</span>
            <div className="h-px w-12" style={{ background: COLORS.gray }} />
            <span>BOLD</span>
            <div className="h-px w-12" style={{ background: COLORS.gray }} />
            <span>WITHOUT</span>
            <div className="h-px w-12" style={{ background: COLORS.gray }} />
            <span>LOSING</span>
            <div className="h-px w-12" style={{ background: COLORS.gray }} />
            <span>WARMTH</span>
          </div>
        </div>
        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-[896px] mx-auto">
          {principles.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-6"
            >
              <div className="shrink-0">{p.icon}</div>
              <div>
                <h3 className="font-bold text-[20px] mb-2" style={{ color: COLORS.text }}>{p.title}</h3>
                <p className="font-normal text-[14px]" style={{ color: COLORS.textTertiary }}>{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
