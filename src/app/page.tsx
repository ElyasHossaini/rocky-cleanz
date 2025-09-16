// Component imports
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyChooseUs from '@/components/WhyChooseUs'
import BeforeAfter from '@/components/BeforeAfter'
import SocialMedia from '@/components/SocialMedia'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Main page component
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <BeforeAfter />
      <SocialMedia />
      <Contact />
      <Footer />
    </main>
  )
} 