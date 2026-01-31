import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Briefcase, Mail, Lock, User, Phone, MapPin, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";

const ProviderAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin
                ? "http://localhost:5000/api/providers/auth/login"
                : "http://localhost:5000/api/providers/auth/signup";

            const res = await axios.post(endpoint, formData);

            localStorage.setItem("providerToken", res.data.token);
            Swal.fire("Success", `Provider ${isLogin ? "Login" : "Registration"} Successful!`, "success");
            navigate("/provider/dashboard");
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-4 transition-colors duration-300 flex items-center justify-center">
            <div className="max-w-md w-full bg-white dark:bg-card-dark rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-primary p-6 text-center">
                    <Briefcase className="w-12 h-12 text-white mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-white">Provider Portal</h2>
                    <p className="text-white/80">
                        {isLogin ? "Welcome back, Partner!" : "Join TownCare as a Service Provider"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {!isLogin && (
                        <>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Company / Individual Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address / Headquarters"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {isLogin ? "Login" : "Register"} <ArrowRight size={20} />
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary hover:underline text-sm"
                        >
                            {isLogin ? "New Provider? Register Here" : "Already have an account? Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProviderAuth;
