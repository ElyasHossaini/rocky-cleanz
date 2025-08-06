'use client'

import { motion } from 'framer-motion'
import { 
  Clock, 
  Shield, 
  Leaf, 
  Truck, 
  Star, 
  Phone,
  CheckCircle,
  Sparkles
} from 'lucide-react'

// Why Choose Us component
const WhyChooseUs = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick & Efficient",
      description: "We work fast without compromising quality. Most jobs completed in under 2 hours."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Fully Insured",
      description: "Complete peace of mind with comprehensive insurance coverage for all our services."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Eco-Friendly",
      description: "We use environmentally safe cleaning products that protect your property and the planet."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Reliable Service",
      description: "Professional equipment and trained technicians ensure consistent, high-quality results."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "5-Star Rated",
      description: "Join hundreds of satisfied customers who trust Rocky Cleanz for their cleaning needs."
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Easy booking and responsive customer service whenever you need us."
    }
  ]

  const benefits = [
    "Professional-grade equipment",
    "Licensed & certified technicians",
    "Competitive pricing",
    "Satisfaction guaranteed",
    "Free estimates",
    "Flexible scheduling"
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Rocky Cleanz?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine professional expertise with eco-friendly practices to deliver exceptional results that exceed expectations.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benefits section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                What You Can Expect
              </h3>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                When you choose Rocky Cleanz, you&apos;re choosing a team that values quality, efficiency, and customer satisfaction above all else.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                    <span className="text-blue-100">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
            >
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200 mb-4">Happy Customers</div>
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <div className="text-blue-200">4.9/5 Average Rating</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs 