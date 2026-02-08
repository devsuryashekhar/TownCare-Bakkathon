import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Ticket, Wallet } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const bookingDetails = state?.bookingDetails || {};

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Checkout
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Review booking details and confirm the service.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Booking Summary
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
              <div className="flex justify-between">
                <span>Service</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {state?.serviceTitle || "TownCare Service"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Scheduled</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingDetails.date || "Choose date"}{" "}
                  {bookingDetails.time ? `at ${bookingDetails.time}` : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Address</span>
                <span className="font-medium text-gray-900 dark:text-white text-right max-w-[220px]">
                  {bookingDetails.address || "Add address"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Customer</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {bookingDetails.name || "Guest"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Discounts & Security
            </h2>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Ticket className="h-4 w-4 text-primary" />
              <span>Apply coupon at payment screen to save more.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>OTP verification via free SMS for every booking.</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6 h-fit space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment Preview
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
            <div className="flex justify-between">
              <span>Service total</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {state?.price || "₹499"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>OTP verification</span>
              <span className="font-medium text-emerald-500">Free</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
              <span className="font-semibold">Amount due</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {state?.price || "₹499"}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/payment", { state })}
            className="w-full mt-4 px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
