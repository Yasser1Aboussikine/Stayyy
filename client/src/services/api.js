const API_BASE_URL = "/api";
const getAuthToken = () => {
  return localStorage.getItem("token");
};
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
export const roomsAPI = {
  getAllRooms: (params = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    return apiRequest(`/hotels?${queryParams.toString()}`);
  },
  getRoomById: (id) => apiRequest(`/hotels/${id}`),
  searchAvailableRooms: (params) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    return apiRequest(`/hotels/available?${queryParams.toString()}`);
  },
  getTopRatedRooms: (limit = 4) => {
    return apiRequest(`/hotels?limit=${limit}&sort=rating&order=desc`);
  },
};
export const bookingsAPI = {
  getAllBookings: (params = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    return apiRequest(`/bookings?${queryParams.toString()}`);
  },
  getUserBookings: (params = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    return apiRequest(`/bookings/my-bookings?${queryParams.toString()}`);
  },
  getBookingById: (id) => apiRequest(`/bookings/${id}`),
  createBooking: (bookingData) => {
    return apiRequest("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    });
  },
  updateBookingStatus: (id, status) => {
    return apiRequest(`/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
  cancelBooking: (id) => {
    return apiRequest(`/bookings/${id}/cancel`, {
      method: "PATCH",
    });
  },
  deleteBooking: (id) => {
    return apiRequest(`/bookings/${id}`, {
      method: "DELETE",
    });
  },
};
export const authAPI = {
  signIn: ({ identifier, password }) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });
  },
  signUp: (userData) => {
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  getCurrentUser: () => apiRequest("/auth/me"),
};

export default {
  rooms: roomsAPI,
  bookings: bookingsAPI,
  auth: authAPI,
};
