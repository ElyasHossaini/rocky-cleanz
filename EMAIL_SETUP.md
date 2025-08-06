# Email Setup Guide

## Setting Up Email Functionality

Your contact form is now configured to send real emails using a Next.js API route with Nodemailer. Follow these steps to set it up:

### 1. Create Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 2. Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as your `EMAIL_PASS`

### 3. Update Email Configuration

In `src/app/api/contact/route.ts`, update these lines:

```typescript
// Line 25: Update with your Gmail address
user: process.env.EMAIL_USER,

// Line 26: Update with your app password
pass: process.env.EMAIL_PASS

// Line 32: Update with your Gmail address
from: process.env.EMAIL_USER,

// Line 33: Update with your business email (where you want to receive emails)
to: 'probinz2025@gmail.com',
```

### 4. Test the Setup

1. Start your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check your business email for the received message

### Features

✅ **Real Email Sending**: Uses Gmail SMTP to send actual emails
✅ **Professional Email Template**: Beautifully formatted HTML emails
✅ **Form Validation**: Validates all required fields
✅ **Error Handling**: Graceful error handling and user feedback
✅ **Security**: Uses environment variables for sensitive data
✅ **Responsive Design**: Emails look great on all devices

### Email Template Includes:

- **Contact Information**: Name, email, phone, service requested
- **Project Description**: Detailed description of work needed
- **Professional Styling**: Blue color scheme matching your website
- **Clear Formatting**: Easy to read and respond to

### Troubleshooting

If emails aren't sending:

1. **Check Environment Variables**: Ensure `.env.local` is in the project root
2. **Verify Gmail Settings**: Make sure 2FA is enabled and app password is correct
3. **Check Console**: Look for error messages in the browser console
4. **Test API Route**: Try sending a POST request to `/api/contact` directly

### Security Notes

- Never commit `.env.local` to version control
- Use app passwords, not your main Gmail password
- Consider using a dedicated business email for receiving inquiries

Your contact form is now ready to send real emails! 🎉 