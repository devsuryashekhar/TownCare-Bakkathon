import React from "react";
import { Link } from "react-router-dom";
import { Bell, ArrowRight } from "lucide-react";

const NotificationBar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Bell className="h-4 w-4" />
          <span>
            New: Free OTP SMS support is live. Book services with instant
            confirmation.
          </span>
        </div>
        <Link
          to="/checkout"
          className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
        >
          Go to checkout
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default NotificationBar;
