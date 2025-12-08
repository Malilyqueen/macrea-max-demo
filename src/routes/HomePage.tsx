import MainLayout from '../components/layout/MainLayout';
import MaxHeroSection from '../components/hero/MaxHeroSection';
import MaxHowItWorksSection from '../components/hero/MaxHowItWorksSection';
import CrmPlusMaxSection from '../components/sections/CrmPlusMaxSection';
import FinalCtaSection from '../components/sections/FinalCtaSection';

export default function HomePage() {
  return (
    <MainLayout>
      <MaxHeroSection />
      <MaxHowItWorksSection />
      <CrmPlusMaxSection />
      <FinalCtaSection />
    </MainLayout>
  );
}
