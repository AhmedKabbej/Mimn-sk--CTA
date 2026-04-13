import HeroSection from './landing/HeroSection';
import AwarenessSection from './landing/AwarenessSection';
import SolutionSection from './landing/SolutionSection';
import HowItWorksSection from './landing/HowItWorksSection';
import PrinciplesSection from './landing/PrinciplesSection';
import FinalCTASection from './landing/FinalCTASection';

export default function LandingPageMimnesko() {
  return (
    <div className="flex flex-col min-h-screen w-full" style={{ background: 'var(--color-bg)' }}>
      <HeroSection />
      <AwarenessSection />
      <SolutionSection />
      <HowItWorksSection />
      <PrinciplesSection />
      <FinalCTASection />
    </div>
  );
}
