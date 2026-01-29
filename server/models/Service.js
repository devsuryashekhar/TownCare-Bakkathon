import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    price: Number, // Base price
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    image: String, // URL
    rating: { type: Number, default: 0 },
});

export default mongoose.model('Service', serviceSchema);
