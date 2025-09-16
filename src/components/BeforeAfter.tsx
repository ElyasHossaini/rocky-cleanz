'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface BeforeAfterImage {
  before: string
  after: string
  id: number
}

const BeforeAfter = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50) // 50% position

  // Define the before/after image pairs
  const imagePairs: BeforeAfterImage[] = [
    {
      before: '/after/9B301F8B-7BE2-40E0-BB05-D390F62A0E94.JPG',
      after: '/before/10F29C98-1A4F-42C3-8506-F5EFF0E76873.JPG',
      id: 1
    },
    {
      before: '/after/IMG_4311.JPEG',
      after: '/before/IMG_4309.JPEG',
      id: 2
    },
    {
      before: '/after/IMG_4312.JPEG',
      after: '/before/IMG_4308.JPEG',
      id: 3
    },
    {
      before: '/after/IMG_4313.JPEG',
      after: '/before/IMG_4310.JPEG',
      id: 4
    }
  ]


  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setSliderPosition(50) // Reset slider position
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === imagePairs.length - 1 ? 0 : prevIndex + 1
    )
    setSliderPosition(50) // Reset slider position
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex => 
      prevIndex === 0 ? imagePairs.length - 1 : prevIndex - 1
    ))
    setSliderPosition(50) // Reset slider position
  }

  // Handle mouse move for slider
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) { // Only if left mouse button is pressed
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }
  }

  // Handle touch move for slider
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Before & After
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the amazing transformations we've achieved for our Calgary clients. 
            Professional exterior cleaning that brings your property back to life.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Image Comparison */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div 
              className="relative aspect-[4/3] w-full sm:aspect-[3/2] cursor-ew-resize select-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <Image
                  src={imagePairs[currentIndex].before}
                  alt={`Before cleaning - Project ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority={currentIndex === 0}
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-lg">
                  BEFORE
                </div>
              </div>

              {/* After Image with Slider */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={imagePairs[currentIndex].after}
                  alt={`After cleaning - Project ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* AFTER Label - positioned outside the clipped area */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-lg z-20">
                AFTER
              </div>

              {/* Slider Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next image"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-2 sm:space-x-4 overflow-x-auto px-4">
            {imagePairs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 ${
                  index === currentIndex 
                    ? 'ring-4 ring-blue-500 scale-110' 
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <Image
                  src={imagePairs[index].before}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your property? Get your free quote today!
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
