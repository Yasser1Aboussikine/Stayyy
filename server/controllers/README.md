# Controllers Documentation

This directory contains all the controller functions for the Hotel Booking API. Controllers follow the MVC (Model-View-Controller) pattern and handle the business logic for each route.

## Controller Structure

Each controller follows a consistent pattern:

- **Error Handling**: Centralized error handling with `handleErrors` helper function
- **Validation**: Input validation and business logic validation
- **Response Format**: Consistent JSON response format
- **Status Codes**: Proper HTTP status codes for different scenarios

## Available Controllers

### 1. Auth Controller (`auth.controller.js`)

Handles user authentication and authorization.

#### Functions:

- `loginController`: User login with JWT token generation
- `registerController`: User registration with validation
- `logoutController`: User logout (clears JWT cookie)
- `verifyTokenController`: Verify JWT token from cookies
- `getCurrentUserController`: Get current authenticated user

#### Features:

- JWT token generation and validation
- HTTP-only cookie management
- Password hashing with bcrypt
- Role-based user creation
- Comprehensive error handling

#### Example Usage:

```javascript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
POST /api/auth/signup
{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "client"
}
```

### 2. Booking Controller (`booking.controller.js`)

Handles booking management and operations.

#### Functions:

- `getAllBookingsController`: Get all bookings with pagination
- `getBookingByIdController`: Get specific booking by ID
- `createBookingController`: Create new booking
- `updateBookingStatusController`: Update booking status (admin)
- `cancelBookingController`: Cancel booking
- `deleteBookingController`: Delete booking (admin)
- `getUserBookingsController`: Get user's own bookings

#### Features:

- Room availability checking
- Automatic price calculation
- Booking conflict detection
- Role-based access control
- Pagination support

#### Example Usage:

```javascript
POST /api/bookings
{
  "roomId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "checkInDate": "2024-01-15",
  "checkOutDate": "2024-01-18",
  "guests": 2,
  "specialRequests": "Early check-in if possible"
}
PATCH /api/bookings/:id/status
{
  "status": "confirmed"
}
```

### 3. Room Controller (`room.controller.js`)

Handles room management and operations.

#### Functions:

- `getAllRoomsController`: Get all rooms with filtering
- `getRoomByIdController`: Get specific room by ID
- `createRoomController`: Create new room (admin)
- `updateRoomController`: Update room details (admin)
- `deleteRoomController`: Delete room (admin)
- `searchAvailableRoomsController`: Search available rooms for dates
- `getRoomStatsController`: Get room statistics (admin)

#### Features:

- Advanced filtering (price, capacity, amenities)
- Search functionality
- Availability checking
- Statistics generation
- Image management

#### Example Usage:

```javascript
POST /api/hotels
{
  "name": "Deluxe Suite",
  "description": "Spacious suite with city view",
  "price": 299.99,
  "capacity": 4,
  "amenities": ["WiFi", "TV", "Mini Bar", "Balcony"],
  "images": ["image1.jpg", "image2.jpg"]
}
GET /api/hotels/available/search?checkInDate=2024-01-15&checkOutDate=2024-01-18&guests=2
```

### 4. Offer Controller (`offer.controller.js`)

Handles special offers and promotions.

#### Functions:

- `getAllOffersController`: Get all offers with filtering
- `getOfferByIdController`: Get specific offer by ID
- `createOfferController`: Create new offer (admin)
- `updateOfferController`: Update offer details (admin)
- `deleteOfferController`: Delete offer (admin)
- `toggleOfferStatusController`: Toggle offer active status (admin)
- `getActiveOffersController`: Get currently active offers
- `getOfferStatsController`: Get offer statistics (admin)

#### Features:

- Date-based offer filtering
- Discount percentage validation
- Active/inactive status management
- Statistics and analytics
- Room-specific offers

#### Example Usage:

```javascript
POST /api/offers
{
  "title": "Summer Special",
  "description": "20% off all rooms this summer",
  "discountPercentage": 20,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "roomIds": ["room1", "room2"],
  "isActive": true,
  "terms": "Valid for new bookings only"
}
GET /api/offers/active/all
```

## Error Handling

All controllers use a centralized error handling approach:

### Error Types Handled:

- **ValidationError**: Mongoose validation errors
- **CastError**: Invalid ObjectId format
- **Duplicate Key Error**: MongoDB duplicate key errors
- **Custom Business Logic Errors**: Application-specific errors

### Error Response Format:

```json
{
  "error": "Error message",
  "errors": {
    "fieldName": "Field-specific error message"
  }
}
```

## Helper Functions

### `handleErrors(error)`

Centralized error handling function that:

- Extracts validation errors from Mongoose
- Handles MongoDB-specific errors
- Returns formatted error object
- Used across all controllers

## Authentication & Authorization

Controllers implement role-based access control:

### Roles:

- **client**: Regular users who can book rooms
- **admin**: Administrators with full access

### Middleware Integration:

- `authenticateToken`: Verifies JWT tokens
- `requireAdmin`: Admin-only access
- `requireClientOrAdmin`: Client or admin access

## Response Format

All controllers follow a consistent response format:

### Success Response:

```json
{
  "data": "Response data",
  "message": "Success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Error Response:

```json
{
  "error": "Error message",
  "errors": {
    "field": "Field error message"
  }
}
```

## Best Practices

1. **Separation of Concerns**: Business logic separated from route handlers
2. **Error Handling**: Comprehensive error handling with proper status codes
3. **Validation**: Input validation at controller level
4. **Security**: Role-based access control and authentication
5. **Performance**: Efficient database queries with pagination
6. **Maintainability**: Clean, readable code with consistent patterns

## Testing

Controllers can be tested independently:

- Unit tests for individual functions
- Integration tests with database
- Authentication and authorization tests
- Error handling tests

## Dependencies

- **Models**: User, Booking, Room, Offer
- **Middleware**: Authentication, validation
- **Utilities**: Error handling, JWT management
- **External**: bcrypt, jsonwebtoken, mongoose

# Booking API Documentation

This document describes the booking-related API endpoints for the Hotel Booking system.

## Authentication

All booking endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Get All Bookings

**GET** `/api/bookings`

Get all bookings (admin can see all, clients see only their own).

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**

```json
{
  "bookings": [
    {
      "_id": "booking_id",
      "user": {
        "_id": "user_id",
        "userName": "John Doe",
        "email": "john@example.com"
      },
      "room": {
        "_id": "room_id",
        "roomType": "Deluxe",
        "pricePerNight": 200,
        "amenities": ["Free WiFi", "Room Service"],
        "images": ["image1.jpg", "image2.jpg"]
      },
      "checkInDate": "2024-02-15T00:00:00.000Z",
      "checkOutDate": "2024-02-18T00:00:00.000Z",
      "totalPrice": 600,
      "guests": 2,
      "status": "confirmed",
      "paymentMethod": "Stripe",
      "isPaid": true,
      "specialRequests": "Early check-in if possible",
      "createdAt": "2024-02-10T10:00:00.000Z",
      "updatedAt": "2024-02-10T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### 2. Get User's Bookings

**GET** `/api/bookings/my-bookings`

Get current user's bookings.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:** Same as Get All Bookings but only shows user's own bookings.

### 3. Get Booking by ID

**GET** `/api/bookings/:id`

Get a specific booking by ID.

**Response:**

```json
{
  "booking": {
    "_id": "booking_id",
    "user": {
      /* user object */
    },
    "room": {
      /* room object */
    },
    "checkInDate": "2024-02-15T00:00:00.000Z",
    "checkOutDate": "2024-02-18T00:00:00.000Z",
    "totalPrice": 600,
    "guests": 2,
    "status": "confirmed",
    "paymentMethod": "Stripe",
    "isPaid": true,
    "specialRequests": "Early check-in if possible",
    "createdAt": "2024-02-10T10:00:00.000Z",
    "updatedAt": "2024-02-10T10:00:00.000Z"
  }
}
```

### 4. Create Booking

**POST** `/api/bookings`

Create a new booking.

**Request Body:**

```json
{
  "roomId": "room_id",
  "checkInDate": "2024-03-15",
  "checkOutDate": "2024-03-18",
  "guests": 2,
  "paymentMethod": "Stripe",
  "specialRequests": "Early check-in if possible"
}
```

**Required Fields:**

- `roomId`: ID of the room to book
- `checkInDate`: Check-in date (YYYY-MM-DD format)
- `checkOutDate`: Check-out date (YYYY-MM-DD format)
- `guests`: Number of guests (minimum: 1)
- `paymentMethod`: Payment method ("Stripe", "PayPal", or "Cash")

**Validation Rules:**

- Check-in date cannot be in the past
- Check-out date must be after check-in date
- Room must be available for the selected dates
- Guests must be at least 1

**Response:**

```json
{
  "booking": {
    /* booking object */
  },
  "message": "Booking created successfully"
}
```

### 5. Update Booking Status

**PATCH** `/api/bookings/:id/status`

Update booking status (admin only).

**Request Body:**

```json
{
  "status": "confirmed"
}
```

**Valid Status Values:**

- `pending`: Booking is pending confirmation
- `confirmed`: Booking is confirmed
- `cancelled`: Booking is cancelled
- `completed`: Booking is completed

**Response:**

```json
{
  "booking": {
    /* updated booking object */
  },
  "message": "Booking status updated successfully"
}
```

### 6. Cancel Booking

**PATCH** `/api/bookings/:id/cancel`

Cancel a booking (users can cancel their own bookings, admins can cancel any).

**Response:**

```json
{
  "booking": {
    /* updated booking object */
  },
  "message": "Booking cancelled successfully"
}
```

**Rules:**

- Cannot cancel already cancelled bookings
- Cannot cancel completed bookings

### 7. Delete Booking

**DELETE** `/api/bookings/:id`

Delete a booking (admin only).

**Response:**

```json
{
  "message": "Booking deleted successfully"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation error message",
  "errors": {
    "field": "specific error message"
  }
}
```

### 401 Unauthorized

```json
{
  "error": "Access token required"
}
```

### 403 Forbidden

```json
{
  "error": "Access denied"
}
```

### 404 Not Found

```json
{
  "error": "Booking not found"
}
```

### 409 Conflict

```json
{
  "error": "Room is not available for the selected dates"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "errors": {
    "field": "specific error message"
  }
}
```

## Booking Status Flow

1. **pending**: Initial status when booking is created
2. **confirmed**: Admin confirms the booking
3. **cancelled**: Booking is cancelled (can be done by user or admin)
4. **completed**: Booking period has ended

## Payment Methods

- **Stripe**: Online payment via Stripe
- **PayPal**: Online payment via PayPal
- **Cash**: Payment at hotel

## Special Features

### Availability Check

The system automatically checks room availability when creating bookings:

- Prevents double bookings for the same room and dates
- Considers only "confirmed" and "pending" bookings as blocking
- Allows overlapping bookings for "cancelled" and "completed" statuses

### Price Calculation

Total price is automatically calculated based on:

- Room's price per night
- Number of nights (check-out date - check-in date)
- Formula: `totalPrice = pricePerNight × nights`

### Date Validation

- Check-in date cannot be in the past
- Check-out date must be after check-in date
- Dates are validated before creating the booking

## Testing

You can test the booking API using tools like Postman or curl. Make sure to:

1. First authenticate to get a JWT token
2. Use the token in the Authorization header
3. Test with valid room IDs from your database
4. Test various scenarios (valid dates, conflicting dates, etc.)
