import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Provider", providerSchema);
