# Hotel Booking Frontend

A modern React-based frontend for the Hotel Booking application with real-time API integration.

## Features

- **Real-time API Integration**: All data is fetched from the backend API
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: JWT-based authentication with cookie handling
- **Room Management**: Browse, search, and filter rooms
- **Booking System**: View and manage bookings
- **Offers**: Display active offers and promotions
- **Error Handling**: Comprehensive error states and loading indicators

## API Integration

The frontend is now fully connected to the backend API with the following features:

### API Service (`src/services/api.js`)

- Centralized API service with all endpoints
- Automatic error handling and response processing
- JWT token management with cookies
- Support for all CRUD operations

### Custom Hooks (`src/hooks/useApi.js`)

- `useApi`: For manual API calls with loading/error states
- `useApiEffect`: For automatic API calls on component mount
- `usePaginatedApi`: For paginated data with navigation
- `useSearchApi`: For search functionality with debouncing
- `useFormSubmit`: For form submissions with validation

### Updated Components

#### AllRooms (`src/pages/AllRooms.jsx`)

- Real-time room data from API
- Search functionality
- Advanced filtering (price, amenities, room type)
- Sorting options
- Pagination support
- Loading and error states

#### RoomDetails (`src/pages/RoomDetails.jsx`)

- Dynamic room information
- Image gallery
- Real-time pricing
- Booking form (ready for integration)
- Responsive design

#### MyBookings (`src/pages/MyBookings.jsx`)

- User's booking history
- Status filtering (all, pending, confirmed, completed, cancelled)
- Booking management actions
- Payment status tracking

#### ExclusiveOffers (`src/components/ExclusiveOffers.jsx`)

- Active offers from API
- Dynamic content
- Expiration date handling
- Navigation to offer details

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the client directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Environment
VITE_NODE_ENV=development
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

### 4. Backend Connection

Ensure the backend server is running on `http://localhost:5000` before testing the frontend.

## API Endpoints Used

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Token verification
- `GET /api/auth/me` - Get current user

### Rooms

- `GET /api/hotels` - Get all rooms with filters
- `GET /api/hotels/:id` - Get room by ID
- `GET /api/hotels/available/search` - Search available rooms

### Bookings

- `GET /api/bookings/my-bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking
- `PATCH /api/bookings/:id/status` - Update booking status

### Offers

- `GET /api/offers/active/all` - Get active offers
- `GET /api/offers` - Get all offers with filters
- `GET /api/offers/:id` - Get offer by ID

## Key Features

### Search and Filtering

- Real-time search with debouncing
- Price range filtering
- Amenities filtering
- Room type filtering
- Sort by price, date, etc.

### Pagination

- Server-side pagination
- Page navigation
- Results per page control

### Error Handling

- Network error handling
- API error responses
- User-friendly error messages
- Retry mechanisms

### Loading States

- Skeleton loading for better UX
- Spinner indicators
- Progressive loading

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interactions

## File Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── context/            # React context providers
├── assets/             # Static assets
├── layouts/            # Layout components
└── ErrorHandling/      # Error boundary components
```

## Next Steps

1. **Authentication Integration**: Connect login/signup forms to API
2. **Booking Flow**: Implement complete booking process
3. **Payment Integration**: Add payment processing
4. **Admin Panel**: Create admin interface for room/offer management
5. **Real-time Updates**: Add WebSocket support for live updates
6. **Image Upload**: Implement image upload for rooms
7. **Reviews System**: Add user reviews and ratings
8. **Email Notifications**: Send booking confirmations

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for frontend URL
2. **API Connection**: Check if backend server is running
3. **Environment Variables**: Verify `.env` file is in correct location
4. **Port Conflicts**: Change port if 5173 is already in use

### Development Tips

- Use browser dev tools to monitor API requests
- Check network tab for failed requests
- Verify JWT tokens in application storage
- Test on different screen sizes for responsiveness
