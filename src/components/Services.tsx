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
  Sparkles,
  Home,
  AppWindow
} from 'lucide-react'

// Service interface
interface Service {
  id: string
  title: string
  icon: React.ReactNode
  idealFor: string
  includedServices: string[]
  snowRemovalCoverage: string
  estimatedPrice: string
}

// Services data
const services: Service[] = [
  {
    id: 'essential-care',
    title: 'Essential Care Plan',
    icon: <Home className="w-6 h-6" />,
    idealFor: 'Small homes, duplexes, and townhouses',
    includedServices: [
      'Bin cleaning (1×/month)',
      'Front walkway & entry pressure wash (1×/month)',
      'Lawn mowing & edging (bi-weekly)',
      'Light weed removal',
      'Ground-level window cleaning (1×/month)'
    ],
    snowRemovalCoverage: 'Driveway and front walkway',
    estimatedPrice: '$179 – $229 / month'
  },
  {
    id: 'executive-care',
    title: 'Executive Care Plan',
    icon: <Sofa className="w-6 h-6" />,
    idealFor: 'Mid-sized homes, corner lots, or small commercial units',
    includedServices: [
      'Bin cleaning (2×/month)',
      'Driveway, sidewalk & patio pressure wash (rotating schedule)',
      'Lawn mowing, edging & weed control (weekly)',
      'Hedge trimming (monthly)',
      'Exterior window cleaning (1×/month)',
      'Seasonal cleanup (leaves, debris, salt buildup)'
    ],
    snowRemovalCoverage: 'Driveway, front walkway, and sidewalk frontage',
    estimatedPrice: '$279 – $359 / month'
  },
  {
    id: 'prestige-care',
    title: 'Prestige Care Plan',
    icon: <Sparkles className="w-6 h-6" />,
    idealFor: 'Large homes, multi-unit properties, or medium commercial sites',
    includedServices: [
      'Bin cleaning (weekly, all containers)',
      'Power washing rotation (front, sides, back + entry)',
      'Lawn mowing & edging (weekly)',
      'Weed removal & hedge trimming (bi-weekly)',
      'Exterior window cleaning (2×/month)',
      'Seasonal deep cleanup (spring + fall)'
    ],
    snowRemovalCoverage: 'Driveways, walkways, sidewalks, and small lots',
    estimatedPrice: '$449 – $599 / month'
  },
  {
    id: 'signature-property',
    title: 'Signature Property Plan',
    icon: <Truck className="w-6 h-6" />,
    idealFor: 'Plazas, offices, restaurants, and large commercial sites',
    includedServices: [
      'Weekly property maintenance (landscaping + cleaning)',
      'Power washing (sidewalks, drive-thru lanes, façades, dumpster pads)',
      'Window cleaning (bi-weekly or monthly)',
      'Full bin cleaning (all containers)',
      'Lawn mowing, trimming, and debris clearing (weekly)',
      'Dedicated service manager + 24-hour response'
    ],
    snowRemovalCoverage: 'Full lot clearing, walkways, salting, and sanding',
    estimatedPrice: 'From $699 + (custom quote)'
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
              {/* Ideal For */}
              <div className="mb-4">
                <h4 className="text-blue-600 font-semibold mb-2">
                  Ideal for:
                </h4>
                <p className="text-gray-900 leading-relaxed">
                  {service.idealFor}
                </p>
              </div>
              
              {/* Included Services */}
              <div className="border-t border-blue-100 pt-4 mb-4">
                <h4 className="text-blue-600 font-semibold mb-3">
                  Included Services:
                </h4>
                <ul className="space-y-2">
                  {service.includedServices.map((item, index) => (
                    <li 
                      key={index} 
                      className="text-gray-900 flex items-start"
                    >
                      <span className="text-blue-600 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Snow Removal Coverage */}
              <div className="border-t border-blue-100 pt-4 mb-4">
                <h4 className="text-blue-600 font-semibold mb-2">
                  Snow Removal Coverage:
                </h4>
                <p className="text-gray-900 leading-relaxed">
                  {service.snowRemovalCoverage}
                </p>
              </div>

              {/* Estimated Price */}
              <div className="border-t border-blue-100 pt-4">
                <h4 className="text-blue-600 font-semibold mb-2">
                  Estimated Price:
                </h4>
                <p className="text-gray-900 font-semibold text-lg">
                  {service.estimatedPrice}
                </p>
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
    <Home key="home" className="w-8 h-8 text-white" />,
    <SprayCan key="spray" className="w-8 h-8 text-white" />,
    <Recycle key="recycle" className="w-8 h-8 text-white" />,
    <Sofa key="sofa" className="w-8 h-8 text-white" />,
    <Truck key="truck" className="w-8 h-8 text-white" />,
    <AppWindow key="window" className="w-8 h-8 text-white" />,
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
              Rocky Cleanz Monthly Service Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
              (Exterior Cleaning + Landscaping + Snow Removal)
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive monthly service packages tailored to your property needs.
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
            Rocky Cleanz Monthly Service Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            (Exterior Cleaning + Landscaping + Snow Removal)
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive monthly service packages tailored to your property needs. 
            Each plan combines exterior cleaning, landscaping, and snow removal for hassle-free property maintenance.
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