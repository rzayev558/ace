import { NextRequest, NextResponse } from 'next/server';
import { generateEmailBody } from '../../utils/generateEmailBody';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json(); // Parse JSON data from the request body
    console.log('Received form data:', formData); // Log the received data for debugging
    const emailBody = generateEmailBody(formData);

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Freera Sales <info@resend.dev>',
      to: ['info@freerasales.com'],
      subject: 'New Contract Submission',
      html: emailBody,
    });

    if (error) {
      console.log('Error sending email:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}