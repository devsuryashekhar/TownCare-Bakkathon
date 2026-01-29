import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-primary to-secondary opacity-10 dark:opacity-20 z-0"></div>
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
                    >
                        Find Trusted <span className="text-primary">Local Services</span> in Your Town
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
                    >
                        From home cleaning to plumbing, connect with verified professionals instantly. reliable, fast, and secure.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-xl flex flex-col md:flex-row items-center max-w-2xl mx-auto border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center px-4 py-3 w-full border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                            <MapPin className="text-primary w-5 h-5 mr-3" />
                            <input
                                type="text"
                                placeholder="Zip Code or Location"
                                className="bg-transparent outline-none w-full text-gray-700 dark:text-gray-200 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex items-center px-4 py-3 w-full">
                            <Search className="text-secondary w-5 h-5 mr-3" />
                            <input
                                type="text"
                                placeholder="What service do you need?"
                                className="bg-transparent outline-none w-full text-gray-700 dark:text-gray-200 placeholder-gray-400"
                            />
                        </div>
                        <button className="w-full md:w-auto mt-2 md:mt-0 bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 flex items-center justify-center">
                            Search
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Featured Services/Categories */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Popular Services</h2>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Discover what your neighbors are booking.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {['Home Cleaning', 'Plumbing', 'Electrical', 'Gardening'].map((service, index) => (
                        <Link key={index} to="/services" className="group">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                                    {/* Placeholder for Service Image */}
                                    <div className="text-gray-400 dark:text-gray-500 text-6xl">🛠️</div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{service}</h3>
                                    <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">Professional providers nearby.</p>
                                    <div className="mt-4 flex items-center text-secondary font-medium text-sm">
                                        Book Now <ArrowRight className="ml-1 w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <Link to="/services" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 md:text-lg">
                        View All Services
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Landing;
