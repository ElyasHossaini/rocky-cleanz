#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Email Setup for Rocky Cleanz Website');
console.log('==========================================\n');

// Check if .env.local already exists
const envPath = path.join(__dirname, '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  .env.local file already exists!');
  console.log('Please check if EMAIL_USER and EMAIL_PASS are configured correctly.\n');
} else {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# Email Configuration
# Replace with your actual Gmail credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Note: For Gmail, you need to use an App Password, not your regular password
# Follow the instructions in EMAIL_SETUP.md to set up Gmail App Password
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!\n');
}

console.log('📋 Next Steps:');
console.log('1. Open the .env.local file in your project root');
console.log('2. Replace "your-email@gmail.com" with your actual Gmail address');
console.log('3. Replace "your-app-password" with your Gmail App Password');
console.log('4. Follow the instructions in EMAIL_SETUP.md to set up Gmail App Password');
console.log('5. Restart your development server: npm run dev');
console.log('\n📖 For detailed instructions, see EMAIL_SETUP.md');

if (!envExists) {
  console.log('\n💡 Tip: You can also manually create the .env.local file with the content above.');
}
