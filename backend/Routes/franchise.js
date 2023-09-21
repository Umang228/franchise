const express = require('express');
const router = express.Router();
const { db } = require('../db');





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
