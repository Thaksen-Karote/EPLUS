import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

/**
 * POST /api/vendor
 * 
 * Handles vendor/supplier inquiry submissions
 * 
 * Request body:
 * {
 *   companyName: string
 *   companyType: string (Supplier, Contractor, Consultant, etc.)
 *   contactPerson: string
 *   email: string
 *   phone: string
 *   website?: string
 *   area: string (STP, WTP, MEPF, Interior, etc.)
 *   yearsOfExperience: number
 *   certifications: string
 *   message: string
 * }
 * 
 * Response:
 * {
 *   success: boolean
 *   message?: string
 *   error?: string
 * }
 * 
 * TODO: Replace with actual vendor management system integration
 */

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const body = await request.json();

    // Validation
    const requiredFields = [
      'companyName',
      'companyType',
      'contactPerson',
      'email',
      'phone',
      'area',
      'yearsOfExperience',
      'message',
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);

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

    // TODO: Implement actual functionality
    // Options:
    // 1. Store in vendor database
    // 2. Send notification email to procurement team
    // 3. Integrate with vendor management system (SAP, Coupa, Jaggr, etc.)
    // 4. Create ticket in CRM

    console.log('Vendor inquiry submission:', body);

    // Mock success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your vendor inquiry. Our procurement team will review your submission and contact you shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Vendor inquiry error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process your request',
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
