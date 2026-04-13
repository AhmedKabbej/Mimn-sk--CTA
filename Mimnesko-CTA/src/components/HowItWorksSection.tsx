import { COLORS } from '../constants/colors';
import { motion } from 'framer-motion';

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
    bg: COLORS.white,
    text: COLORS.text,
    accent: COLORS.primary,
  },
  {
    label: 'DATE',
    value: '30.06.2026',
    description: 'Lancement de la beta privée',
    bg: COLORS.primary,
    text: COLORS.white,
    accent: COLORS.white,
  },
  {
    label: 'AGENCY',
    value: 'Reprenez le contrôle',
    description: 'Vos souvenirs ne sont pas un produit. Ils sont votre histoire.',
    bg: COLORS.black,
    text: COLORS.white,
    accent: COLORS.primary,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-32 px-6" style={{ background: COLORS.background }}>
      <div className="max-w-[1123px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left Column */}
        <div>
          <p className="font-normal text-[14px] mb-12 uppercase" style={{ color: COLORS.text }}>
            ORIGIN → MATERIALS → PROCESS
          </p>
          <h2 className="font-bold text-[48px] mb-16" style={{ color: COLORS.text }}>
            Comment ça marche?
          </h2>
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6"
              >
                <p className="font-bold text-[60px]" style={{ color: 'rgba(255,90,0,0.2)' }}>{step.number}</p>
                <div>
                  <h3 className="font-bold text-[24px] mb-2" style={{ color: COLORS.text }}>{step.title}</h3>
                  <p className="font-normal text-[14px]" style={{ color: COLORS.textTertiary }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Right Column - Info Cards */}
        <div className="space-y-12">
          {infoCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 border-2"
              style={{ background: card.bg, borderColor: COLORS.text }}
            >
              <p className="font-normal text-[14px] mb-4 uppercase" style={{ color: card.accent, opacity: 0.8 }}>{card.label}</p>
              <p className={`font-bold ${card.label === 'TIME' ? 'text-[72px]' : card.label === 'DATE' ? 'text-[48px]' : 'text-[24px]'} mb-2`} style={{ color: card.text }}>{card.value}</p>
              <p className="font-normal text-[14px]" style={{ color: card.text, opacity: 0.8 }}>{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
