import axios from 'axios';

const API_URL = 'http://localhost:5000/api/services';

export const fetchServices = async (search = "", category = "") => {
    try {
        const params = {};
        if (search) params.search = search;
        if (category && category !== "All") params.category = category;

        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch services");
    }
};

export const fetchServiceById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching service:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch service");
    }
};
