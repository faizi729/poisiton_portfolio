# 📈 Lotwise Portfolio Tracker

A sophisticated portfolio tracking tool that manages **buy/sell trades using a FIFO-based lot system**, calculates **open positions**, and shows **realized profit & loss (PnL)** for each user.

---

## 🚀 Features

- **Buy & Sell trades** with FIFO-based matching
- **Open Positions** view (remaining quantities & average cost)
- **Realized P&L** view (profit/loss per trade and symbol summary)
- **Kafka integration** for trade event logging
- **User authentication** (login/register)
- **Full frontend** (Vite + React + Tailwind)
- **PostgreSQL + Sequelize ORM**

---

## 🧠 Core Concept: FIFO (First-In-First-Out) Matching

### How It Works

When a user **buys**, a new *lot* is created.  
When they **sell**, the system matches that sell against the *oldest open buy lots first* (FIFO order).

### Example

| Date   | Action | Qty | Price | Notes                                  |
|--------|--------|-----|-------|----------------------------------------|
| Jan 1  | BUY    | 10  | ₹100  | Creates Lot #1                         |
| Jan 5  | BUY    | 10  | ₹120  | Creates Lot #2                         |
| Jan 10 | SELL   | 15  | ₹150  | Matches 10 from Lot #1 + 5 from Lot #2 |

### Realized P&L Calculation

```
Profit = (Sell Price - Buy Price) × Quantity Matched
```

**For the example above:**
```
(150 - 100) × 10 + (150 - 120) × 5 = 500 + 150 = ₹650
```

**Remaining open quantity:** 5 (from Lot #2)

---

## 🏗️ System Architecture

### Backend Architecture
- **Node.js + Express** for REST APIs
- **Sequelize ORM** with PostgreSQL
- **Kafka Producer** emits messages for trade events
- **Winston Logger** for clean logging
- **Docker** for DB + service orchestration

### Frontend Architecture
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation

---

## 🗄️ Data Model

### Database Tables

| Table       | Description                                     | Key Fields                                                                     |
|-------------|-------------------------------------------------|--------------------------------------------------------------------------------|
| **users**   | Stores registered users                         | id, name, email, password                                                      |
| **trade**   | Stores each trade (buy/sell)                    | id, symbol, quantity, price, tradeType, tradeDate, userId                      |
| **lot**     | Represents each buy lot                         | id, symbol, originalQty, openQty, avgPrice, userId                             |
| **realize** | Stores realized profits/losses per matched sell | id, symbol, qty, proceeds, cost, profit, timestamp, sourceTradeId, sourceLotId |

### Relationships

- `User` → `Trade` → `Lot` → `Realize`
- `TradeTable.hasMany(realizeTable, { foreignKey: "sourceTradeId" })`
- `LotTable.hasMany(realizeTable, { foreignKey: "sourceLotId" })`
- Each `Realize` entry records how a sell consumed a part of a lot

---

## 🔌 API Endpoints

| Method | Endpoint                 | Description                         |
|--------|--------------------------|-------------------------------------|
| `POST` | `/api/trades`            | Record a buy/sell trade             |
| `GET`  | `/api/positions?userId=` | Get open positions (remaining lots) |
| `GET`  | `/api/realized?userId=`  | Get realized profit/loss            |
| `POST` | `/api/auth/register`     | Register new user                   |
| `POST` | `/api/auth/login`        | Login existing user                 |

---

## 📊 Kafka Integration

Kafka is used to publish a message every time a new trade is created.

### Message Structure
```json
{
  "symbol": "AAPL",
  "tradeType": "BUY",
  "quantity": 10,
  "price": 150,
  "timestamp": "2025-11-11T10:00:00Z"
}
```

**Used for:** Audit, analytics, or external stream processing

---

## 🖥️ Frontend Application

### Pages

| Page               | Path                  | Description                               |
|--------------------|-----------------------|-------------------------------------------|
| **Login/Register** | `/login`, `/register` | User authentication                       |
| **Trade Form**     | `/trade`              | Submit new BUY/SELL trade                 |
| **Positions**      | `/positions`          | Shows all open lots & average cost        |
| **PnL (Realized)** | `/pnl`                | Shows realized profits/losses and summary |

### Tech Stack
- React (TypeScript)
- Tailwind CSS
- Axios (API calls)
- React Router (Navigation)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Kafka (for event streaming)

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/faizi729/portfolio_tracker.git
   cd portfolio_tracker
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```env
   # PostgreSQL
   DB_URL=postgres://postgres:postgres@localhost:5432/portfolio
   
   # Kafka
   KAFKA_BROKER=localhost:9092
   
   # Server
   PORT=5000
   JWT_SECRET=your_secret
   ```

3. **Install Dependencies**
   ```bash
   npm run install:all
   ```
   This script installs both backend and frontend dependencies.

4. **Start Services**
   ```bash
   npm run start
   ```
   This launches:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:5173
   - docker:docker-compose.yml file in Backend

---

## 🧪 Example Usage

### User Workflow

1. **Register/Login** - User creates account and logs in
2. **Buy Shares** - Creates new lots in the system
3. **Sell Shares** - Automatically FIFO-matched with oldest open lots
4. **View Positions** - See remaining open lots and average costs
5. **Check P&L** - Review realized profits and losses

### API Response Example

**Realized P&L Response:**
```json
{
  "summary": [
    { "symbol": "Tesla", "totalQty": 4, "totalProfit": "-60" }
  ],
  "realizedTrades": [
    {
      "symbol": "Tesla",
      "qty": 3,
      "proceeds": "120",
      "cost": "150",
      "profit": "-30",
      "lot": { "avgPrice": 50 },
      "trade": { "tradeType": "SELL", "userId": "ccf0c03e..." }
    }
  ]
}
```

---

## 📁 Project Structure

```
portfolio_tracker/
│
├── backend/
│   ├── config/           # Database and environment configs
│   ├── controllers/      # Route controllers
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── kafka/            # Kafka producer configuration
│   ├── docker-compose.yml # Docker setup for dependencies
│   └── server.js         # Main server file
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Main application pages
│   │   └── main.tsx      # Application entry point
│   └── vite.config.ts    # Vite configuration
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer     | Technology               |
|-----------|--------------------------|
| Backend   | Node.js, Express         |
| ORM       | Sequelize                |
| Database  | PostgreSQL               |
| Messaging | Kafka                    |
| Frontend  | React + Vite + TypeScript|
| Styling   | Tailwind CSS             |
| Auth      | JWT                      |
| Logging   | Winston                  |

---

## 🧠 Key Assumptions

- Users must be logged in before trading
- All prices and quantities are numeric and positive
- Only **BUY** and **SELL** trades are supported
- FIFO matching occurs automatically at each `SELL`
- Each SELL can close multiple lots (partial or full)
- Profit/loss is computed in absolute terms (no tax/fees)
- `userId` is stored in `localStorage` after login

---

## 🔄 Development Scripts

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run start

# Start backend only
npm run server

# Start frontend only
npm run dev

```

---

## 📝 License

This project is licensed under the MIT License.

---
