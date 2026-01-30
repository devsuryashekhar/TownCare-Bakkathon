import express from 'express';
import Booking from '../models/Booking.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a booking (LOGIN REQUIRED)
router.post('/', protect, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user._id   // link booking to logged-in user
    });

    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings (LOGIN REQUIRED – dashboard)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('service')
      .populate('user', 'name email');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
