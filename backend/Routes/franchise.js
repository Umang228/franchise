const express = require('express');
const router = express.Router();
const { db } = require('../db');


// Define your routes here

router.get('/franchise/products', async (req, res) => {
    const { franchiseId } = req.query;
  
    try {
      // Fetch the selected_products column for the specified franchise
      const franchiseProducts = await db.query(
        'SELECT selected_products FROM franchises WHERE id = ?',
        [franchiseId]
      );
  
      if (franchiseProducts.length === 0) {
        return res.status(404).json({ message: 'Franchise not found' });
      }
  
      const selectedProductIds = franchiseProducts[0].selected_products.split(',');
  
      // Fetch product details for the selected products
      const products = await db.query(
        'SELECT * FROM products WHERE id IN (?)',
        [selectedProductIds]
      );
  
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching franchise products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
