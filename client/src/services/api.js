const API_BASE_URL = "/api";

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "API request failed");
    }

    return data;
  } else {
    const text = await response.text();
    throw new Error(text || "API request failed");
  }
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return handleResponse(response);
};

// Rooms API
export const roomsAPI = {
  // Get all rooms with pagination and filters
  getAllRooms: (params = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    return apiRequest(`/hotels?${queryParams.toString()}`);
  },

  // Get room by ID
  getRoomById: (id) => apiRequest(`/hotels/${id}`),

  // Search available rooms
  searchAvailableRooms: (params) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    return apiRequest(`/hotels/available?${queryParams.toString()}`);
  },

  // Get top rated rooms (for home page)
  getTopRatedRooms: (limit = 4) => {
    return apiRequest(`/hotels?limit=${limit}&sort=rating&order=desc`);
  },
};

// Bookings API
export const bookingsAPI = {
  // Get all bookings (admin) or user's bookings
  getAllBookings: (params = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    return apiRequest(`/bookings?${queryParams.toString()}`);
  },

  // Get user's bookings
  getUserBookings: (params = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    return apiRequest(`/bookings/my-bookings?${queryParams.toString()}`);
  },

  // Get booking by ID
  getBookingById: (id) => apiRequest(`/bookings/${id}`),

  // Create new booking
  createBooking: (bookingData) => {
    return apiRequest("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  },

  // Update booking status (admin only)
  updateBookingStatus: (id, status) => {
    return apiRequest(`/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  // Cancel booking
  cancelBooking: (id) => {
    return apiRequest(`/bookings/${id}/cancel`, {
      method: "PATCH",
    });
  },

  // Delete booking (admin only)
  deleteBooking: (id) => {
    return apiRequest(`/bookings/${id}`, {
      method: "DELETE",
    });
  },
};

// Auth API
export const authAPI = {
  // Sign in
  signIn: ({ identifier, password }) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });
  },

  // Sign up
  signUp: (userData) => {
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Get current user
  getCurrentUser: () => apiRequest("/auth/me"),
};

export default {
  rooms: roomsAPI,
  bookings: bookingsAPI,
  auth: authAPI,
};
