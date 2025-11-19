import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(request) {
  try {
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: dbError.message || 'Database connection failed. Please check your MongoDB connection configuration.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      name,
      whatsapp,
      email,
      state,
      city,
      date,
      otherService,
      selectedServices,
    } = body;

    if (!name || !whatsapp || !email) {
      return NextResponse.json(
        { error: 'Name, WhatsApp number, and email are required' },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      customer_name: name.trim(),
      customer_phone: whatsapp.trim(),
      customer_email: email.trim().toLowerCase(),
      customer_state: state?.trim() || '',
      customer_city: city?.trim() || '',
      customer_date: date?.trim() || '',
      other_service: otherService?.trim() || '',
      selected_services: selectedServices || {},
    });

    return NextResponse.json(
      { message: 'Booking request submitted successfully', id: booking._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting booking:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: Object.values(error.errors).map(e => e.message).join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit booking request' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: dbError.message || 'Database connection failed. Please check your MongoDB connection configuration.' },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { verifyToken } = await import('@/lib/jwt');
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
