// Component imports
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import QRCodeGenerator from '@/components/QRCodeGenerator'

// Main page component
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      
      {/* QR Code Section */}
      <section id="qr-code" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Experience Our Animated Website
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Scan this QR code with your phone to visit our special animated entry page. 
              Watch our garage door open and discover Rocky Cleanz in a whole new way!
            </p>
          </div>
          
          <div className="flex justify-center">
            <QRCodeGenerator 
              url={`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/animated-entry`}
              size={250}
              className="bg-white p-6 rounded-xl shadow-lg"
            />
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              📱 Point your phone camera at the QR code above
            </p>
          </div>
        </div>
      </section>
      
      <Contact />
      <Footer />
    </main>
  )
} 