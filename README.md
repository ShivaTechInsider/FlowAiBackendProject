# Personal Expense Tracker API

## Description

This API allows users to manage personal financial records. Users can record income and expenses, retrieve past transactions, and get summaries by category or time period.

## Technologies

- Node.js
- Express.js
- SQLite (Database)
- JWT for Authentication

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Start the server by running `node app.js`.
4. Access the API at `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /api/register`: Register a new user.
- `POST /api/login`: Authenticate a user and get a JWT.

### Transactions

- `POST /api/transactions`: Add a new transaction (income or expense).
- `GET /api/transactions`: Retrieve all transactions for the logged-in user.
- `GET /api/transactions/:id`: Retrieve a transaction by ID.
- `PUT /api/transactions/:id`: Update a transaction by ID.
- `DELETE /api/transactions/:id`: Delete a transaction by ID.

### Categories

- `GET /api/categories`: Retrieve all categories.
- `POST /api/categories`: Add a new category.
- `DELETE /api/categories/:id`: Delete a category.

## JWT Authentication

- All `/transactions` and `/categories` endpoints require a JWT token. Use the token obtained during login in the `Authorization` header as: `Bearer <token>`.

## Postman Usage

Use Postman to test the API. Add the JWT token in the `Authorization` header for protected routes.

## Future Improvements

- Add pagination for large data sets.
- Add monthly summary reports.


## Images

## Added a Transaction
![alt text](<Screenshot 2024-10-22 191446.png>)


## User Login Success
![alt text](<Screenshot 2024-10-22 190548.png>)


## Get all trasnsaction details
![alt text](<Screenshot 2024-10-22 221822.png>)


## Update Transaction
![alt text](<Screenshot 2024-10-22 222008.png>)


## delete Transaction
![alt text](<Screenshot 2024-10-22 222431.png>)


## Category deleted
![alt text](<Screenshot 2024-10-22 222120.png>)


## Get all Categories
![alt text](<Screenshot 2024-10-22 222221.png>)


## Add a Category
![alt text](<Screenshot 2024-10-22 222336.png>)


