'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

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
  const [videoLoading, setVideoLoading] = useState<boolean[]>([])
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
      title: 'Cleaning Magic',
      description: 'See the amazing results of our comprehensive cleaning service in action!'
    },
    {
      id: 3,
      src: '/socials/a8136393a821418d93e323dd96e4470a.MOV',
      title: 'Amazing Transformation',
      description: 'Another incredible before and after transformation showcasing our professional cleaning expertise!'
    }
  ]

  // Handle video play/pause
  const togglePlayPause = useCallback(() => {
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
  }, [currentVideoIndex])

  // Handle wheel scroll for video navigation
  const handleWheel = useCallback((e: WheelEvent) => {
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
  }, [isUserInteracting, currentVideoIndex, socialVideos.length])

  // Handle touch/swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const touch = e.touches[0]
    const startY = touch.clientY
    const startTime = Date.now()

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
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

    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { once: true, passive: false })
    
    // Cleanup touchmove listener
    const cleanup = () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
    
    document.addEventListener('touchend', cleanup, { once: true })
  }

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
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
  }, [currentVideoIndex, socialVideos.length, togglePlayPause])

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
      // Only handle wheel events when the container is in view and focused
      const rect = container.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      const isMouseOver = rect.left <= e.clientX && e.clientX <= rect.right && 
                         rect.top <= e.clientY && e.clientY <= rect.bottom
      
      if (isInView && isMouseOver) {
        e.preventDefault()
        e.stopPropagation()
        handleWheel(e)
      }
    }

    // Prevent page scroll when touching the video container
    const preventPageScroll = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect()
      const touch = e.touches[0]
      const isTouchOver = rect.left <= touch.clientX && touch.clientX <= rect.right && 
                         rect.top <= touch.clientY && touch.clientY <= rect.bottom
      
      if (isTouchOver) {
        e.preventDefault()
      }
    }

    container.addEventListener('wheel', wheelHandler, { passive: false })
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchmove', preventPageScroll, { passive: false })

    return () => {
      container.removeEventListener('wheel', wheelHandler)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchmove', preventPageScroll)
    }
  }, [handleWheel, handleKeyDown])

  // Initialize video loading states
  useEffect(() => {
    setVideoLoading(new Array(socialVideos.length).fill(true))
  }, [socialVideos.length])

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
          
          // Preload the current video
          video.preload = "metadata"
          
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
          // Set other videos to not preload to save bandwidth
          video.preload = "none"
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

  // Handle video loading events
  const handleVideoLoadStart = (index: number) => {
    setVideoLoading(prev => {
      const newLoading = [...prev]
      newLoading[index] = true
      return newLoading
    })
  }

  const handleVideoCanPlay = (index: number) => {
    setVideoLoading(prev => {
      const newLoading = [...prev]
      newLoading[index] = false
      return newLoading
    })
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
          className="relative max-w-sm sm:max-w-md mx-auto h-[500px] sm:h-[600px] overflow-hidden rounded-2xl bg-gray-900 shadow-2xl touch-none"
          onTouchStart={handleTouchStart}
          style={{ touchAction: 'none' }}
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
                  ref={el => { videoRefs.current[index] = el }}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload={index === 0 ? "metadata" : "none"}
                  onEnded={handleVideoEnded}
                  onClick={togglePlayPause}
                  onLoadStart={() => handleVideoLoadStart(index)}
                  onCanPlay={() => handleVideoCanPlay(index)}
                  poster={`data:image/svg+xml;base64,${btoa(`
                    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#1f2937"/>
                      <text x="50%" y="50%" text-anchor="middle" fill="white" font-family="Arial" font-size="16">Loading...</text>
                    </svg>
                  `)}`}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Loading Spinner */}
                {videoLoading[index] && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                )}

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

        </div>


        {/* Social Media Links */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 mb-6">
            Follow us for more amazing transformations!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://instagram.com/rockycleanz"
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com/rockycleanz"
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
