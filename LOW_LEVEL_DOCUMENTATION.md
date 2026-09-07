# Photo Studio Pro - Low Level Documentation (LLD)

This document provides a detailed, technical breakdown of the individual components, functions, schemas, and logic flow of the Photo Studio web application.

---

## 1. System Architecture Diagram (Conceptual)
The system follows a Client-Server and Backend-as-a-Service model:
- **Client/Frontend:** React SPA built with Vite and styled via TailwindCSS.
- **Database/Auth:** Supabase (Cloud Postgres).
- **Hosting/Delivery Server:** Node.js + Express proxying to static SPA dist files.

---

## 2. Database Schema (Supabase)

Data models accessed through the Supabase Client.

### Table: `services`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID / Int | Primary Key |
| `title` | Varchar | Name of the service |
| `description` | Text | Service details |
| `price` | Numeric | Base pricing |
| `category` | Varchar | Target group (Wedding, Portrait) |
| `image` | Varchar | URL to thumbnail |
| `created_at` | Timestamp | Creation date |

### Table: `bookings`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID / Int | Primary Key |
| `service_id` | Foreign Key| References `services(id)` |
| `event_type` | Varchar | E.g. Pre-Wedding, Corporate |
| `event_date` | Date | Target execution date |
| `name` | Varchar | Client's full name |
| `phone` | Varchar | Contact number |
| `email` | Varchar | Client's email |
| `location` | Text | Event venue |
| `status` | Varchar | Enum: 'pending', 'confirmed', 'cancelled' |
| `message` | Text | Extra requirements |
| `created_at` | Timestamp | Timestamp of form submission |

### Table: `portfolio`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID / Int | Primary Key |
| `title` | Varchar | Title of the image |
| `category` | Varchar | Filtering category |
| `image` | Varchar | Cloud URL/path of photo |
| `created_at` | Timestamp | Used for sorting recent work |

---

## 3. API Layer (`frontend/src/services/api.js`)

Frontend bypasses the Express server for data operations and talks directly to Supabase APIs.

### Configuration
Uses `@supabase/supabase-js` `createClient(supabaseUrl, supabaseKey)`. All data maps output rows into standard JS objects (replacing `id` with `_id` internally for logical mapping).

### Core Functions:
1. `getServices()`
   - Logic: `supabase.from('services').select('*').order('created_at')`
   - Returns: Array of mapped service objects.

2. `createBooking(bookingObject)`
   - Logic: Validates structure, cleans up missing null fields (`wedding_date` etc.), and pushes to `bookings` table. Defaults `status` to `'pending'`.
   
3. `getBookings()` (Used heavily by Admin Dashboard)
   - Logic: Joins tables `supabase.from('bookings').select('*, service:services(id, title)')`.
   - Returns: Flattened custom object with nested service data structured out.

4. `updateBookingStatus(id, newStatus)`
   - Logic: `supabase.from('bookings').update({ status }).eq('id', id)`

---

## 4. Frontend Component Breakdown (React)

### App Routing (`App.jsx`)
Uses `react-router-dom` (`<BrowserRouter>`, `<Routes>`).
- `/`: `Home.jsx`
- `/about`: `About.jsx`
- `/portfolio`: `Portfolio.jsx`
- `/services`: `Services.jsx`
- `/booking`: `Booking.jsx`
- `/contact`: `Contact.jsx`
- `/admin`: `Admin.jsx`

### Key Pages & State Logic

#### 1. `Admin.jsx` (Dashboard)
- **Role:** Protected view for business owner to manage bookings.
- **State Mgmt:**
  - `bookings` (Array): Global table data state.
  - `loading` (Boolean): Page layout skeleton trigger.
  - `whatsappPopup` (Object/Null): Modal trigger for WhatsApp messaging.
- **Internal Methods:**
  - `fetchBookings()`: Loads data on Mount (`useEffect()`).
  - `updateStatus(id, val)`: Pushes status change to API and triggers WhatsApp confirmation logic.
  - `getWhatsAppMessage()`: Generates dynamic Hinglish/English strings based on template literals injected with booking meta-data.

#### 2. `BookingForm.jsx` (User facing form)
- **Role:** Captures lead information.
- **State Mgmt:** Captures `FormData` controlled component logic for `name`, `phone`, `email`, `service` ID select options, etc.
- **Validation:** Frontend-level HTML5 standard validators combined with manual JS empty-checks before API post.

#### 3. `GalleryGrid.jsx` / `Portfolio.jsx`
- **Role:** Displays photos.
- **Filtering Mechanism:** Local side filtering. Maps over `categories` array (e.g. ['Wedding', 'Portrait']). Uses React State `activeCategory` to conditionally slice the master `portfolio` array into a viewable map.

---

## 5. Backend Server (`backend/server.js`)

### Roles
- Primary Web Server (Port 5000/Env Port).
- Static File Provider.

### Configuration
- `express.static`: Mounts the build folder (`../frontend/dist`) as public.
- Fallback Route `app.get('*')`: Any undefined API route defaults to sending `index.html`. This ensures Client-Side Routing (React Router) functions properly upon hard refreshes.
- *Mongoose Sandbox*: Fallback `mongoose.connect()` logic triggers. If no DB is attached, it intercepts errors and fails gracefully into a purely static-hosting mode avoiding app crashes.

### Development Environment Scripts
Executed from Root Directory via `package.json`:
- `npm run install:all`: Concurrently hooks into frontend and backend directories and initializes modules.
- `npm run build`: Triggers `vite build` pushing optimized source code into `dist`.
- `npm run dev`: Executes `nodemon server.js` watching the backend loop and serving freshly compiled frontend code.

---

## End of Documentation
