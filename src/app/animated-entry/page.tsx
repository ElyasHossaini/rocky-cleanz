'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'

const AnimatedEntry = () => {
  const [isGarageOpen, setIsGarageOpen] = useState(false)
  const [showMainSite, setShowMainSite] = useState(false)
  const [currentService, setCurrentService] = useState(0)

  const services = [
    'Bin Cleaning',
    'Pressure Washing',
    'Window Cleaning',
    'Gutter Cleaning',
    'Deck & Patio Cleaning'
  ]

  useEffect(() => {
    // Rotate through services
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [services.length])

  const handleEnterClick = () => {
    setIsGarageOpen(true)
    setTimeout(() => {
      setShowMainSite(true)
      // Redirect to main site after animation
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    }, 2000)
  }

  if (showMainSite) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold mb-2">Welcome to Rocky Cleanz!</h1>
          <p className="text-xl">Redirecting to our website...</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-300 relative overflow-hidden">
      {/* Animated clouds */}
      <motion.div
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-0 w-20 h-10 bg-white/30 rounded-full"
      />
      <motion.div
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-0 w-16 h-8 bg-white/40 rounded-full"
      />

      {/* House */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        {/* Roof */}
        <div className="w-96 h-32 bg-red-600 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[200px] border-r-[200px] border-b-[80px] border-l-transparent border-r-transparent border-b-red-600"></div>
        </div>

        {/* House body */}
        <div className="w-96 h-64 bg-yellow-300 relative">
          {/* Windows */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-blue-200 border-2 border-gray-600">
            <div className="w-full h-full bg-yellow-200 opacity-50"></div>
          </div>
          <div className="absolute top-8 right-8 w-16 h-16 bg-blue-200 border-2 border-gray-600">
            <div className="w-full h-full bg-yellow-200 opacity-50"></div>
          </div>

          {/* Door */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-32 bg-brown-600 border-2 border-gray-600">
            <div className="w-4 h-4 bg-yellow-400 rounded-full absolute top-4 left-2"></div>
          </div>

          {/* Garage */}
          <motion.div
            animate={isGarageOpen ? { y: -64 } : { y: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute bottom-0 left-8 w-32 h-16 bg-gray-400 border-2 border-gray-600"
          >
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Garage door */}
        <motion.div
          animate={isGarageOpen ? { y: -64 } : { y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute bottom-16 left-8 w-32 h-16 bg-gray-500 border-2 border-gray-600"
        >
          <div className="w-full h-full bg-gray-400 flex items-center justify-center">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Company branding */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Rocky Cleanz Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <h1 className="text-4xl font-bold text-blue-600 ml-4">
              Rocky Cleanz
            </h1>
          </div>

          <motion.div
            key={currentService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl font-semibold text-gray-700 mb-6"
          >
            {services[currentService]}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnterClick}
            disabled={isGarageOpen}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            <span>Enter</span>
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* Services floating around */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 text-blue-600 font-semibold"
      >
        Sparkling Clean
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-20 text-blue-600 font-semibold"
      >
        Professional Service
      </motion.div>
    </div>
  )
}

export default AnimatedEntry 