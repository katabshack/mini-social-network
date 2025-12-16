# 🌍 MiniSocial - Fullstack Social Network

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![Status](https://img.shields.io/badge/Status-Completed-success)
![Deployment](https://img.shields.io/badge/Deployed-Vercel%20%26%20Render-orange)

A modern, responsive social media application built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project features authentication, real-time-like interactions, image uploads via Cloudinary, and a fully responsive layout inspired by Twitter/X.

🔗 **Live Demo:** [https://mini-social-network-sage.vercel.app](https://mini-social-network-sage.vercel.app)

---

## 📸 Screenshots

| Desktop View | Mobile View |
|:---:|:---:|
| ![Desktop](https://via.placeholder.com/600x300?text=Upload+Your+Desktop+Screenshot+Here) | ![Mobile](https://via.placeholder.com/300x500?text=Upload+Mobile+Screenshot) |
*(Note: Replace these placeholders with actual screenshots of your app)*

---

## ✨ Key Features

### 🔐 Authentication & Security
*   Secure Login & Registration using **JWT (JSON Web Tokens)**.
*   Password hashing with **Bcrypt**.
*   Protected routes (Middleware) for authorized actions.

### 📝 Content Creation
*   **Create Posts:** Users can post text updates.
*   **Image Uploads:** Integrated with **Cloudinary** for optimized image storage and delivery.
*   **Rich UI:** Live preview of images before posting.

### ❤️ Social Interactions
*   **Likes:** Toggle likes instantly on posts.
*   **Comments:** Add comments to posts with user attribution.
*   **Feed:** Chronological feed sorted by latest posts.

### 🔎 Discovery
*   **Search Engine:** Search functionality to filter posts by keywords.
*   **Sticky Sidebar/Header:** Smooth navigation experience similar to native apps.

### 📱 Responsive Design (Mobile First)
*   **Desktop:** 3-column layout (Sidebar, Feed, Widgets).
*   **Mobile:** App-like experience with a bottom navigation bar, sticky header, and drawer menu.
*   **Tech:** Built with **Tailwind CSS** for a pixel-perfect UI on all devices.

---

## 🛠️ Tech Stack

### Frontend
*   **React (Vite):** Fast and modern UI library.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **Axios:** For API HTTP requests.
*   **Context API:** For global state management (Auth).
*   **Lucide React:** For beautiful, consistent icons.

### Backend
*   **Node.js & Express:** Robust RESTful API.
*   **MongoDB (Atlas) & Mongoose:** NoSQL Database & ODM.
*   **Multer & Cloudinary:** Handling file uploads.
*   **Cors & Dotenv:** Security and configuration.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/katabshack/mini-social-network.git
cd mini-social-network

2. Setup Backend
bash
cd backend
npm install
Create a .env file in the backend folder:

env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
Start the server:

bash
npm run dev
3. Setup Frontend
Open a new terminal:

bash
cd frontend
npm install
Create a .env file in the frontend folder:

env
VITE_API_URL=http://localhost:5000/api
Start the client:

bash
npm run dev
Your app should now be running at http://localhost:5173.

📂 Project Structure
bash
mini-social-network/
├── backend/
│   ├── config/         # Database & Cloudinary config
│   ├── models/         # MongoDB Schemas (User, Post, Comment)
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth protection
│   └── server.js       # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components (Sidebar, PostCard...)
    │   ├── context/    # Auth Context
    │   ├── pages/      # Full pages (Home, Login, Profile...)
    │   └── services/   # Axios configuration


🔮 Future Improvements
 User Profile Picture Upload
 "Follow" system between users
 Real-time notifications (Socket.io)
 Direct Messaging system
👨‍💻 Author
Katabshack

GitHub: github.com/katabshack
