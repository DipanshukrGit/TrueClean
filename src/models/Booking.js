import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customer_phone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true,
    },
    customer_email: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
    },
    customer_state: {
      type: String,
      default: '',
      trim: true,
    },
    customer_city: {
      type: String,
      default: '',
      trim: true,
    },
    customer_date: {
      type: String,
      default: '',
      trim: true,
    },
    other_service: {
      type: String,
      default: '',
      trim: true,
    },
    selected_services: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);


