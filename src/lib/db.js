import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI environment variable is not defined. Please configure the MONGODB_URI environment variable in your deployment settings.'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true, // Retry write operations on network errors
      w: 'majority', // Write concern: require majority of nodes to acknowledge
    };

    // Ensure connection string has proper format
    let connectionString = MONGODB_URI.trim();
    
    // Add database name if connection string ends with /? or just /
    if (connectionString.endsWith('/?') || connectionString.endsWith('/')) {
      const dbName = process.env.MONGODB_DB_NAME || 'trueclean';
      connectionString = connectionString.replace(/\/\?$/, `/${dbName}?`);
      connectionString = connectionString.replace(/\/$/, `/${dbName}`);
    }
    
    // Ensure retryWrites and w=majority are in the connection string for production
    if (!connectionString.includes('retryWrites')) {
      connectionString += (connectionString.includes('?') ? '&' : '?') + 'retryWrites=true';
    }
    if (!connectionString.includes('w=')) {
      connectionString += (connectionString.includes('?') ? '&' : '?') + 'w=majority';
    }

    cached.promise = mongoose
      .connect(connectionString, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Handle connection events for production monitoring
if (process.env.NODE_ENV === 'production') {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
}

export default connectDB;

