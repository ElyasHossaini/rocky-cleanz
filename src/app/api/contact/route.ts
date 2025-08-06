import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Contact form data interface
interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  description: string
}

// Email template function
const createEmailTemplate = (data: ContactFormData): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Contact Form Submission</h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service Requested:</strong> ${data.service}</p>
      </div>
      
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e40af; margin-top: 0;">Project Description</h3>
        <p style="white-space: pre-wrap;">${data.description}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This message was sent from the Rocky Cleanz website contact form.
        </p>
      </div>
    </div>
  `
}

// Contact form API handler
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const formData: ContactFormData = await request.json()
    const { name, email, phone, service, description } = formData

    // Validate required fields
    if (!name || !email || !phone || !service || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Configure email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'probinz2025@gmail.com',
      subject: `New Contact Form Submission - ${service}`,
      html: createEmailTemplate(formData)
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending failed:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
} 