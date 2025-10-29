# 🧾 SpendMate

**SpendMate** is a full-stack personal finance management application built with the **MERN** stack. It helps users track income, manage expenses, and visualize spending patterns through an intuitive, responsive dashboard.

---

## 🚀 Overview

SpendMate simplifies personal budgeting by allowing users to record incomes, categorize expenses, and instantly monitor their financial health. It provides real-time balance updates, smart insights, and visual analytics for better money management.

---

## ✨ Core Features

### 💰 Finance Tracking

* Record multiple income sources (Salary, Freelance, Business, etc.)
* Categorize expenses (Food, Transport, Bills, Shopping, etc.)
* Real-time calculation of **total income**, **total expenses**, and **remaining balance**
* Smart alerts for high-spending days (₹1,000+)

### 📊 Analytics & Visualization

* Category-wise expense breakdown with percentage distribution
* Interactive **pie charts** and **calendar view** (gender-themed UI)
* Expense history with search and filter options

### 🔐 User Experience

* Secure **JWT authentication**
* Personalized profiles (profession & gender)
* Responsive design for all devices
* Instant UI updates after every CRUD operation

---

## 🧩 Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS v4, Recharts, Axios, React Router v6
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

---

## ⚙️ Application Workflow

### 1. Authentication

* User registers with **email, password, profession, and gender**
* Password hashed via **bcryptjs**
* On login, backend issues **JWT (30 days)**
* Token stored in **localStorage** → sent with each API request
* Protected routes validated using auth middleware

### 2. Data Flow

1. Frontend sends requests through **Axios**
2. JWT attached to headers via interceptor
3. Backend validates token & queries MongoDB
4. Response returned as structured JSON
5. Frontend updates React state → instant UI refresh

### 3. Income & Expense Management

* Income: POST `/api/income` → stored with user reference
* Expense: POST `/api/expenses` → categorized & aggregated
* Dashboard displays live **balance** = Total Income − Total Expenses
* Charts & Calendar dynamically update after transactions

### 4. Analytics Generation

* Backend aggregates expenses by **category & date**
* Computes totals, percentages, and transaction counts
* Highlights overspending days in calendar view
* Updates pie charts and statistics in real time

---

## 📡 API Endpoints

### 🔑 Auth Routes

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Register a new user          |
| POST   | `/api/auth/login`    | Login and get JWT token      |
| GET    | `/api/auth/profile`  | Get user profile (protected) |

### 💸 Expense Routes

| Method | Endpoint              | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | `/api/expenses`       | Get all expenses (protected)         |
| POST   | `/api/expenses`       | Create a new expense (protected)     |
| GET    | `/api/expenses/stats` | Get expense statistics (protected)   |
| GET    | `/api/expenses/:id`   | Get single expense by ID (protected) |
| PUT    | `/api/expenses/:id`   | Update an expense (protected)        |
| DELETE | `/api/expenses/:id`   | Delete an expense (protected)        |

---

## 🛠️ Installation

### Prerequisites

* Node.js ≥ 14
* MongoDB (Atlas or local)
* Git

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/spendmate.git
cd spendmate
```

#### Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run server:

```bash
npm run dev
```

Server → `http://localhost:5000`

#### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

App → `http://localhost:5173`

---

## ☁️ Deployment

### Backend → **Render**

* Root Directory: `backend`
* Build: `npm install`
* Start: `npm start`
* Env Vars: `MONGO_URI`, `JWT_SECRET`, `PORT`

### Frontend → **Vercel**

* Root Directory: `frontend`
* Build Command: `npm run build`
* Output: `dist`

**CORS:**
Allowed Origins →
`http://localhost:5173` and `https://spend-mate-two.vercel.app`

---

## 🧠 Future Enhancements

* 💵 Budget limits per category
* 🔁 Recurring transactions
* 📷 Receipt upload & storage
* 🌙 Dark mode support
* 📈 ML-based spending insights
* 📧 Email alerts for overspending
* 📊 Export reports (CSV/PDF)
* 🌍 Multi-currency tracking




