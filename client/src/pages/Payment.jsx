import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CreditCard, Smartphone, Wallet, CheckCircle2 } from "lucide-react";

const Payment = () => {
  const { state } = useLocation();
  const [method, setMethod] = useState("card");

  const paymentOptions = [
    { id: "card", label: "Credit / Debit Card", icon: CreditCard },
    { id: "upi", label: "UPI / Wallet", icon: Smartphone },
    { id: "cash", label: "Cash after service", icon: Wallet },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Secure Payment
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Choose your payment method and confirm the booking.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            const isActive = method === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setMethod(option.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>
              OTP verification via free SMS is enabled for every booking.
            </span>
          </div>
          <div className="mt-2 flex justify-between text-gray-900 dark:text-white font-semibold">
            <span>Amount payable</span>
            <span>{state?.price || "₹499"}</span>
          </div>
        </div>

        <button className="mt-6 w-full px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition-colors">
          Pay & Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Payment;
