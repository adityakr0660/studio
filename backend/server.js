import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve local images from backend/public/images
app.use('/images', express.static(path.join(path.resolve(), 'public', 'images')));

const BASE = 'http://localhost:5000/images';

// Mock Data for API when DB is not populated or down
const mockServices = [
  { _id: '1', title: 'Wedding Photography', description: 'Complete wedding coverage with full day candid and portrait sessions.', price: 2500, category: 'Wedding', image: `${BASE}/wedding1.jpg` },
  { _id: '2', title: 'Online Wedding Invitation', description: 'Beautiful digital invitation cards for your special day.', price: 500, category: 'Wedding Invitation', image: `${BASE}/wedding2.jpg` },
  { _id: '3', title: 'Event Photography', description: 'Professional coverage for all types of events and celebrations.', price: 800, category: 'Event', image: `${BASE}/event1.jpg` },
  { _id: '4', title: 'Portrait Session', description: 'Stunning individual and family portrait photography.', price: 1200, category: 'Portrait', image: `${BASE}/portrait1.jpg` }
];

const mockPortfolio = [
  { _id: '1', title: 'Royal Indian Wedding', category: 'Wedding', image: `${BASE}/wedding1.jpg` },
  { _id: '2', title: 'Pre-Wedding Shoot', category: 'Wedding', image: `${BASE}/wedding2.jpg` },
  { _id: '3', title: 'Bride Portrait', category: 'Wedding', image: `${BASE}/wedding3.jpg` },
  { _id: '4', title: 'Haldi Ceremony', category: 'Wedding', image: `${BASE}/wedding4.jpg` },
  { _id: '5', title: 'Engagement Party', category: 'Wedding', image: `${BASE}/wedding5.jpg` },
  { _id: '6', title: 'Reception Night', category: 'Wedding', image: `${BASE}/wedding6.jpg` },
  { _id: '7', title: 'Corporate Summit', category: 'Event', image: `${BASE}/event1.jpg` },
  { _id: '8', title: 'Birthday Celebration', category: 'Event', image: `${BASE}/event2.jpg` },
  { _id: '9', title: 'Professional Portrait', category: 'Portrait', image: `${BASE}/portrait1.jpg` }
];

let mockBookings = [];

// Fallback API Routes
app.get('/api/services', (req, res) => res.json(mockServices));
app.get('/api/portfolio', (req, res) => res.json(mockPortfolio));
app.post('/api/bookings', (req, res) => {
  const newBooking = { _id: Date.now().toString(), ...req.body, status: 'pending', created_at: new Date() };
  mockBookings.push(newBooking);
  res.status(201).json(newBooking);
});
app.get('/api/bookings', (req, res) => res.json(mockBookings));
app.put('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = mockBookings.find(b => b._id === id);
  if (booking) booking.status = status;
  res.json({ message: 'Updated', booking });
});

// Serve frontend so user can easily see it
const __dirname = path.resolve();

// Only serve static assets in production or if user wants to see it easily
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
