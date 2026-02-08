import React from "react";
import { MapPin, Navigation } from "lucide-react";

const Map = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Service Coverage Map
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Track nearby providers and confirm coverage in your neighborhood.
          </p>
        </div>
        <iframe
          title="TownCare Coverage Map"
          className="w-full h-[420px] border-0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.52%2C12.90%2C77.70%2C13.05&layer=mapnik"
        />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Live booking zones
              </p>
              <p>Koramangala, Indiranagar, Whitefield.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Navigation className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Smart routing
              </p>
              <p>Optimized routes so providers arrive on time.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Booking ETA
              </p>
              <p>Average arrival time: 30-45 minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
