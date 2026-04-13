import { COLORS } from '../constants/colors';
import { motion } from 'framer-motion';

const solutionCards = [
  {
    icon: (
      <svg className="block size-full" fill="none" viewBox="0 0 48 48">
        <path d="M40 26C40 36 33 41 24.68 43.9C24.2443 44.0476 23.7711 44.0406 23.34 43.88C15 41 8 36 8 26V12C8 11.4696 8.21071 10.9609 8.58579 10.5858C8.96086 10.2107 9.46957 10 10 10C14 10 19 7.6 22.48 4.56C22.9037 4.198 23.4427 3.9991 24 3.9991C24.5573 3.9991 25.0963 4.198 25.52 4.56C29.02 7.62 34 10 38 10C38.5304 10 39.0391 10.2107 39.4142 10.5858C39.7893 10.9609 40 11.4696 40 12V26Z" stroke={COLORS.text} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
    title: 'Propriété totale',
    description: 'Vos données restent vôtres. Pas de revente, pas d\'analyse par IA, pas de métadonnées exploitées.',
    stat: '100%',
    statLabel: 'CONTROL',
  },
  {
    icon: (
      <svg className="block size-full" fill="none" viewBox="0 0 48 48">
        <path d="M35 38H18C15.4037 37.9993 12.8588 37.2767 10.6496 35.9129C8.44032 34.5491 6.65384 32.5979 5.48974 30.2772C4.32564 27.9566 3.82979 25.3579 4.05758 22.7716C4.28538 20.1854 5.22786 17.7134 6.77969 15.632C8.33153 13.5505 10.4316 11.9416 12.8452 10.985C15.2588 10.0284 17.8909 9.76174 20.4473 10.2149C23.0037 10.6681 25.3838 11.8232 27.3215 13.5512C29.2592 15.2792 30.6782 17.512 31.42 20H35C37.3869 20 39.6761 20.9482 41.364 22.636C43.0518 24.3239 44 26.6131 44 29C44 31.3869 43.0518 33.6761 41.364 35.364C39.6761 37.0518 37.3869 38 35 38Z" stroke={COLORS.text} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
    title: 'Low-tech cloud',
    description: 'Infrastructure minimaliste et transparente. Hébergement éthique sur serveurs locaux et durables.',
    stat: '0g',
    statLabel: 'TRACKING',
  },
  {
    icon: (
      <svg className="block size-full" fill="none" viewBox="0 0 48 48">
        <path d="M38 28C40.98 25.08 44 21.58 44 17C44 14.0826 42.8411 11.2847 40.7782 9.22183C38.7153 7.15893 35.9174 6 33 6C29.48 6 27 7 24 10C21 7 18.52 6 15 6C12.0826 6 9.28473 7.15893 7.22183 9.22183C5.15893 11.2847 4 14.0826 4 17C4 21.6 7 25.1 10 28L24 42L38 28Z" stroke={COLORS.text} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </svg>
    ),
    title: 'Expérience poétique',
    description: 'Interface narrative qui honore vos souvenirs au lieu de les monétiser. Archivage émotionnel.',
    stat: '∞',
    statLabel: 'RESPECT',
  },
];

export function SolutionSection() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-[1123px] mx-auto">
        <div className="mb-20">
          <p className="font-normal text-[14px] mb-9 uppercase" style={{ color: COLORS.primary }}>
            FUNCTION MEETS EXPRESSION
          </p>
          <h2 className="font-bold text-[60px] mb-6" style={{ color: COLORS.text }}>
            La solution
          </h2>
          <div className="h-1 w-32" style={{ background: COLORS.text }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutionCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="border-2 p-8 relative"
              style={{ borderColor: COLORS.text }}
            >
              <div className="size-12 mb-6">{card.icon}</div>
              <h3 className="font-bold text-[24px] mb-4" style={{ color: COLORS.text }}>{card.title}</h3>
              <p className="font-normal text-[14px] mb-6" style={{ color: COLORS.textTertiary }}>{card.description}</p>
              <div className="border-t pt-6" style={{ borderColor: COLORS.border }}>
                <p className="font-bold text-[36px]" style={{ color: COLORS.text }}>{card.stat}</p>
                <p className="font-normal text-[12px] uppercase" style={{ color: COLORS.accent }}>{card.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
