import React from 'react'; // Adicione esta linha!
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrustBadges from './components/TrustBadges';
import HowItWorks from './components/HowItWorks';
import VideoSection from './components/VideoSection';
import BlogPreview from './components/BlogPreview';
import FAQSection from './components/FAQSection';
import LawyerProfiles from './components/LawyerProfiles';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CalculatorForm from './components/Calculator/CalculatorForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <HowItWorks />
        <CalculatorForm />
        <VideoSection />
        <BlogPreview />
        <FAQSection />
        <LawyerProfiles />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;