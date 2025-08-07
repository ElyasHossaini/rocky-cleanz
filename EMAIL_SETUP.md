# Email Setup Instructions

## Setting up Email Functionality

The contact form requires email configuration to send form submissions. Follow these steps:

### 1. Create Environment File

Create a `.env.local` file in the root directory with the following variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Gmail App Password Setup

For Gmail, you need to use an App Password instead of your regular password:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Enable **2-Step Verification** if not already enabled
3. Go to **Security** > **App passwords**
4. Select "Mail" as the app
5. Generate a new app password
6. Use this 16-character password as your `EMAIL_PASS`

### 3. Alternative Email Services

You can also use other email services by modifying the transporter configuration in `/src/app/api/contact/route.ts`:

#### For Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
```

#### For Custom SMTP:
```javascript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
```

### 4. Testing

1. Start the development server: `npm run dev`
2. Fill out the contact form
3. Submit the form
4. Check your email for the submission

### 5. Troubleshooting

- **"Invalid login" error**: Check your email and app password
- **"Authentication failed"**: Ensure 2-Step Verification is enabled
- **"Connection timeout"**: Check your internet connection and firewall settings

### 6. Production Deployment

For production deployment (Vercel, Netlify, etc.):

1. Add the environment variables in your hosting platform's dashboard
2. Ensure the email service allows external connections
3. Test the form after deployment

## Security Notes

- Never commit your `.env.local` file to version control
- Use app passwords instead of regular passwords
- Consider using a dedicated email service for production (SendGrid, Mailgun, etc.) 