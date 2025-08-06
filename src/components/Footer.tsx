'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'

// Footer link interface
interface FooterLink {
  name: string
  href: string
  onClick: () => void
}

// Footer item interface
interface FooterItem {
  icon: React.ReactNode
  text: string
}

// Social media link interface
interface SocialLink {
  name: string
  icon: React.ReactNode
  href: string
}

// Footer section interface
interface FooterSection {
  title: string
  links?: FooterLink[]
  items?: FooterItem[]
  social?: SocialLink[]
}

// Footer component
const Footer = () => {
  const [mounted, setMounted] = useState(false)

  // Client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  // Footer sections data
  const footerSections: FooterSection[] = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '#home', onClick: () => scrollToSection('home') },
        { name: 'Services', href: '#services', onClick: () => scrollToSection('services') },
        { name: 'Contact', href: '#contact', onClick: () => scrollToSection('contact') }
      ]
    },
    {
      title: 'Contact Info',
      items: [
        { icon: <Phone className="w-5 h-5" />, text: '825-712-0857' },
        { icon: <Mail className="w-5 h-5" />, text: 'probinz2025@gmail.com' },
        { icon: <MapPin className="w-5 h-5" />, text: 'Calgary, AB' }
      ]
    },
    {
      title: 'Follow Us',
      social: [
        { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/rockycleanz' },
        { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/rockycleanz' }
      ]
    }
  ]

  // SSR fallback
  if (!mounted) {
    return (
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Rocky Cleanz Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h3 className="text-2xl font-bold text-blue-400">
                  Rocky Cleanz
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Professional exterior cleaning services bringing sparkle back to Calgary homes & businesses.
              </p>
            </div>
            
            {/* Footer sections */}
            {footerSections.map((section, index) => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold text-blue-400 mb-4">
                  {section.title}
                </h4>
                {section.links && (
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <span className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                          {link.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.items && (
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2 text-gray-300">
                        <span className="text-blue-400">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                {section.social && (
                  <div className="flex space-x-4">
                    {section.social.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Rocky Cleanz Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-2xl font-bold text-blue-400">
                Rocky Cleanz
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Professional exterior cleaning services bringing sparkle back to Calgary homes & businesses.
            </p>
          </motion.div>
          
          {/* Footer sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-blue-400 mb-4">
                {section.title}
              </h4>
              
              {/* Quick links */}
              {section.links && (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={link.onClick}
                        suppressHydrationWarning
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              
              {/* Contact items */}
              {section.items && (
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2 text-gray-300">
                      <span className="text-blue-400">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Social media links */}
              {section.social && (
                <div className="flex space-x-4">
                  {section.social.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-gray-400">
            © 2025 Rocky Cleanz. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 