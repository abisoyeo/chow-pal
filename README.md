# ChowPal
 ChowPal is a chat-based food ordering and payment platform that allows users to browse meals, place orders, persistent order tracking and pay securely via **Paystack**.  Users can place orders via chat commands, view current or past orders, and checkout seamlessly.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Database Models](#database-models)
4. [App Flow](#app-flow)
5. [API Endpoints](#api-endpoints)
6. [Session & Cart Handling](#session--cart-handling)
7. [Payment Integration](#payment-integration)
8. [Usage](#usage)

## Project Overview

ChowPal is a chat-based system for placing orders via a menu-driven interface. Users interact with the app using chat commands to:

- Browse menu items
- Add items to a session-based cart
- View current or past orders
- Checkout via **Paystack**
- Retry payment if needed
- Cancel orders

Orders are tracked in the database with a persistent `sessionId` and `paymentReference` for Paystack transactions.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Sequelize ORM)
- **Session Storage:** Redis (for session management)
- **HTTP Requests:** Axios (for Paystack API integration)
- **Payment Gateway:** Paystack (initialize and verify payments)
- **Frontend:** React (chat interface consuming backend APIs)

## Database Models

### Menu

| Field     | Type     | Description            |
|-----------|----------|------------------------|
| id        | INT      | Primary Key            |
| name      | STRING   | Name of the menu item  |
| price     | FLOAT    | Price of the menu item |
| createdAt | DATETIME | Timestamp              |
| updatedAt | DATETIME | Timestamp              |

### Order

| Field            | Type     | Description                         |
|------------------|----------|-------------------------------------|
| id               | INT      | Primary Key                         |
| sessionId        | STRING   | Linked to user session              |
| status           | STRING   | `pending`, `completed`, `cancelled` |
| total            | FLOAT    | Total amount of the order           |
| paymentReference | UUID     | Unique reference for Paystack       |
| email            | STRING   | Email used for checkout             |
| paystackUrl      | STRING   | Paystack payment URL                |
| createdAt        | DATETIME | Timestamp                           |
| updatedAt        | DATETIME | Timestamp                           |

### OrderItem

| Field     | Type     | Description                  |
|-----------|----------|------------------------------|
| id        | INT      | Primary Key                  |
| orderId   | INT      | Foreign Key -> Order         |
| menuId    | INT      | Foreign Key -> Menu          |
| quantity  | INT      | Quantity ordered             |
| unitPrice | FLOAT    | Price per item at order time |
| createdAt | DATETIME | Timestamp                    |
| updatedAt | DATETIME | Timestamp                    |

## App Flow

1. **Session Initialization**

   On first interaction, the session initializes:
   - `state` → `"MAIN_MENU"`
   - `cart` → `[]`
   - `currentOrderId` → `null`

2. **Main Menu**

   Users can select options:
   - `1` → Place an order (show menu items)
   - `97` → View current order
   - `98` → View past orders
   - `99` → Checkout
   - `0` → Cancel order
   - `M` → Show menu anytime

3. **Placing Orders**

   - User selects menu item numbers.
   - Items are added to the session cart.
   - `OrderItem` in database is created or updated.
   - Order total is recalculated immediately and stored in both database and session.

4. **Checkout**

   - User provides a valid email.
   - A Paystack payment is initiated (via `paymentReference`).
   - Payment URL is stored in database (`paystackUrl`) for retries.
   - Redirects user to Paystack, then returns back via query params `?payment=success` or `?payment=failed`.

5. **Payment Retry**

   - Users can retry payment using the same email and `paymentReference`.
   - System reuses existing Paystack URL to prevent duplicate charges.

6. **Order History**

   - Orders can be retrieved from the database by session.
   - Shows `pending`, `completed`, or `cancelled` orders with items and totals.

## API Endpoints

| Method | Path                 | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/chat`              | Handles chat messages & commands     |
| GET   | `/paystack/callback` | Verifies payment status by reference |

## Session & Cart Handling

- Sessions are persisted using **Redis**.
- Cart items are stored in session (`req.session.cart`) along with total (`req.session.cartTotal`).
- Order ID (`req.session.currentOrderId`) tracks pending orders.
- Sessions are permanent until explicitly cleared by cancelling orders.

## Payment Integration

- **Initiate Payment:**
  Backend sends order total and email to Paystack. Returns authorization URL.
- **Verify Payment:**
  On callback, backend verifies transaction status:
  - `"success"` → marks order as completed
  - Other → keeps order pending, user can retry payment
- No webhooks are required; manual verification is used to handle failures.
- Retry uses the same `paymentReference` to avoid duplicate charges.

## Usage

1. Start backend server:

```bash
npm run dev
```

2. Start frontend React app:

```bash
npm start
```

3. Interact via chat interface:
   - Type `1` to see menu items
   - Type menu numbers to add to cart
   - Type `97` to view current order
   - Type `99` to checkout and provide email
   - Follow payment link, then return to chat to see status
