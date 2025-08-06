'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SprayCan, 
  Recycle, 
  Sofa, 
  Truck, 
  ChevronDown,
  Droplets,
  Sparkles
} from 'lucide-react'

// Service interface
interface Service {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  pricing: {
    title: string
    items: string[]
    note?: string
  }
}

// Services data
const services: Service[] = [
  {
    id: 'concrete-pressure-washing',
    title: 'Concrete Pressure Washing',
    icon: <SprayCan className="w-6 h-6" />,
    description: 'Removes dirt, grime & buildup from driveways, sidewalks, patios & more. Professional pressure washing that restores your concrete surfaces to their original beauty.',
    pricing: {
      title: 'Pricing:',
      items: [
        'Driveways: Starting at $150',
        'Sidewalks: Starting at $100',
        'Patios: Starting at $200',
        'Commercial: Custom quotes available'
      ],
      note: '*Pricing depends on size – message us for a quote!'
    }
  },
  {
    id: 'bin-cleaning',
    title: 'Bin & Dumpster Cleaning',
    icon: <Recycle className="w-6 h-6" />,
    description: 'Available for homes & businesses. Odour-free, pest-reducing, and eco-friendly cleaning that keeps your bins fresh and sanitary.',
    pricing: {
      title: 'Pricing:',
      items: [
        'Residential Bins: $50 each',
        'Commercial Bins: $75 each',
        'Dumpsters: Starting at $150',
        'Monthly Service: 20% discount'
      ],
      note: 'Fast and effective service!'
    }
  },
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    icon: <Sofa className="w-6 h-6" />,
    description: 'Choose from hand washing (deep clean) or machine vacuuming (quick refresh). Great for removing dirt, allergens, and stains from your carpets.',
    pricing: {
      title: 'Pricing:',
      items: [
        'Hand Cleaning (Deep Clean): $0.50/sq ft',
        'Vacuum Cleaning (Quick Refresh): $0.30/sq ft',
        'Stain Treatment: $25 per stain',
        'Bundle Discounts: Available for multi-room jobs'
      ],
      note: 'Bundle discounts available for multi-room carpet jobs!'
    }
  },
  {
    id: 'junk-removal',
    title: 'Junk Removal',
    icon: <Truck className="w-6 h-6" />,
    description: 'Tired of the clutter? Let Rocky Cleanz handle the mess so you don\'t have to! We offer professional junk removal for both residential and commercial clients.',
    pricing: {
      title: 'Services Include:',
      items: [
        'Furniture, Appliances, and Mattress Removal',
        'Yard Waste & Construction Debris',
        'Basement, Garage & Estate Cleanouts',
        'Office, Rental & Property Cleanups',
        'Responsible Disposal - We recycle what we can!'
      ],
      note: 'Custom pricing based on volume and type of items'
    }
  }
]

// Service card component
const ServiceCard = ({ 
  service, 
  isActive, 
  onToggle 
}: {
  service: Service
  isActive: boolean
  onToggle: () => void
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // SSR fallback
  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
        <div className="w-full p-6 text-left flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {service.title}
            </h3>
          </div>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-200 transition-all duration-300 hover:shadow-xl"
    >
      {/* Service header */}
      <button
        onClick={onToggle}
        suppressHydrationWarning
        className="w-full p-6 text-left flex items-center justify-between bg-gradient-to-r from-blue-50 to-white hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 rounded-t-2xl"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
            {service.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            {service.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>

      {/* Service details */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 border-t border-blue-100">
              {/* Service description */}
              <p className="text-gray-900 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              {/* Pricing information */}
              <div className="border-t border-blue-100 pt-4">
                <h4 className="text-blue-600 font-semibold mb-3">
                  {service.pricing.title}
                </h4>
                <ul className="space-y-2 mb-3">
                  {service.pricing.items.map((item, index) => (
                    <li 
                      key={index} 
                      className="text-gray-900 border-b border-blue-50 pb-2 last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {service.pricing.note && (
                  <p className="text-sm text-gray-900 italic">
                    {service.pricing.note}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main services component
const Services = () => {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [currentIcon, setCurrentIcon] = useState(0)

  // Service icons for rotation
  const serviceIcons = [
    <SprayCan key="spray" className="w-8 h-8 text-white" />,
    <Recycle key="recycle" className="w-8 h-8 text-white" />,
    <Sofa key="sofa" className="w-8 h-8 text-white" />,
    <Truck key="truck" className="w-8 h-8 text-white" />,
    <Droplets key="droplets" className="w-8 h-8 text-white" />,
    <Sparkles key="sparkles" className="w-8 h-8 text-white" />
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Rotate through service icons
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % serviceIcons.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [serviceIcons.length])

  // Toggle service dropdown
  const toggleService = (serviceId: string) => {
    setActiveService(activeService === serviceId ? null : serviceId)
  }

  // SSR fallback
  if (!mounted) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional cleaning services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg border-2 border-transparent">
                <div className="w-full p-6 text-left flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6"
          >
            <motion.div
              key={currentIcon}
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="absolute"
            >
              {serviceIcons[currentIcon]}
            </motion.div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Our Professional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From pressure washing to bin cleaning, we offer comprehensive solutions to keep your property looking its best. 
            Each service is tailored to your specific needs with competitive pricing and guaranteed results.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                service={service}
                isActive={activeService === service.id}
                onToggle={() => toggleService(service.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services 