# Photo Studio Pro - MERN Stack Website

A professional photo studio website built with MongoDB, Express.js, React.js, and Node.js.

## Features

- **Home Page**: Hero section, featured services, portfolio preview
- **About Page**: Studio story, team members, achievements
- **Services Page**: Photography, videography, and design services with filtering
- **Portfolio Page**: Gallery with categorized images
- **Booking System**: Online booking form with date selection
- **Contact Page**: Contact form, location, business hours

## Project Structure

```
photo-studio-mern/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── bookingController.js
│   │   ├── portfolioController.js
│   │   └── serviceController.js
│   ├── models/
│   │   ├── bookingModel.js
│   │   ├── portfolioModel.js
│   │   └── serviceModel.js
│   ├── routes/
│   │   ├── bookingRoutes.js
│   │   ├── portfolioRoutes.js
│   │   └── serviceRoutes.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BookingForm.jsx
    │   │   ├── Footer.jsx
    │   │   ├── GalleryGrid.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ServiceCard.jsx
    │   ├── pages/
    │   │   ├── About.jsx
    │   │   ├── Booking.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Home.jsx
    │   │   ├── Portfolio.jsx
    │   │   └── Services.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGO_URI=mongodb://localhost:27017/photo_studio
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run server
   ```
   or
   ```bash
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `POST /api/portfolio` - Create new portfolio item
- `GET /api/portfolio/:id` - Get portfolio item by ID
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item

## Technologies Used

- **Frontend**: React.js, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **API Testing**: Postman or similar tools

## License

MIT License