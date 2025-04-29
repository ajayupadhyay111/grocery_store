# 🛒 GreenPick – Online Grocery Web App

GreenPick is a full-stack online grocery web app that allows users to browse, search, and securely purchase grocery items. It offers a smooth user experience, secure Stripe-based checkout, and admin-level management features. Built with modern technologies like React, Node.js, and MongoDB, GreenPick ensures a fast, scalable, and responsive shopping experience.

---

## ✨ Features

- 🧑‍💼 User Authentication (JWT + Cookies)
- 🛍️ Add to Cart & Checkout Flow
- 💳 Stripe Payment Integration
- 📦 Order History for Users
- 🧑‍💻 Admin Dashboard for Managing Products & Orders
- 📁 Cloudinary File Upload with Multer
- 🔍 Search and Filter Products
- 📱 Fully Responsive Design

---

## 🖼️ Screenshots

_Add screenshots here (home, cart, checkout, admin panel, etc.)_

---

## 🧰 Tech Stack

### 🔹 Frontend
- React
- Tailwind CSS
- Context API
- Axios
- React Router DOM

### 🔸 Backend
- Node.js
- Express
- MongoDB & Mongoose
- JWT + Cookies for Auth
- Stripe API (Payment Gateway)
- Multer + Cloudinary (Image Uploads)
- BcryptJS (Password Hashing)

---

## 🌐 Live Demo

👉 [GreenPick Web App](https://grocery-store-silk-iota.vercel.app/)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

---

## 🔧 Project Setup

```bash
# Clone the repository
git clone https://github.com/ajayupadhyay111/grocery_store.git

cd greenpick

# Frontend setup

cd client # Go to client directory
npm install # Install dependencies
npm run dev # Start the frontend server

# Backend setup

cd server # Go to server directory
npm install # Install dependencies
npm run dev # Start the backend server
```
## Environment Variables
Create a `.env` file inside the `/server` folder and add the following environment variables:

```javascript
PORT=5000
JWT_SECRET=skjfkwjsfkjl
NODE_ENV = development


FRONTEND_URL = "" // frontend url
MONGO_URI = "" // mongo url

# admin credentials
SELLER_EMAIL = ""
SELLER_PASSWORD = "" 

# cloudinary
CLOUDINARY_CLOUD_NAME = ""
CLOUDINARY_API_KEY = ""
CLOUDINARY_API_SECRET = ""

# stripe
STRIPE_PUBLISHABLE_KEY = ""
STRIPE_SECRET_KEY = ""
STRIPE_WEBHOOK_SECRET = ""
```

## 🧑‍💻 Contributing
Pull requests are welcome! If you have suggestions for improvement, open an issue or fork the repo and submit a PR.

## 📬 Contact
Built with 💚 by Ajay Upadhyay [LinkedIn](https://www.linkedin.com/in/ajay-upadhyay-178264221/)