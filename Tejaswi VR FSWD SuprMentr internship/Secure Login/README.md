# Secure Login

Build signup/login with hashed passwords and JWT.

## Setup
1. Open terminal in this folder
2. Run npm install
3. (Optional) Create .env and add JWT_SECRET
4. Run npm start

Server runs on: http://localhost:3017

## APIs

### Signup
POST /auth/signup
Body:
{
  "name": "Tejaswi",
  "email": "tejaswi@example.com",
  "password": "123456"
}

### Login
POST /auth/login
Body:
{
  "email": "tejaswi@example.com",
  "password": "123456"
}

Response includes JWT token.

### Get Logged-in User
GET /auth/me
Header:
Authorization: Bearer <token>
