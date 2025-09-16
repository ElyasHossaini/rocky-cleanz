'use client'

import { useState, useEffect, useRef } from 'react'

interface SocialVideo {
  id: number
  src: string
  title: string
  description: string
}

const SocialMedia = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const socialVideos: SocialVideo[] = [
    {
      id: 1,
      src: '/socials/325cb3d07cbf4471896c3db698bf7449.MOV',
      title: 'Professional Pressure Washing',
      description: 'Watch our team transform this Calgary property with our professional pressure washing service!'
    },
    {
      id: 2,
      src: '/socials/7ff34c3c969842c9b2900f86c6a5d8bc.MOV',
      title: 'Exterior Cleaning Magic',
      description: 'See the amazing results of our comprehensive exterior cleaning service in action!'
    }
  ]

  // Handle video play/pause
  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play().catch((error) => {
          console.log('Video play interrupted:', error)
          // Don't update state if play failed
        })
        setIsPlaying(true)
      } else {
        currentVideo.pause()
        setIsPlaying(false)
      }
    }
  }

  // Handle wheel scroll for video navigation
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isUserInteracting) return
    
    setIsUserInteracting(true)
    
    if (e.deltaY > 0 && currentVideoIndex < socialVideos.length - 1) {
      // Scroll down - next video
      setCurrentVideoIndex(prev => prev + 1)
    } else if (e.deltaY < 0 && currentVideoIndex > 0) {
      // Scroll up - previous video
      setCurrentVideoIndex(prev => prev - 1)
    }
    
    // Reset interaction flag after a delay
    setTimeout(() => setIsUserInteracting(false), 500)
  }

  // Handle touch/swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    const startY = touch.clientY
    const startTime = Date.now()

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.changedTouches[0]
      const endY = touch.clientY
      const endTime = Date.now()
      const deltaY = startY - endY
      const deltaTime = endTime - startTime

      if (deltaTime < 300 && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentVideoIndex < socialVideos.length - 1) {
          // Swipe up - next video
          setCurrentVideoIndex(prev => prev + 1)
        } else if (deltaY < 0 && currentVideoIndex > 0) {
          // Swipe down - previous video
          setCurrentVideoIndex(prev => prev - 1)
        }
      }
    }

    document.addEventListener('touchend', handleTouchEnd, { once: true, passive: false })
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && currentVideoIndex < socialVideos.length - 1) {
      e.preventDefault()
      setCurrentVideoIndex(prev => prev + 1)
    } else if (e.key === 'ArrowUp' && currentVideoIndex > 0) {
      e.preventDefault()
      setCurrentVideoIndex(prev => prev - 1)
    } else if (e.key === ' ') {
      e.preventDefault()
      togglePlayPause()
    }
  }

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const wheelHandler = (e: WheelEvent) => {
      // Only handle wheel events when the container is in view
      const rect = container.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isInView) {
        handleWheel(e)
      }
    }

    container.addEventListener('wheel', wheelHandler, { passive: false })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', wheelHandler)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentVideoIndex, isUserInteracting])

  // Auto-play current video and pause others
  useEffect(() => {
    // Clear any existing timeout
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current)
    }

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          // Pause all other videos first
          videoRefs.current.forEach((otherVideo, otherIndex) => {
            if (otherIndex !== index && otherVideo) {
              otherVideo.pause()
            }
          })
          
          // Add a small delay before playing to prevent conflicts
          playTimeoutRef.current = setTimeout(() => {
            video.currentTime = 0
            video.play().catch((error) => {
              console.log('Video auto-play interrupted:', error)
              setIsPlaying(false)
            })
            setIsPlaying(true)
          }, 100)
        } else {
          video.pause()
        }
      }
    })

    // Cleanup timeout on unmount
    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
      }
    }
  }, [currentVideoIndex])

  // Handle video ended - restart the same video
  const handleVideoEnded = () => {
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      currentVideo.currentTime = 0
      currentVideo.play().catch((error) => {
        console.log('Video restart interrupted:', error)
        setIsPlaying(false)
      })
    }
  }

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Follow Our Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our latest work in action! Scroll down to see more videos or use the navigation below.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative max-w-sm sm:max-w-md mx-auto h-[500px] sm:h-[600px] overflow-hidden rounded-2xl bg-gray-900 shadow-2xl"
          onTouchStart={handleTouchStart}
        >
          {/* Video Container */}
          <div 
            className="flex flex-col transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${currentVideoIndex * (isMobile ? 500 : 600)}px)` }}
          >
            {socialVideos.map((video, index) => (
              <div
                key={video.id}
                className="relative w-full h-[500px] sm:h-[600px] flex-shrink-0"
              >
                <video
                  ref={el => videoRefs.current[index] = el}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  onClick={togglePlayPause}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  {/* Play/Pause Button - only show when not playing */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlayPause}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-200 hover:scale-110"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  {/* Playing indicator */}
                  {isPlaying && index === currentVideoIndex && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>LIVE</span>
                    </div>
                  )}

                  {/* Video Info */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <h3 className="text-lg sm:text-2xl font-bold mb-2">{video.title}</h3>
                    <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  {/* Video Counter */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
                    <span className="text-xs sm:text-sm font-semibold">
                      {index + 1} / {socialVideos.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 sm:space-y-3">
            {socialVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  index === currentVideoIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          {currentVideoIndex < socialVideos.length - 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center text-white/70">
                <span className="text-xs mb-1">Scroll down</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}
        </div>


        {/* Social Media Links */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 mb-6">
            Follow us for more amazing transformations!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://facebook.com/rockycleanz"
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://instagram.com/rockycleanz"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialMedia
