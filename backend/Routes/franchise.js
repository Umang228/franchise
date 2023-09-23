const express = require('express');
const router = express.Router();
const { db } = require('../db');



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

// Route to get product details by ID
router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
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








module.exports = router;
