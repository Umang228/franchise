const express = require('express');
const router = express.Router();
const { db } = require('../db');


router.get('/products', async (req, res) => {
  try {
    // Fetch the selected_products column for a specific franchise (replace 'franchiseEmail' with the actual email)
    const franchiseEmail = 'example@example.com'; // Replace with the actual email
    const franchise = await db.query(
      'SELECT selected_products FROM franchises WHERE email = ?',
      [franchiseEmail]
    );

    if (franchise.length === 0) {
      return res.status(404).json({ message: 'Franchise not found' });
    }

    // Split the selected_products string into an array of IDs
    const selectedProductIds = franchise[0].selected_products.split(',').map(id => parseInt(id.trim(), 10));

    res.status(200).json(selectedProductIds);
  } catch (error) {
    console.error('Error fetching selected product IDs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/products/:productId', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch product details from the database based on product ID
    const productDetails = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (productDetails.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(productDetails[0]);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;
