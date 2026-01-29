import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <Link to="/" className="text-xl font-bold text-primary">TownCare</Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Connecting community with care.</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm">Privacy Policy</Link>
                        <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm">Terms of Service</Link>
                        <Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm">Contact</Link>
                    </div>
                </div>
                <div className="mt-8 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} TownCare. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
