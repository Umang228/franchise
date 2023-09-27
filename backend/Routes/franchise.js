const express = require('express');
const router = express.Router();
const { db } = require('../db');
const multer = require("multer"); // for image handling
const fs = require("fs"); // for image deleting and editing
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/student");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});
const upload = multer({ storage });



// Route to get selected product IDs
router.get('/products', (req, res) => {
  db.query('SELECT product_id FROM selected_product', (error, results) => {
    if (error) {
      console.error('Error fetching selected product IDs:', error);
      res.status(500).send('Internal Server Error');
    } else {
      const productIds = results.map((result) => result.product_id);
      res.status(200).json(productIds);
    }
  });
});

let productId;

// Route to get product details by ID
router.get('/products/:id', (req, res) => {
   productId = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error fetching product details:', error);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length === 0) {
        res.status(404).send('Product not found');
      } else {
        const product = results[0];  // Assuming there's only one product with the given ID
        res.status(200).json(product);
      }
    }
  }); 
});

   
// add student
router.post("/add-student",upload.single("avatar"), (req, res) => {
  const {
    name,
    mobileNumber,
    email,
    address,
    city,
    state,
    pinCode,
    serial_key,
  } = req.body;

  const avatar = req.file.path;

    const sql = `INSERT INTO student 
      (product_id, avatar, name, mobileNumber, email, address, city, state, pinCode, serial_key) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      productId,
      avatar,
      name,
      mobileNumber,
      email,
      address,
      city,
      state,
      pinCode,
      serial_key,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Error inserting data" });
      }

      return res.json({ message: "Student added successfully" });
    });
  
});




module.exports = router;
