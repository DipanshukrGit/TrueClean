import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import Booking from '@/models/Booking';
import { getTokenFromRequest, verifyToken } from '@/lib/jwt';

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

    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [contacts, bookings] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }),
      Booking.find().sort({ createdAt: -1 }),
    ]);

    // Calculate order statistics
    const totalOrders = bookings.length;
    const pendingOrders = bookings.filter(b => !b.status || b.status === 'pending').length;
    const activeOrders = bookings.filter(b => b.status === 'confirmed').length;
    const completedOrders = bookings.filter(b => b.status === 'completed').length;
    const cancelledOrders = bookings.filter(b => b.status === 'cancelled').length;

    return NextResponse.json(
      {
        contacts,
        bookings,
        totalContacts: contacts.length,
        totalBookings: bookings.length,
        orderStats: {
          total: totalOrders,
          pending: pendingOrders,
          active: activeOrders,
          completed: completedOrders,
          cancelled: cancelledOrders,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
