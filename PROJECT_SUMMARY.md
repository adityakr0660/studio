# Photo Studio Pro - Project Complete ✅

## Overview
A professional photo studio website built using **React (Frontend)**, **Supabase (Database as a Service)**, and **Node.js/Express (Backend)**. It features a modern, responsive design and an integrated backend server that automatically serves the compiled frontend.

## Project Structure

```
photo-studio-mern/
├── README.md                    # Project documentation
├── package.json                 # Root package.json to manage full project
├── backend/
│   ├── server.js               # Express server (Serves React + Fallback APIs)
│   ├── package.json            # Backend dependencies
│   ├── config/, models/, etc.  # Scaffolding for future custom logic
│   └── .env                    # Backend environment config
└── frontend/
    ├── index.html              # Entry HTML
    ├── package.json            # Frontend dependencies
    ├── vite.config.js          # Vite configuration
    ├── tailwind.config.js      # Tailwind CSS config
    └── src/
        ├── App.jsx             # Main app with routing
        ├── main.jsx            # React entry point
        ├── index.css           # Global styles
        ├── components/
        │   ├── Navbar.jsx      
        │   ├── Footer.jsx      
        │   ├── HeroSection.jsx 
        │   └── etc...
        ├── pages/
        │   ├── Home.jsx        
        │   ├── About.jsx       
        │   ├── Services.jsx    
        │   ├── Portfolio.jsx   
        │   ├── Booking.jsx     
        │   ├── Contact.jsx
        │   └── Admin.jsx       # Admin Dashboard
        └── services/
            └── api.js          # Supabase client & logic
```

## Features Implemented

### Frontend (React + Supabase)
✅ **Home Page**: Hero section, featured services, portfolio highlights.
✅ **Services Page**: Service categories with filtering.
✅ **Portfolio Page**: Image gallery with category-based navigation.
✅ **Booking Page**: Complete booking form with service selection.
✅ **Contact Page**: Contact info and location.
✅ **Admin Dashboard**: Custom `/admin` page to manage bookings and send automated WhatsApp notifications.

### Backend (Node.js + Express)
✅ **Integrated Serving**: Serves the compiled React frontend `dist` directory on a single port.
✅ **MERN Skeleton**: Fallback mocked routes for `/api/services`, `/api/bookings` mapped, acting as a foundation if you decide to implement custom backend scripts (e.g., payment gateways).
✅ **Routing**: Client-side routing perfectly integrated with Server-side catch-all redirect `*`.

## Technologies Used

| Frontend           | Backend           | Tools & DB     |
|--------------------|-------------------|----------------|
| React 18           | Node.js           | Vite           |
| React Router DOM   | Express.js        | Tailwind CSS   |
| Supabase (BaaS)    | Nodemon           | Git            |

## Setup & Running Instructions

The project has been modified to smoothly run from the root folder!

1. **Install dependencies (Frontend & Backend):**
   ```bash
   npm run install:all
   ```

2. **Build the Frontend & Start Server (All-in-one):**
   ```bash
   npm run build
   npm run dev
   ```

3. **Access the Website:**
   - **Main URL**: [http://localhost:5000](http://localhost:5000)
   - You only need to run this one link to access the entire application (including the `/admin` view).

## Future Steps & Scaling

1. **Supabase Rules**: Secure the Supabase Row Level Security (RLS) if you haven't.
2. **Payments**: Add payment processing logic into the `backend/server.js` using Stripe or Razorpay.
3. **Deploying**:
   - The backend folder can easily be deployed on **Render**, **Heroku**, or **DigitalOcean**.
   - Make sure your deploy script builds the frontend and runs `node server.js`.

The project is fully ready for development and deployment! 🚀