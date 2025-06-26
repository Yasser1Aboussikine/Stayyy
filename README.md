🏨 Stayyy – Hotel Booking Platform
Stayyy is a modern, full-stack hotel booking platform designed to connect travelers with hotel rooms based on location, budget, amenities, and availability. It offers secure authentication, advanced filtering, and a seamless booking experience for users.

🚀 Features
👤 User Authentication
User registration and login using JWT and bcrypt

Token-based session management with route protection

Input validation and error handling

Logout and session verification support

🏨 Hotels & Rooms
Create, update, and fetch hotel and room listings

Filter rooms by:

Price range

Capacity

Amenities

Search keyword (name/location)

Pagination support for room listings

Sort by latest listings

📅 Bookings
Users can book available rooms

Prevents double-bookings

Fetch bookings for each user

Booking details: dates, hotel, room, user info

🛡️ Security & Performance
Secure headers via helmet

CORS support with configurable origin

Rate limiting to prevent abuse

Input sanitization and validation

Centralized error handling and 404 fallback

📦 API Structure
Modular routing (/auth, /hotels, /bookings)

Clean controller-based architecture

Express middleware for auth, validation, and logging

🧱 Tech Stack
Layer	Technology
Frontend	React.js (planned or in progress)
Backend	Node.js, Express.js
Auth	bcrypt, JWT
Database	MongoDB with Mongoose
Security	Helmet, Rate Limiting, CORS
API	RESTful endpoints