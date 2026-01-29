import React, { useEffect, useState } from 'react';
import { fetchServices } from '../api/services';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="text-center py-20 text-red-500">
            Error: {error}. Is the backend running?
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Browse Local Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <motion.div
                        key={service._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                            <img
                                src={service.image || "https://placehold.co/400x300"}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm text-gray-900 dark:text-white">
                                ${service.price}
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{service.title}</h3>
                                <div className="flex items-center text-accent">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                                </div>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>

                            <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                        {service.provider?.name?.charAt(0) || 'P'}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 truncate max-w-[100px]">
                                        {service.provider?.name || 'Unknown Provider'}
                                    </span>
                                </div>
                                <Link
                                    to={`/book/${service._id}`}
                                    className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
