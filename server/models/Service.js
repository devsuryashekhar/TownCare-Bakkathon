import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: {
        type: String,
        required: true,
        enum: [
            "Electrical",
            "Carpentry",
            "Plumbing",
            "Cleaning",
            "Appliance Repair",
            "Home Decor",
            "Personal Grooming",
            "Medical Treatments",
            "Grocery Dealings",
            "Security"
        ]
    },
    priceQuote: { type: Number, required: true },
    contactDetails: { type: String },
    companyName: { type: String },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    image: String, // URL
    rating: { type: Number, default: 0 },
});

export default mongoose.model('Service', serviceSchema);
