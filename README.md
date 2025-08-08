

# Alumni Engagement Platform

A full-stack alumni engagement platform designed to foster professional networking among students and graduates. The platform features three core modules — Jobs, Events, and Mentorship — creating an interactive environment to support career growth and knowledge sharing.


## Features

- **Jobs Module:** Alumni and students can explore and post job opportunities.
- **Events Module:** Manage and participate in alumni events seamlessly.
- **Mentorship Module:** Connect mentors and mentees for professional guidance.
- **Knowledge Sharing:** Enables exchange of insights across 5+ career categories including technology, business, and higher studies.
- **User Authentication:** Secure user login and registration powered by JWT.
- **RESTful APIs:** Backend services built with Express.js and MongoDB for data management.
- **Responsive Frontend:** Built with React, React Router, and Tailwind CSS for a smooth user experience.
- **Notifications & Alerts:** Real-time feedback and notifications using React Toastify.
- **File Uploads & Validation:** Supports profile picture uploads with validation and security considerations.

---

## Tech Stack

### Frontend

- React 18
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify
- Swiper (for sliders/carousels)
- Vite (development and build tooling)

### Backend

- Node.js & Express.js
- MongoDB (Mongoose ORM)
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Cors, Cookie-Parser, Validator

---

## Installation & Setup

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory and add your environment variables, for example:

   ```
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the frontend development server:

   ```bash
   npm run dev
   ```

The frontend usually runs on `http://localhost:5173` (default Vite port).

---

## API Endpoints (Examples)

* `POST /api/users/register` - Register new users
* `POST /api/users/login` - Authenticate users and get JWT token
* `GET /api/jobs` - Fetch job listings
* `POST /api/events` - Create a new event
* `GET /api/mentorship` - List mentorship opportunities
* ...and more

---

## Folder Structure

### Backend

```
/backend
  ├─ models/        # Mongoose models (User, Job, Event, etc.)
  ├─ routes/        # Express routes
  ├─ controllers/   # Route handlers / business logic
  ├─ middleware/    # Auth, error handling middleware
  └─ app.js         # Main Express app entry point
```

### Frontend

```
/frontend
  ├─ src/
      ├─ components/      # React components
      ├─ pages/           # React pages/views
      ├─ services/        # API calls (axios instances)
      ├─ hooks/           # Custom React hooks
      ├─ assets/          # Images, icons, styles
      └─ App.jsx          # Main React app component
```

---

## Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you want to change.

---

## License

This project is licensed under the MIT License.

---

## Contact

If you have any questions or suggestions, feel free to reach out:
**Manohar** – [manujinka22@gmail.com]

---

