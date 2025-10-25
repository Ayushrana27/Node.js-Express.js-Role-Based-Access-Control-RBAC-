🔐 Role-Based Access Control (RBAC) using Node.js, Express.js & JWT
📌 Overview

This project demonstrates how to build a secure Node.js backend with JWT-based authentication and role-based authorization.
It supports three user roles:

👑 Admin

🧑‍💼 Moderator

🙋 User

Each role has access to specific routes only. Unauthorized or invalid requests are handled gracefully with clear error responses.

⚙️ Features

✅ User authentication with JWT tokens

🔒 Role-based route protection (Admin, Moderator, User)

🚫 Access denied messages for insufficient roles

🧾 Secure password hashing using bcrypt.js

🧩 Configurable environment variables via dotenv

🛠️ Tech Stack

Node.js

Express.js

JWT (jsonwebtoken)

bcryptjs

dotenv

📁 Project Structure
role-based-access/
│
├── server.js
├── routes/
│   └── protectedRoutes.js
├── middleware/
│   └── authMiddleware.js
└── .env

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/role-based-access.git
cd role-based-access

2️⃣ Install Dependencies
npm install

3️⃣ Create .env File
JWT_SECRET=supersecretkey123

4️⃣ Start the Server
node server.js


Server will run on http://localhost:5000

🧪 Testing the API
🧍 Login Endpoint

POST /login
Send a JSON body:

{
  "username": "admin",
  "password": "admin123"
}


If successful, you’ll receive a JWT token like:

{
  "message": "Login successful",
  "token": "<your_jwt_token>"
}

🔐 Protected Routes
Endpoint	Allowed Roles	Description
GET /api/admin	Admin	Admin dashboard access
GET /api/moderator	Admin, Moderator	Moderator management access
GET /api/user	Admin, Moderator, User	General user profile access

Add your token in the request header:

Authorization: Bearer <your_token>

⚠️ Error Responses
Scenario	Response
Missing Token	Access Denied: No token provided
Invalid Token	Invalid or expired token
Unauthorized Role	Access Denied: Requires one of these roles: ...
🧠 Example Users (In-Memory)
Username	Password	Role
admin	admin123	Admin
mod	mod123	Moderator
user	user123	User
🧩 Future Enhancements

Add database (MongoDB / MySQL)

Implement refresh tokens

Include registration and logout routes

Add UI frontend for login and role management

👨‍💻 Author

Ayush Rana
Built with ❤️ using Node.js, Express, and JWT.
