// pages/index.tsx
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Calculator from '@/components/Calculator';
import Testimonials from '@/components/Testimonials';
import Participantes from '@/components/Participantes';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Solar Phoenix - Economize com Energia Solar</title>
        <meta name="description" content="Calcule seu gasto energético e veja quantas placas solares você precisa para economizar." />
      </Head>
      <Navbar />
      <Hero />
      <Benefits />
      <Calculator />
      <Testimonials />
      <Participantes />
      <Contact />
      <Footer />
    </>
  );
}
