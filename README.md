# 🏨 Stayyy – Hotel Booking Platform

**Stayyy** is a modern full-stack hotel booking platform that connects travelers with available rooms based on their preferences. It offers a secure, scalable, and user-friendly experience, with features like user authentication, filtered room listings, and dynamic booking management.

---

## 🚀 Features

### 👤 User Authentication
- Register and login with secure **JWT-based authentication**
- Passwords hashed using **bcrypt**
- Input validation and error handling
- Logout and session verification endpoints

### 🏨 Hotels & Rooms
- Create and manage hotel and room listings
- Filter by:
  - Price range
  - Capacity
  - Amenities
  - Keywords (e.g., location or hotel name)
- Pagination and sorting by creation date

### 📅 Bookings
- Book available rooms with date-based checks
- Prevent double bookings
- User-specific booking history and data retrieval

### 🛡️ Security & Middleware
- HTTP header protection via **Helmet**
- **CORS** enabled with custom origin
- **Rate limiting** to prevent abuse
- Centralized error handling and 404 fallback
- Request logging middleware

---

## 🧱 Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| **Frontend** | React.js *(planned/in development)* |
| **Backend**  | Node.js, Express.js               |
| **Auth**     | JWT, bcrypt                       |
| **Database** | MongoDB + Mongoose                |
| **Security** | Helmet, Rate Limiting, CORS       |
| **API**      | RESTful API Architecture          |


## Contributors
Yasser Aboussikine
