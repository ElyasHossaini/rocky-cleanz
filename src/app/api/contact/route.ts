import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, services, description } = body

    // Validate required fields
    if (!name || !email || !phone || !services || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // your app password
      }
    })

    // Format services for email
    const servicesList = services.map((service: string) => {
      const serviceMap: { [key: string]: string } = {
        'concrete-pressure-washing': 'Concrete Pressure Washing',
        'bin-cleaning': 'Bin & Dumpster Cleaning',
        'carpet-cleaning': 'Carpet Cleaning',
        'junk-removal': 'Junk Removal',
        'window-cleaning': 'Window Cleaning',
        'gutter-cleaning': 'Gutter Cleaning',
        'house-washing': 'House Washing',
        'other': 'Other'
      }
      return serviceMap[service] || service
    }).join(', ')

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'probinz2025@gmail.com', // your business email
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Services Requested</h3>
            <p><strong>Services:</strong> ${servicesList}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Project Description</h3>
            <p style="white-space: pre-wrap;">${description}</p>
          </div>
          
          <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #166534;">
              <strong>Submission Time:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
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