# Role Guard

Assignment: Add admin/user roles and restrict certain routes.

## Setup
1. Open terminal in this folder
2. Run npm install
3. (Optional) Create .env and add JWT_SECRET
4. Run npm start

Server: http://localhost:3018

## APIs

### Signup
POST /auth/signup
Body:
{
  "name": "Tejaswi",
  "email": "tejaswi@example.com",
  "password": "123456",
  "role": "admin"
}

### Login
POST /auth/login
Body:
{
  "email": "tejaswi@example.com",
  "password": "123456"
}

### Profile
GET /auth/me
Authorization: Bearer <token>

### Admin Only
GET /admin/users
Authorization: Bearer <admin_token>

### User/Admin
GET /user/dashboard
Authorization: Bearer <token>
