import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import SocialProof from '@/components/sections/SocialProof';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorks from '@/components/sections/HowItWorks';
import DemoSection from '@/components/sections/DemoSection';
import MetricsSection from '@/components/sections/MetricsSection';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <SocialProof />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorks />
      <DemoSection />
      <MetricsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
