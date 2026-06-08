import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import GlobalStyles from '@/components/ui/GlobalStyles';

export default function HomePage() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
