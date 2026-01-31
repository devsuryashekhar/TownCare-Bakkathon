import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  password: String,
  phone: { type: String, unique: true, sparse: true },
  address: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  googleId: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
