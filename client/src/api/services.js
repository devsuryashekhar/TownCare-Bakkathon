import { MOCK_SERVICES } from './mockData';

// Simulated delay helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchServices = async () => {
    await delay(500); // Simulate network latency
    return MOCK_SERVICES;
};

export const fetchServiceById = async (id) => {
    await delay(500);
    const service = MOCK_SERVICES.find(s => s._id === id);
    if (!service) {
        throw new Error('Service not found');
    }
    return service;
};
