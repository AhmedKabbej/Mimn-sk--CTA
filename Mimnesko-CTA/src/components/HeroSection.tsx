import { COLORS } from '../constants/colors';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{ background: COLORS.background }}
    >
      <div className="max-w-[1123px] w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-start mb-32"
        >
          <div>
            <p className="font-bold text-[14px] tracking-[0.55px] uppercase" style={{ color: COLORS.text }}>
              MEMORY PLATFORM
            </p>
            <p className="font-normal text-[14px] tracking-[0.55px] uppercase" style={{ color: COLORS.textSecondary }}>
              SINCE 2026
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[14px]" style={{ color: COLORS.primary }}>19</p>
            <p className="font-normal text-[14px]" style={{ color: COLORS.textSecondary }}>→</p>
            <p className="font-mono font-bold text-[14px]" style={{ color: COLORS.text }}>26</p>
          </div>
        </motion.div>
        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-bold text-[175px] leading-[149px] tracking-[-8.7px] mb-8" style={{ color: COLORS.text }}>
            MIMNESKÕ
          </h1>
          <div className="h-2 w-full mb-8" style={{ background: COLORS.primary }} />
        </motion.div>
        {/* Tagline & Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 gap-16 mt-16"
        >
          <div>
            <p className="font-normal text-[24px] leading-[39px]" style={{ color: COLORS.text }}>
              Une expérience immersive et poétique qui transforme notre manière de conserver et de ressentir nos souvenirs numériques.
            </p>
          </div>
          <div>
            <p className="font-normal text-[14px] mb-4" style={{ color: COLORS.textTertiary }}>
              Vos photos, vos moments, vos émotions vous appartiennent. Mimneskõ refuse l'exploitation des données et propose une alternative poétique au cloud traditionnel.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-px w-8" style={{ background: COLORS.primary }} />
              <p className="font-normal text-[12px] uppercase" style={{ color: COLORS.primary }}>
                Low-tech / High care
              </p>
            </div>
          </div>
        </motion.div>
        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          className="border-2 h-16 w-48 mt-16 relative group overflow-hidden"
          style={{ background: COLORS.black, borderColor: COLORS.black }}
        >
          <p className="font-bold text-[14px] text-center uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: COLORS.white }}>
            Enter
          </p>
        </motion.button>
      </div>
    </section>
  );
}
