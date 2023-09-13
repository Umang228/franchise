
const express  = require("express");
const { db } = require('./db');
const cors  = require("cors");
const usersRoutes = require('./Routes/user');
const adminRoutes = require('./Routes/admin');
const franchiseRoutes = require('./Routes/franchise');



const app = express();
app.use(cors());
app.use(express.json());
app.use('/users/', usersRoutes)
app.use('/admin/', adminRoutes)
app.use('/franchise/', franchiseRoutes)




app.post('/register', (req, res) => {
  const { name, email, username, password, confirmpass } = req.body;

  // Check if the password and confirm password match
  if (password !== confirmpass) {
    return res.status(400).json({ error: 'Password and confirm password do not match' });
  }

  const sql = "INSERT INTO user (`name`, `email`, `username`, `password`) VALUES (?, ?, ?, ?)";
  const values = [
    name,
    email,
    username,
    password,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Error' });
    }
    
    return res.json({ message: 'User registered successfully' });
  });
});

  
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM user WHERE `email` = ? AND `password` = ?";
  
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: "Error" });
    }
    
    if (data.length > 0) {
      const user = data[0];
      return res.json({ message: "Success", user });
    } else {
      return res.json({ message: "Failed" });
    }
  });
});

  
  

app.listen(8081,()=>{
    console.log("listening");
})