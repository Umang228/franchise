const express = require("express");
const { db } = require('./db');
const cors = require("cors");
const usersRoutes = require('./Routes/user');
const adminRoutes = require('./Routes/admin');
const franchiseRoutes = require('./Routes/franchise');
const jwt = require('jsonwebtoken');
const verifyUser = require('./verifyUser.js');
const cookieParser = require('cookie-parser');

const jwtSecret = 'lecturevecture';

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/users/', usersRoutes);
app.use('/admin/', adminRoutes);
app.use('/franchise/', franchiseRoutes);

app.post('/register', (req, res) => {
  const sql = "INSERT INTO user (`name`, `email`, `username`, `password`) VALUES (?, ?, ?, ?)";
  
  const values = [
    req.body.name,
    req.body.email,
    req.body.username,
    req.body.password,  // Assuming the password is already hashed before sending
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error in inserting data:', err);
      return res.status(500).json({ Error: 'Error in inserting data' });
    }

    return res.json({ Status: 'User registered successfully' });
  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM user WHERE `email` = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ Error: 'Login Error' });
    }

    if (data.length > 0) {
      if (req.body.password === data[0].password) {
        const user = {
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          username: data[0].username,
          role: data[0].role  
        };

        const token = jwt.sign({ user }, jwtSecret, { expiresIn: '2h' });
        res.cookie('token', token);

      
        return res.status(200).json({ Status: 'Success', user,token });
      } else {
        return res.status(401).json({ Error: 'Password not matched' });
      }
    } else {
      return res.status(404).json({ Error: 'No email existed' });
    }
  });
});



app.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  return res.json({ Status: 'Success' });
});

app.get('/verifyToken', (req, res) => {
  const token = req.headers.authorization;  

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  verifyUser(token)
    .then(user => {
      return res.json({ user });
    })
    .catch(error => {
      return res.status(401).json({ message: 'Invalid token', error });
    });
});


app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
