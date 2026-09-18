import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormData, ApiResponse } from '@/types';


/**
 * POST /api/contact
 * 
 * Handles contact form submissions and sends emails via Resend
 * 
 * Request body:
 * {
 *   name: string
 *   email: string
 *   phone: string
 *   company: string (optional)
 *   subject: string (optional)
 *   message: string
 * }
 * 
 * Response:
 * {
 *   success: boolean
 *   message?: string
 *   error?: string
 *   data?: { messageId: string }
 * }
 */

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<any>>> {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = ['name', 'email', 'phone', 'message'];
    const missingFields = requiredFields.filter((field) => !body[field] || body[field]?.trim() === '');

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is not properly configured',
        },
        { status: 500 }
      );
    }

    // Generate HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 15px;">Contact Details</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(body.name)}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(body.email)}" style="color: #2563eb;">${escapeHtml(body.email)}</a></p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${escapeHtml(body.phone)}</p>
          ${body.company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${escapeHtml(body.company)}</p>` : ''}
          ${body.subject ? `<p style="margin: 8px 0;"><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>` : ''}
        </div>

        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0; margin-bottom: 15px;">Message</h3>
          <p style="white-space: pre-wrap; word-wrap: break-word; margin: 0; color: #4b5563;">${escapeHtml(body.message)}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          This email was sent from the contact form at Engineering Plus. Please reply directly to ${escapeHtml(body.email)} to respond.
        </p>
      </div>
    `;

    // Generate plain text version
    const textContent = `
New Contact Form Submission

Contact Details:
Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone}
${body.company ? `Company: ${body.company}` : ''}
${body.subject ? `Subject: ${body.subject}` : ''}

Message:
${body.message}

---
This email was sent from the contact form at Engineering Plus.
Reply directly to ${body.email} to respond.
    `.trim();

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified domain email
      to: process.env.CONTACT_EMAIL_TO || 'info@engineeringplus.com',
      replyTo: body.email,
      subject: `New Contact Form: ${body.subject || 'General Inquiry'}`,
      html: htmlContent,
      text: textContent,
    });

    // Check if email was sent successfully
    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email',
        },
        { status: 500 }
      );
    }

    console.log('Contact form email sent:', {
      messageId: emailResponse.data?.id,
      from: body.email,
      subject: `New Contact Form: ${body.subject || 'General Inquiry'}`,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon.',
        data: {
          messageId: emailResponse.data?.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process your request',
      },
      { status: 500 }
    );
  }
}

// Allow only POST requests
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Please use POST.',
    },
    { status: 405 }
  );
}

/**
 * Escape HTML special characters to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}
