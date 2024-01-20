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
  { username: 'user2', password: 'password2' },
];

function authenticateUser(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = authenticateUser(username, password);

  if (user) {
    res.json({ message: 'Logged in', redirectUrl: './AdminSide.html' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/config', (req, res) => {
  res.json({ baseUrl: config.baseUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const loginUserCtr = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(
      ``, { username, password }
    );

    const {idToken} = response.data;

    const userRecord = await admin.auth().getUserByEmail(username); // Replace email with username
    res.json({
      status: "success",
      msg: "Login Success",
      idToken,
    });
  } catch(error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
};



