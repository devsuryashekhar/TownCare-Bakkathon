import Provider from "../models/Provider.js";
import Service from "../models/Service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGNUP
export const signup = async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {
        const existingProvider = await Provider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ message: "Provider already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newProvider = new Provider({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
        });

        await newProvider.save();

        const token = jwt.sign(
            { email: newProvider.email, id: newProvider._id, role: "provider" },
            process.env.JWT_SECRET || "SECRET",
            { expiresIn: "1h" }
        );

        res.status(201).json({ result: newProvider, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingProvider = await Provider.findOne({ email });
        if (!existingProvider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingProvider.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: existingProvider.email, id: existingProvider._id, role: "provider" },
            process.env.JWT_SECRET || "SECRET",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingProvider, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// CREATE SERVICE
export const createService = async (req, res) => {
    const { category, priceQuote, contactDetails, companyName } = req.body;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    try {
        const newService = new Service({
            title: `${category} Service by ${companyName}`, // Default title
            description: `Professional ${category} services provided by ${companyName}.`, // Default desc
            category,
            priceQuote,
            contactDetails,
            companyName,
            providerId: req.userId,
        });

        await newService.save();

        const provider = await Provider.findById(req.userId);
        provider.services.push(newService._id);
        await provider.save();

        res.status(201).json(newService);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
