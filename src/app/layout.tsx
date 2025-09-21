import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Font configuration
const inter = Inter({ subsets: ['latin'] })

// SEO and metadata configuration
export const metadata: Metadata = {
  title: 'Rocky Cleanz - Professional Cleaning Services Calgary',
  description: 'Professional cleaning services bringing sparkle back to Calgary homes & businesses. Fully insured, eco-friendly, and 5-star rated.',
  keywords: 'cleaning, pressure washing, Calgary, window cleaning, gutter cleaning, house washing',
  openGraph: {
    title: 'Rocky Cleanz - Professional Cleaning Services Calgary',
    description: 'Professional cleaning services bringing sparkle back to Calgary homes & businesses.',
    url: 'https://rockycleanz.com',
    siteName: 'Rocky Cleanz',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Rocky Cleanz Logo',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Rocky Cleanz",
    "image": "https://rockycleanz.com/images/logo.png",
    "description": "Professional cleaning services bringing sparkle back to Calgary homes & businesses.",
    "url": "https://rockycleanz.com",
    "telephone": "+1-403-479-4415",
    "email": "info@rockycleanz.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calgary",
      "addressLocality": "Calgary",
      "addressRegion": "AB",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.0447",
      "longitude": "-114.0719"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "51.0447",
        "longitude": "-114.0719"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pressure Washing",
            "description": "Professional pressure washing for driveways, sidewalks, and outdoor surfaces"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Window Cleaning",
            "description": "Professional window cleaning services for residential and commercial properties"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gutter Cleaning",
            "description": "Complete gutter cleaning and maintenance services"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewBody": "Excellent service! They did a fantastic job cleaning our house. Very professional and thorough."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Mike Chen"
        },
        "reviewBody": "Great team, very reliable and did an amazing job on our pressure washing project."
      }
    ]
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 