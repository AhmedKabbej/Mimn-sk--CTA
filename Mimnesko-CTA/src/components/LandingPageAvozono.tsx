import React from 'react';
// Assets from Figma export
const imgContainer = "http://localhost:3845/assets/fe6b0b1eedddd544e367b6850883fe1587f38159.png";

export default function LandingPageAvozono() {
  return (
    <div className="bg-white flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="section flex flex-col items-center justify-center min-h-[80vh] px-6 py-20 relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
        <div className="w-full max-w-[1123px]">
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <p className="bold text-[14px] tracking-[0.55px] uppercase" style={{ color: "var(--color-text)" }}>
                MEMORY PLATFORM
              </p>
              <p className="text-[14px] tracking-[0.55px] uppercase" style={{ color: "var(--color-text-secondary)" }}>
                SINCE 2026
              </p>
            </div>
            <div className="text-right">
              <p className="mono text-[14px]" style={{ color: "var(--color-primary)" }}>19</p>
              <p className="text-[14px]" style={{ color: "var(--color-text-secondary)" }}>→</p>
              <p className="mono bold text-[14px]" style={{ color: "var(--color-text)" }}>26</p>
            </div>
          </div>
          {/* Brand Name */}
          <div>
            <h1 className="hero-title bold mb-8" style={{ fontSize: '175px', lineHeight: '149px', color: 'var(--color-text)', letterSpacing: '-8.7px' }}>
              MIMNESKÕ
            </h1>
            <div className="h-2 w-full mb-8" style={{ background: "var(--color-primary)" }} />
          </div>
          {/* Tagline & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <p className="text-[24px] leading-[39px]" style={{ color: "var(--color-text)" }}>
                Une expérience immersive et poétique qui transforme notre manière de conserver et de ressentir nos souvenirs numériques.
              </p>
            </div>
            <div>
              <p className="text-[14px] mb-4" style={{ color: "var(--color-text-tertiary)" }}>
                Vos photos, vos moments, vos émotions vous appartiennent. Mimneskõ refuse l'exploitation des données et propose une alternative poétique au cloud traditionnel.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-px w-8" style={{ background: "var(--color-primary)" }} />
                <p className="text-[12px] uppercase" style={{ color: "var(--color-primary)" }}>
                  Low-tech / High care
                </p>
              </div>
            </div>
          </div>
          {/* CTA */}
          <button
            className="border-2 h-16 w-48 mt-12 relative group overflow-hidden"
            style={{ background: "var(--color-black)", borderColor: "var(--color-black)" }}
          >
            <span className="bold text-[14px] text-center uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: "var(--color-white)" }}>
              Entrer
            </span>
          </button>
        </div>
      </section>
      {/* ...autres sections à ajouter ici selon le Figma... */}
    </div>
  );
}
