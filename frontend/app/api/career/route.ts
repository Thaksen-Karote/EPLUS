import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';



const HR_EMAIL = process.env.HR_EMAIL || 'hr@engineeringplus.co.in';

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const formData = await request.formData();

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const position = formData.get('position') as string;
    const message = formData.get('message') as string;
    const resumeFile = formData.get('resume') as File;

    // Validation
    if (!fullName || !email || !contactNumber || !position) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!resumeFile) {
      return NextResponse.json(
        { success: false, error: 'Resume file is required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const resumeBuffer = await resumeFile.arrayBuffer();
    const resumeBase64 = Buffer.from(resumeBuffer).toString('base64');

    // EMAIL 1: Send to HR with resume attachment (reply goes to applicant)
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: HR_EMAIL,
      replyTo: email,
      subject: `New Job Application: ${position} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E11D48 0%, #FB923C 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Job Application</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb;">
            
            <h2 style="color: #1e293b; border-bottom: 2px solid #E11D48; padding-bottom: 10px;">
              <span style="display: inline-block; width: 8px; height: 8px; background: #E11D48; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
              <span style="vertical-align: middle;">Personal Details</span>
            </h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Full Name:</td>
                <td style="padding: 8px 0; color: #0f172a;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 8px 0; color: #0f172a;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Contact:</td>
                <td style="padding: 8px 0; color: #0f172a;">${contactNumber}</td>
              </tr>
            </table>

            <h2 style="color: #1e293b; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
              <span style="display: inline-block; width: 8px; height: 8px; background: #10B981; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
              <span style="vertical-align: middle;">Job Details</span>
            </h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Position:</td>
                <td style="padding: 8px 0; color: #0f172a;">${position}</td>
              </tr>
            </table>

            ${message ? `
              <h2 style="color: #1e293b; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #0891B2; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                <span style="vertical-align: middle;">Cover Note</span>
              </h2>
              <p style="padding: 15px; background: white; border-left: 4px solid #0891B2; color: #0f172a;">${message}</p>
            ` : ''}

            <div style="margin-top: 30px; padding: 20px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;">
              <p style="margin: 0; color: #475569; font-size: 14px;">
                <span style="display: inline-block; width: 6px; height: 10px; border: 2px solid #64748b; border-radius: 2px; margin-right: 8px; vertical-align: middle;"></span>
                Resume attached: <strong>${resumeFile.name}</strong>
              </p>
            </div>
          </div>

          <div style="padding: 20px; text-align: center; background: #1e293b; color: #94a3b8; font-size: 12px;">
            <p style="margin: 0;">Engineering Plus - HR Department</p>
            <p style="margin: 5px 0 0 0;">This is an automated message from the careers portal.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: resumeFile.name,
          content: resumeBase64,
        },
      ],
    });

    if (error) {
      console.error('❌ [HR EMAIL] Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send application' },
        { status: 500 }
      );
    }

    console.log('✅ [HR EMAIL] Application email sent:', {
      messageId: data?.id,
      to: HR_EMAIL,
      applicant: fullName,
      position: position,
      subject: `New Job Application: ${position} - ${fullName}`,
    });

    // EMAIL 2: Send confirmation to applicant (no-reply)
    // NOTE: In testing mode, Resend only sends to verified email
    // In production, this will send to the actual applicant's email
    const confirmationResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.NODE_ENV === 'production' ? email : HR_EMAIL, // Use HR_EMAIL for testing
      subject: `[${process.env.NODE_ENV === 'production' ? '' : 'TEST - '}]Application Received - Engineering Plus${process.env.NODE_ENV === 'production' ? '' : ` (Would go to: ${email})`}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E11D48 0%, #FB923C 100%); padding: 30px; text-align: center;">
            <div style="display: inline-block; width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 50%; margin-bottom: 12px; position: relative;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; top: 12px; left: 12px;">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h1 style="color: white; margin: 0; font-size: 24px;">Application Submitted Successfully</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <p style="font-size: 16px; color: #1e293b;">Dear <strong>${fullName}</strong>,</p>
            
            <p style="color: #475569;">Thank you for applying for the <strong style="color: #E11D48;">${position}</strong> position at Engineering Plus.</p>
            
            <div style="background: white; border-left: 4px solid #10B981; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #059669; font-size: 15px;">
                <span style="display: inline-block; width: 18px; height: 18px; background: #10B981; border-radius: 50%; text-align: center; line-height: 18px; color: white; font-size: 12px; font-weight: bold; margin-right: 8px; vertical-align: middle;">✓</span>
                <span style="vertical-align: middle;"><strong>Your application has been received</strong></span>
              </p>
              <p style="margin: 10px 0 0 0; color: #475569; font-size: 14px; padding-left: 26px;">Our HR team will review your application and contact you if your profile matches our requirements.</p>
            </div>
            
            <div style="background: #fff3e0; border-left: 4px solid #fb923c; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #f97316; font-weight: 600;">
                <span style="display: inline-block; width: 18px; height: 18px; background: #fb923c; border-radius: 50%; text-align: center; line-height: 18px; color: white; font-size: 11px; font-weight: bold; margin-right: 8px; vertical-align: middle;">→</span>
                <span style="vertical-align: middle;">Next Steps:</span>
              </p>
              <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #475569; font-size: 14px;">
                <li>Application review by HR team</li>
                <li>Shortlisted candidates will be contacted via email or phone</li>
                <li>Interview schedule will be shared if selected</li>
              </ul>
            </div>
            
            <p style="color: #64748b; font-size: 13px; margin-top: 30px;">
              Best regards,<br>
              <strong>HR Department</strong><br>
              Engineering Plus
            </p>
          </div>
          
          <div style="padding: 20px; text-align: center; background: #1e293b;">
            <div style="display: inline-block; padding: 10px 20px; background: rgba(248, 113, 113, 0.15); border-radius: 6px; border: 1px solid rgba(248, 113, 113, 0.3); margin-bottom: 10px;">
              <p style="margin: 0; color: #f87171; font-size: 12px; font-weight: 600;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                DO NOT REPLY TO THIS EMAIL
              </p>
            </div>
            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 11px;">This is an automated message. For inquiries, please contact hr@engineeringplus.co.in</p>
            <p style="margin: 15px 0 0 0; color: #64748b; font-size: 11px;">Engineering Plus - Leading EPC Solutions Provider</p>
          </div>
        </div>
      `,
    });

    if (confirmationResponse.error) {
      console.error('❌ [CONFIRMATION EMAIL] Failed to send confirmation to applicant:', confirmationResponse.error);
      // Don't fail the whole request, HR email was sent successfully
    } else {
      console.log('✅ [CONFIRMATION EMAIL] Confirmation email sent:', {
        messageId: confirmationResponse.data?.id,
        sentTo: process.env.NODE_ENV === 'production' ? email : `${HR_EMAIL} (TEST MODE)`,
        intendedRecipient: email,
        applicant: fullName,
        note: process.env.NODE_ENV === 'production' ? 'Production mode' : 'Development mode - sent to verified email',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data,
    });

  } catch (error) {
    console.error('Career API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
