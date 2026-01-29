import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    user: { type: String, required: true }, // Placeholder for User ID or Name
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
    notes: String,
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
