require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersStore = require('./users');
const authMiddleware = require('./middleware/auth');
const roleGuard = require('./middleware/roleGuard');

const app = express();
const PORT = 3018;

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Role Guard API is running. Use signup/login and protected routes.');
});

app.post('/auth/signup', async function (req, res) {
  const body = req.body;

  if (!body.name || !body.email || !body.password) {
    res.status(400).json({ message: 'name, email and password are required' });
    return;
  }

  const email = String(body.email).toLowerCase().trim();
  const existingUser = usersStore.getUserByEmail(email);

  if (existingUser) {
    res.status(400).json({ message: 'Email already registered' });
    return;
  }

  const role = body.role === 'admin' ? 'admin' : 'user';

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const users = usersStore.getAllUsers();

    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: email,
      role: role,
      password: hashedPassword
    };

    usersStore.addUser(newUser);

    res.status(201).json({
      message: 'Signup successful',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error while creating user' });
  }
});

app.post('/auth/login', async function (req, res) {
  const body = req.body;

  if (!body.email || !body.password) {
    res.status(400).json({ message: 'email and password are required' });
    return;
  }

  const email = String(body.email).toLowerCase().trim();
  const user = usersStore.getUserByEmail(email);

  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  try {
    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET || 'role_guard_secret',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token: token,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Error while logging in' });
  }
});

app.get('/auth/me', authMiddleware, function (req, res) {
  const user = usersStore.getUserById(req.user.id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

app.get('/admin/users', authMiddleware, roleGuard(['admin']), function (req, res) {
  const users = usersStore.getAllUsers();
  const safeUsers = [];

  for (let i = 0; i < users.length; i = i + 1) {
    safeUsers.push({
      id: users[i].id,
      name: users[i].name,
      email: users[i].email,
      role: users[i].role
    });
  }

  res.json({
    message: 'Admin route access granted',
    users: safeUsers
  });
});

app.get('/user/dashboard', authMiddleware, roleGuard(['user', 'admin']), function (req, res) {
  res.json({
    message: 'Welcome to user dashboard',
    user: req.user
  });
});

app.use(function (req, res) {
  res.status(404).json({ message: 'Route not found' });
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.log('Role Guard server running on http://localhost:' + PORT);
  });
}

module.exports = app;
