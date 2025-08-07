#!/usr/bin/env node

console.log('🔍 Email Configuration Checker');
console.log('==============================\n');

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  console.log('❌ This script should be run in Node.js, not in the browser');
  process.exit(1);
}

// Check environment variables
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const nodeEnv = process.env.NODE_ENV;

console.log('📋 Environment Variables Status:');
console.log('--------------------------------');
console.log(`EMAIL_USER: ${emailUser ? '✅ Set' : '❌ Not set'}`);
console.log(`EMAIL_PASS: ${emailPass ? '✅ Set' : '❌ Not set'}`);
console.log(`NODE_ENV: ${nodeEnv || 'development'}`);
console.log('');

// Check if .env.local exists
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env.local');
const envExists = fs.existsSync(envPath);

console.log('📁 Local Environment File:');
console.log('---------------------------');
console.log(`.env.local exists: ${envExists ? '✅ Yes' : '❌ No'}`);

if (envExists) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasEmailUser = envContent.includes('EMAIL_USER=');
  const hasEmailPass = envContent.includes('EMAIL_PASS=');
  
  console.log(`Contains EMAIL_USER: ${hasEmailUser ? '✅ Yes' : '❌ No'}`);
  console.log(`Contains EMAIL_PASS: ${hasEmailPass ? '✅ Yes' : '❌ No'}`);
}

console.log('');

// Recommendations
console.log('💡 Recommendations:');
console.log('-------------------');

if (!emailUser || !emailPass) {
  console.log('❌ Email configuration is missing!');
  console.log('');
  console.log('For Local Development:');
  console.log('1. Run: npm run setup-email');
  console.log('2. Edit .env.local with your Gmail credentials');
  console.log('3. Restart your dev server: npm run dev');
  console.log('');
  console.log('For Production:');
  console.log('1. Go to your hosting platform dashboard');
  console.log('2. Add EMAIL_USER and EMAIL_PASS environment variables');
  console.log('3. Redeploy your site');
  console.log('');
  console.log('📖 See DEPLOYMENT_GUIDE.md for detailed instructions');
} else {
  console.log('✅ Email configuration appears to be set up correctly!');
  console.log('');
  console.log('If the form still doesn\'t work in production:');
  console.log('1. Check your hosting platform\'s environment variables');
  console.log('2. Verify your Gmail App Password is correct');
  console.log('3. Check the function logs in your hosting dashboard');
}

console.log('');
console.log('🔗 Useful Links:');
console.log('- Deployment Guide: DEPLOYMENT_GUIDE.md');
console.log('- Email Setup: EMAIL_SETUP.md');
console.log('- Gmail App Password: https://myaccount.google.com/apppasswords');


