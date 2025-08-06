# Rocky Cleanz Website

A modern, chic single-page website for Rocky Cleanz cleaning services built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Interactive Services**: Clickable dropdown cards for each service with pricing information
- **Contact Form**: Functional contact form with email integration
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations for elegant transitions
- **Fixed Header**: Navigation with Calgary skyline background
- **Social Media Integration**: Links to Instagram and Facebook
- **SEO Optimized**: Proper metadata and Open Graph tags

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
rocky-cleanz-website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts    # Email API endpoint
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── Header.tsx          # Navigation header
│       ├── Hero.tsx            # Hero section
│       ├── Services.tsx        # Services with dropdowns
│       ├── Contact.tsx         # Contact form
│       └── Footer.tsx          # Footer with links
├── public/
│   └── images/
│       ├── logo.png            # Company logo
│       └── header-bg.png       # Header background
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rocky-cleanz-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Setup

The contact form sends real emails using Nodemailer. See `EMAIL_SETUP.md` for detailed setup instructions.

## 🎨 Customization

### Colors
The website uses Tailwind CSS with a blue color scheme. You can customize colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    }
  }
}
```

### Services
To add or modify services, edit the `services` array in `src/components/Services.tsx`:

```typescript
const services: Service[] = [
  {
    id: 'your-service',
    title: 'Your Service',
    icon: <YourIcon className="w-6 h-6" />,
    description: 'Service description...',
    pricing: {
      title: 'Pricing:',
      items: ['Item 1: $X', 'Item 2: $Y'],
      note: 'Optional note'
    }
  }
]
```

### Contact Information
Update contact details in `src/components/Contact.tsx` and `src/components/Footer.tsx`.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary to Rocky Cleanz.

## 📞 Support

For support, contact Rocky Cleanz at probinz2025@gmail.com or 825-712-0857. 