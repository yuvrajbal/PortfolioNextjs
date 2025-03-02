import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, body } = await request.json();

    // Validate the request
    if (!email || !body) {
      return NextResponse.json(
        { error: 'Email and body are required' },
        { status: 400 }
      );
    }

   
    console.log('Received message:', { email, body });

    const response = await fetch(process.env.BACKEND_URL + "/send-email", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        body
      })
    });
    console.log(response);
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 