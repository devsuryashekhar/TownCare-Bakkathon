import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    location: String,
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    portfolio: [String], // Array of image URLs
    availability: [String], // e.g., "Mon-Fri 9am-5pm"
});

export default mongoose.model('Provider', providerSchema);
