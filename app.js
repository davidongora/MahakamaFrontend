const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const config = require('./config');
const axios = require('axios'); // Add this line
const admin = require('firebase-admin'); // Add this line if you're using Firebase

const app = express();
const PORT = 3080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './views')));
app.use(express.static('css'));
app.use(express.static('img'));  

const users = [
  { username: 'admin', password: 'admin' },
  // { username: 'user2', password: 'password2' },
  // Add more users as needed...
];
// Simple authentication middleware
function authenticateUser(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

// Login endpoint
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = authenticateUser(username, password);

  if (user) {
    // Respond with a JSON object upon successful login
    res.status(200).json({ success: true, message: 'Login successful', redirectUrl: './AdminSide.html' });
  }
});

app.get('/config', (req, res) => {
  res.json({ baseUrl: config.baseUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});