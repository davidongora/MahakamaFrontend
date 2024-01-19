const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const config = require('./config');


const app = express();
const PORT = 3080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './views')));

//
const users = [
  { username: 'admin', password: 'admin' },
//   { username: 'user2', password: 'password2' },
  // Add more users as needed...
];
// Simple authentication middleware
function authenticateUser(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = authenticateUser(username, password);

  if (user) {
    // Redirect to admin.html upon successful login
    res.redirect('./AdminSide.html');
  } else {
    res.redirect('./Client.html')
    // res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/config', (req, res) => {
  res.json({ baseUrl: config.baseUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
