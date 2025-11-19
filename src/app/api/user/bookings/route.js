import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

export async function GET(request) {
  try {
    await connectDB();

    // Check authentication
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Fetch user's bookings
    const bookings = await Booking.find({ user: decoded.userId })
      .sort({ createdAt: -1 })
      .select('-user'); // Exclude user field from response

    return NextResponse.json(
      { bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

