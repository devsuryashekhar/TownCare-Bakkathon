import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Phone, User } from "lucide-react";
import { fetchServiceById } from "../api/services";

const defaultLocation = "12.9716,77.5946";

const Booking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    const loadService = async () => {
      try {
        if (!serviceId) {
          setLoading(false);
          return;
        }
        const data = await fetchServiceById(serviceId);
        setService(data);
      } catch (error) {
        console.error("Failed to load service", error);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [serviceId]);

  const estimatedTotal = useMemo(() => {
    if (!service?.price && !service?.priceQuote) return "₹499";
    return `₹${service.priceQuote || service.price}`;
  }, [service]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        serviceId,
        serviceTitle: service?.title,
        price: estimatedTotal,
        bookingDetails,
      },
    });
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {service?.title || "Service Booking"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {service?.description ||
                "Tell us when and where you want the service. We'll connect you with the nearest provider."}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {service?.city || "Bengaluru"}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                60 - 90 mins
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                <input
                  name="name"
                  value={bookingDetails.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="relative">
                <Phone className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                <input
                  name="phone"
                  value={bookingDetails.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <textarea
                  name="address"
                  value={bookingDetails.address}
                  onChange={handleChange}
                  placeholder="Full service address"
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Calendar className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="date"
                  name="date"
                  value={bookingDetails.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="relative">
                <Clock className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="time"
                  name="time"
                  value={bookingDetails.time}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <textarea
              name="notes"
              value={bookingDetails.notes}
              onChange={handleChange}
              placeholder="Add service notes (optional)"
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="w-full lg:w-96 space-y-6">
          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Service Location Map
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Confirm your location so the provider can arrive quickly.
              </p>
            </div>
            <iframe
              title="TownCare Map"
              className="w-full h-64 border-0"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=77.57%2C12.95%2C77.62%2C12.99&layer=mapnik&marker=${defaultLocation}`}
            />
            <div className="p-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Default pin: Bengaluru
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Checkout Summary
            </h2>
            <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Service</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {service?.title || "TownCare Service"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated total</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {estimatedTotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>OTP verification</span>
                <span className="text-emerald-500 font-medium">Free SMS</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
