import User from "../models/User.js";

// GET /api/users/me
export const getMe = async (req, res) => {
    try {
        // req.user is populated by authMiddleware
        // We already selected "-password" in the middleware
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(req.user);
    } catch (error) {
        console.error("Error in getMe:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// PUT /api/users/me
export const updateMe = async (req, res) => {
    const { name, phone, address, profilePicture } = req.body;

    try {
        // req.user is a Mongoose document, so we can modify and save it directly.
        // However, to be safe and ensure we have the latest version (though middleware just fetched it),
        // we can use findByIdAndUpdate or just modify req.user.

        // Using findByIdAndUpdate is often cleaner for partial updates,
        // but modify+save triggers pre-save hooks (like password hashing) if we had them (not needed here for these fields).

        // Let's stick to findById to be explicit or use the one we have.
        // The middleware attached `req.user`.

        const user = req.user; // Already fetched by middleware

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error in updateMe:", error);
        res.status(500).json({ message: "Server error" });
    }
};
