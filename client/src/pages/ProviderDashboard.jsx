import React, { useState } from "react";
import axios from "axios";
import { Upload, DollarSign, Phone, Building, Briefcase, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProviderDashboard = () => {
    const [serviceData, setServiceData] = useState({
        companyName: "",
        category: "Electrical",
        contactDetails: "",
        priceQuote: "",
    });
    const navigate = useNavigate();

    const categories = [
        "Electrical", "Carpentry", "Plumbing", "Cleaning",
        "Appliance Repair", "Home Decor", "Personal Grooming",
        "Medical Treatments", "Grocery Dealings", "Security"
    ];

    const handleChange = (e) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        localStorage.removeItem("providerToken");
        navigate("/provider/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("providerToken");
            if (!token) {
                navigate("/provider/login");
                return;
            }

            await axios.post(
                "http://localhost:5000/api/providers/service/upload",
                {
                    ...serviceData,
                    priceQuote: Number(serviceData.priceQuote)
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            Swal.fire("Success", "Service Uploaded Successfully!", "success");
            // Reset form or redirect
            setServiceData({
                companyName: "",
                category: "Electrical",
                contactDetails: "",
                priceQuote: "",
            });
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Failed to upload service", "error");
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">Provider Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 font-medium"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-white dark:bg-card-dark rounded-xl shadow-lg p-8">
                    <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Upload className="text-primary w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Upload New Service</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Fill in the details to list your service.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Building size={16} /> Company / Business Name
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={serviceData.companyName}
                                onChange={handleChange}
                                placeholder="e.g. Acme Electricians"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <Briefcase size={16} /> Service Category
                                </label>
                                <select
                                    name="category"
                                    value={serviceData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Quote */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <DollarSign size={16} /> Price Quote (Starts From)
                                </label>
                                <input
                                    type="number"
                                    name="priceQuote"
                                    value={serviceData.priceQuote}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Phone size={16} /> Contact Details
                            </label>
                            <textarea
                                name="contactDetails"
                                value={serviceData.contactDetails}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Phone number, email, or preferred contact method..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg"
                        >
                            <CheckCircle size={24} /> Upload Service
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
