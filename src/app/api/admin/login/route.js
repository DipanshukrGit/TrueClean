import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { generateToken } from '@/lib/jwt';

// Initialize admin user if it doesn't exist
async function initializeAdmin() {
  try {
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@trueclean.com';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      const newAdmin = await Admin.create({
        email: defaultEmail,
        password: defaultPassword,
      });
      
      console.log('Default admin user created:', newAdmin.email);
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
    // Re-throw if it's a critical error (like duplicate key)
    if (error.code === 11000) {
      console.log('Admin user already exists (duplicate key)');
    } else {
      throw error;
    }
  }
}

export async function POST(request) {
  try {
    // Connect to database
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB connection.' },
        { status: 500 }
      );
    }

    // Initialize admin if needed
    try {
      await initializeAdmin();
    } catch (initError) {
      console.error('Admin initialization error:', initError);
      // Continue even if initialization fails - admin might already exist
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
    });

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: {
          id: admin._id.toString(),
          email: admin.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Login failed. Please check your connection and try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { getTokenFromRequest, verifyToken } = await import('@/lib/jwt');
    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
