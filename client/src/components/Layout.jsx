import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NotificationBar from "./NotificationBar";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <NotificationBar />
            <Navbar />
            <main className="flex-grow bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
