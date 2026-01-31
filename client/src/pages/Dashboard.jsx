import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Phone, MapPin, Save, LogOut, Calendar } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("profile"); // profile | bookings
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.get("http://localhost:5000/api/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile", error);
            Swal.fire("Error", "Failed to load profile", "error");
            setLoading(false);
            if (error.response?.status === 401) {
                navigate("/login");
            }
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://localhost:5000/api/users/me",
                {
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            Swal.fire("Success", "Profile updated successfully!", "success");
        } catch (error) {
            console.error("Error updating profile", error);
            Swal.fire("Error", "Failed to update profile", "error");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (loading) return <div className="p-10 text-center text-text-light dark:text-text-dark">Loading...</div>;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-primary mb-8">User Dashboard</h1>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4 bg-white dark:bg-card-dark rounded-xl shadow-lg p-4 h-fit">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                                <span className="text-2xl font-bold text-primary">
                                    {user.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                                {user.name}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>

                        <nav className="flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === "profile"
                                    ? "bg-primary text-white"
                                    : "text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <User size={20} />
                                Profile
                            </button>
                            <button
                                onClick={() => setActiveTab("bookings")}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === "bookings"
                                    ? "bg-primary text-white"
                                    : "text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <Calendar size={20} />
                                My Bookings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 mt-4 transition-colors"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white dark:bg-card-dark rounded-xl shadow-lg p-6">
                        {activeTab === "profile" ? (
                            <form onSubmit={handleSave} className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                                    Profile Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                            <input
                                                type="text"
                                                name="name"
                                                value={user.name || ""}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={user.email || ""}
                                            disabled
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                                            <input
                                                type="text"
                                                name="phone"
                                                value={user.phone || ""}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Address
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                                            <textarea
                                                name="address"
                                                value={user.address || ""}
                                                onChange={handleChange}
                                                placeholder="Enter your full address"
                                                rows="3"
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-lg transition-colors shadow-md"
                                    >
                                        <Save size={20} />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-12">
                                <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
                                    No Bookings Yet
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    You haven't made any service bookings yet.
                                </p>
                                <button
                                    onClick={() => navigate("/services")}
                                    className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                                >
                                    Browse Services
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
