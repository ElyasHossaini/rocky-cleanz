'use client'

import { useEffect, useRef } from 'react'

interface QRCodeGeneratorProps {
  url: string
  size?: number
  className?: string
}

const QRCodeGenerator = ({ url, size = 200, className = '' }: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return

      try {
        // Dynamic import of qrcode library
        const QRCode = (await import('qrcode')).default
        
        await QRCode.toCanvas(canvasRef.current, url, {
          width: size,
          margin: 2,
          color: {
            dark: '#1e40af', // Blue color matching your brand
            light: '#ffffff'
          }
        })
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }

    generateQRCode()
  }, [url, size])

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-200 rounded-lg shadow-lg"
      />
      <p className="text-sm text-gray-600 mt-2 text-center">
        Scan to visit our animated website
      </p>
    </div>
  )
}

export default QRCodeGenerator 