# Photo Studio Pro - Installation Guide

## Prerequisites
1. Node.js (v14 or higher) installed
2. MongoDB installed and running locally, OR MongoDB Atlas connection string
3. npm or yarn package manager

## Quick Start

### 1. Install Dependencies
Run this command from the project root:
```bash
npm run install:all
```

### 2. Configure MongoDB
If you're using MongoDB Atlas, update the `MONGO_URI` in `backend/.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/photo_studio
```

### 3. Start the Development Servers

**Option A: Using the root package.json (Recommended)**
```bash
npm run dev
```

**Option B: Start backend and frontend separately**
```bash
# Terminal 1 - Backend
cd backend
npm install
node server.js

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### 4. Seed the Database (Optional)
To populate the database with sample data:
```bash
npm run seed
```

Or visit: `http://localhost:5000/api/seed`

## Access the Website

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/services | Get all services |
| POST | /api/services | Create new service |
| GET | /api/services/:id | Get service by ID |
| PUT | /api/services/:id | Update service |
| DELETE | /api/services/:id | Delete service |
| POST | /api/bookings | Create new booking |
| GET | /api/bookings | Get all bookings |
| GET | /api/portfolio | Get portfolio items |
| POST | /api/portfolio | Create portfolio item |

## Project Structure

```
photo-studio-mern/
├── backend/          # Node.js + Express server
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── models/       # Mongoose models
│   └── routes/       # API routes
└── frontend/         # React application
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   └── services/    # API service layer
```

## Troubleshooting

**Port already in use?**
- Change the port in `backend/.env` (PORT=5001)
- Change the port in `frontend/vite.config.js` (server.port)

**MongoDB connection failed?**
- Ensure MongoDB is running: `mongod` (Linux/Mac) or start MongoDB service (Windows)
- Check your connection string in `backend/.env`

**Frontend not connecting to backend?**
- Check if proxy is configured correctly in `frontend/vite.config.js`
- Ensure both servers are running

## Features Implemented

✅ Home Page with hero section and featured services
✅ About Page with team and studio story
✅ Services Page with category filtering
✅ Portfolio Gallery with image grid
✅ Online Booking System
✅ Contact Page with form and location
✅ Responsive design with Tailwind CSS
✅ RESTful API with CRUD operations
✅ MongoDB integration with Mongoose

For additional support, please refer to the README.md file.