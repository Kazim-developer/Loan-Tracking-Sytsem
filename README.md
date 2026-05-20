# Loqvio — Lending Workflow Automation SaaS

> A full-stack SaaS platform that helps lending businesses automate loan management, track installments, manage clients, and handle subscription billing — replacing manual Excel-based workflows.

👨‍💻 **Built by:** [Muhammad Kazim Raza](https://github.com/Kazim-developer)

---

## 📸 Screenshots

![Dashboard](./screenshots/dashboard.webp)
![Loans](./screenshots/loans.webp)

---

## 🚀 Features

- **Dashboard** — Overview of total loans, outstanding balances, payment status, and key metrics at a glance
- **Loan Management** — Create and manage loans with automated calculations for loan amount, outstanding balance, and total payable amount
- **Installment Tracking** — Track installment schedules, due dates, and payment history per client
- **Client Management** — Manage client profiles and their associated accounts (loans and invoices)
- **Payment Handling** — Record payments and automatically update outstanding balances and payment status
- **Authentication** — Secure login with JWT and Google OAuth
- **Subscription Billing** — Paddle integration for subscription plan management and payment processing

---

## 🛠️ Tech Stack

### Frontend

| Technology     | Purpose                                  |
| -------------- | ---------------------------------------- |
| Next.js 14     | React framework with App Router          |
| TypeScript     | Type-safe development                    |
| Tailwind CSS   | Utility-first styling                    |
| Zustand        | Client-side state management             |
| TanStack Query | Server state, caching, and data fetching |

### Backend

| Technology         | Purpose                                     |
| ------------------ | ------------------------------------------- |
| Node.js + Express  | REST API server                             |
| Prisma ORM         | Type-safe database access                   |
| PostgreSQL         | Relational database                         |
| JWT + Google OAuth | Authentication and authorization            |
| Paddle             | Subscription billing and payment processing |
| WebSockets         | Real-time updates                           |

### Deployment

| Service | Purpose                      |
| ------- | ---------------------------- |
| Vercel  | Frontend deployment          |
| Railway | Backend and database hosting |
| GitHub  | Version control              |

---

## 🗂️ Project Structure

```
loqvio/
├── frontend/          # Next.js app
│   ├── app/           # App Router pages
│   ├── components/    # Reusable UI components
│   ├── store/         # Zustand state management
│   └── lib/           # Utilities and API helpers
│
├── backend/           # Node.js + Express API
│   ├── routes/        # API route handlers
│   ├── controllers/   # Business logic
│   ├── middleware/     # Auth and validation middleware
│   └── prisma/        # Schema and migrations
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Paddle account (for billing)
- Google OAuth credentials

### 1. Clone the repository

```bash
git clone https://github.com/Kazim-developer/Loan-Tracking-Sytsem.git
cd Loan-Tracking-Sytsem
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PADDLE_API_KEY=your_paddle_api_key
PADDLE_WEBHOOK_SECRET=your_paddle_webhook_secret
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `/frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:3000`

---

## 🔐 Authentication Flow

- Email/password login with JWT access and refresh tokens
- Google OAuth 2.0 for one-click sign-in
- Protected routes with role-based authorization middleware

---

## 💳 Subscription Billing

Paddle is used for subscription management. Webhooks handle:

- Subscription activation
- Payment success and failure
- Plan upgrades and cancellations

---

## 📡 Key API Endpoints

```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login with email/password
GET    /api/auth/google          # Google OAuth

GET    /api/loans                # Get all loans
POST   /api/loans                # Create a new loan
PUT    /api/loans/:id            # Update loan
DELETE /api/loans/:id            # Delete loan

GET    /api/installments/:loanId # Get installments for a loan
POST   /api/payments             # Record a payment

GET    /api/dashboard            # Get dashboard metrics
```

---

## 👨‍💻 Author

**Muhammad Kazim Raza**

- GitHub: [@Kazim-developer](https://github.com/Kazim-developer)
- Email: mkazimraza106@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
