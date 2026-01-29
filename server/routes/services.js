import express from 'express';
import Service from '../models/Service.js';
import Provider from '../models/Provider.js';

const router = express.Router();

// GET all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().populate('provider');
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('provider');
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new service (for admin/seed)
router.post('/', async (req, res) => {
    const service = new Service(req.body);
    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Seed endpoint (Dev only)
router.post('/seed', async (req, res) => {
    try {
        await Service.deleteMany({});
        await Provider.deleteMany({});

        const provider = new Provider({
            name: "John Doe",
            bio: "Expert Plumber with 10 years experience",
            location: "Downtown",
            rating: 4.8,
            availability: ["Mon-Fri"],
            portfolio: ["https://placehold.co/100x100"],
        });
        const savedProvider = await provider.save();

        const services = [
            {
                title: "Leaky Faucet Repair",
                description: "Fixing dripping faucets quickly.",
                category: "Plumbing",
                price: 50,
                provider: savedProvider._id,
                image: "https://placehold.co/400x300",
                rating: 4.5
            },
            {
                title: "Full Home Cleaning",
                description: "Deep cleaning for 2-bedroom apartments.",
                category: "Cleaning",
                price: 120,
                provider: savedProvider._id, // Using same for demo
                image: "https://placehold.co/400x300",
                rating: 4.9
            }
        ];

        await Service.insertMany(services);
        res.json({ message: "Database seeded!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
