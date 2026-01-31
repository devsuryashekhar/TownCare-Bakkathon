import React, { useEffect, useState } from 'react';
import { fetchServices } from '../api/services';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Search, Filter, AlertCircle } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All", "Electrical", "Carpentry", "Plumbing", "Cleaning",
        "Appliance Repair", "Home Decor", "Personal Grooming",
        "Medical Treatments", "Grocery Dealings", "Security"
    ];

    useEffect(() => {
        loadServices();
    }, []); // Initial load

    const loadServices = async () => {
        setLoading(true);
        try {
            const data = await fetchServices(searchTerm, selectedCategory);
            setServices(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadServices();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Browse Local Services</h1>

            {/* Search and Filter Section */}
            <div className="mb-10 bg-white dark:bg-card-dark p-6 rounded-xl shadow-md">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by keyword (e.g., 'plumbing', 'cleaning')"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>

                    <div className="flex-none w-full md:w-64 relative">
                        <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="px-8 py-3 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Error State */}
            {error && (
                <div className="text-center py-10 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30 mb-8">
                    <p className="text-red-500 font-semibold">{error}</p>
                    <p className="text-sm text-red-400 mt-1">Is the backend server running?</p>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && services.length === 0 && (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Services Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search terms or category.</p>
                </div>
            )}

            {/* Services Grid */}
            {!loading && !error && services.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <motion.div
                            key={service._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-card-dark rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative flex-shrink-0">
                                <img
                                    src={service.image || "https://placehold.co/400x300"}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm text-gray-900 dark:text-white">
                                    ${service.priceQuote || service.price}
                                </span>
                                <span className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm text-white">
                                    {service.category}
                                </span>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{service.title}</h3>
                                    <div className="flex items-center text-accent">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="ml-1 text-sm font-medium">{service.rating}</span>
                                    </div>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>

                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                                {(service.companyName || service.providerId?.name || 'P')?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                                                    {service.companyName || service.providerId?.name || 'Provider'}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/book/${service._id}`}
                                            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Services;
