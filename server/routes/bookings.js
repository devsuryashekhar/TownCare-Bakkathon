import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// Create a booking
router.post('/', async (req, res) => {
    const booking = new Booking(req.body);
    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all bookings (Admin/Dashboard)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('service');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
