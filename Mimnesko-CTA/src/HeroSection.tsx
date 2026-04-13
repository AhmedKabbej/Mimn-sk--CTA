import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// ---
// Landing page for Mimneskõ
// ---

import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <section className="bg-[#f5f1ed] min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-[1123px] w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex justify-between items-start mb-32">
          <div>
            <p className="font-bold text-[14px] text-black tracking-[0.55px] uppercase">MEMORY PLATFORM</p>
            <p className="font-normal text-[#6a7282] text-[14px] tracking-[0.55px] uppercase">SINCE 2026</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[#ff5a00] text-[14px]">19</p>
            <p className="font-normal text-[#6a7282] text-[14px]">→</p>
            <p className="font-mono font-bold text-[14px] text-black">26</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <h1 className="font-bold text-[175px] leading-[149px] text-black tracking-[-8.7px] mb-8">MIMNESKÕ</h1>
          <div className="bg-[#ff5a00] h-2 w-full mb-8" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="grid grid-cols-2 gap-16 mt-16">
          <div>
            <p className="font-normal text-[24px] leading-[39px] text-black">Une expérience immersive et poétique qui transforme notre manière de conserver et de ressentir nos souvenirs numériques.</p>
          </div>
          <div>
            <p className="font-normal text-[#4a5565] text-[14px] mb-4">Vos photos, vos moments, vos émotions vous appartiennent. Mimneskõ refuse l'exploitation des données et propose une alternative poétique au cloud traditionnel.</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="bg-[#ff5a00] h-px w-8" />
              <p className="font-normal text-[#ff5a00] text-[12px] uppercase">Low-tech / High care</p>
            </div>
          </div>
        </motion.div>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} whileHover={{ scale: 1.02 }} className="bg-black border-2 border-black h-16 w-48 mt-16 relative group overflow-hidden">
          <p className="font-bold text-[14px] text-center text-white uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Enter</p>
        </motion.button>
      </div>
    </section>
  );
}

export default HeroSection;
