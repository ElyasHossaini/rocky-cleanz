# Deployment Guide - Email Configuration

## The Problem
Your contact form works on localhost but not on the deployed website because environment variables are only set locally.

## Solution: Configure Environment Variables on Your Hosting Platform

### Option 1: Vercel (Most Common for Next.js)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project

2. **Add Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Add these variables:

   **Variable 1:**
   - **Name**: `EMAIL_USER`
   - **Value**: Your Gmail address (e.g., `your-email@gmail.com`)
   - **Environment**: Production, Preview, Development

   **Variable 2:**
   - **Name**: `EMAIL_PASS`
   - **Value**: Your Gmail App Password (16-character password)
   - **Environment**: Production, Preview, Development

3. **Save and Redeploy**
   - Click **Save**
   - Your site will auto-redeploy, or you can trigger a manual redeploy

### Option 2: Netlify

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com/)
   - Select your site

2. **Add Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Add the same variables as above

3. **Redeploy**
   - Trigger a new deployment

### Option 3: Other Platforms

Most hosting platforms have similar settings:
- **Railway**: Settings → Variables
- **Render**: Environment → Environment Variables
- **DigitalOcean App Platform**: Settings → Environment Variables
- **AWS Amplify**: App settings → Environment variables

## Gmail App Password Setup

If you haven't set up your Gmail App Password yet:

1. **Enable 2-Step Verification**
   - Go to [myaccount.google.com](https://myaccount.google.com/)
   - Security → 2-Step Verification → Turn it on

2. **Generate App Password**
   - Go to Security → App passwords
   - Select "Mail" as the app
   - Generate the password
   - Use this 16-character password as your `EMAIL_PASS`

## Testing the Fix

1. **Deploy with environment variables**
2. **Test the contact form**
3. **Check your email** (probinz2025@gmail.com)
4. **Check browser console** for any error messages

## Troubleshooting

### If it still doesn't work:

1. **Check the logs**
   - Look at your hosting platform's function logs
   - Check browser console for errors

2. **Verify environment variables**
   - Make sure they're set for the correct environment (Production)
   - Check that the values are correct

3. **Test with a simple email**
   - Try sending to a different email address
   - Check if Gmail is blocking the connection

### Common Issues:

- **"Invalid login"**: Check your email and app password
- **"Authentication failed"**: Ensure 2-Step Verification is enabled
- **"Connection timeout"**: Check firewall settings on your hosting platform

## Alternative: Use Resend (Recommended for Production)

For better reliability, consider using [Resend](https://resend.com):

1. **Sign up for Resend** (free tier available)
2. **Get your API key**
3. **Replace the email configuration** with Resend's API

This is more reliable than Gmail for production use.

## Need Help?

If you're still having issues:
1. Check your hosting platform's documentation
2. Look at the function logs in your hosting dashboard
3. Test with a different email service

The key is making sure your environment variables are properly set in your production environment!


