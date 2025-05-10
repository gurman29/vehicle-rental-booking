import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Updated to accept wheels parameter
export const getVehicleTypes = (wheels) => {
  return api.get('/vehicle-types', {
    params: { wheels } // This will add ?wheels=4 to the URL
  });
};

export const getVehiclesByType = (typeId) => api.get(`/vehicles/${typeId}`);
export const createBooking = (bookingData) => api.post('/bookings', bookingData);

// Add error handling interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default api;