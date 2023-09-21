const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const { db } = require("../db");
// const storage = multer.diskStorage({
//   destination:(req,file,cb)=>{
//      cb(null,'images/products')
//   },
//   filename:(req,file,cb)=>{
//     cb (null,file.fieldname+"_"+Date.now() + path.extname(file.originalname))
//   }
// });
// const upload = multer({
//   storage: storage
// })

// Define your routes here

//add product
router.post("/add-product", (req, res) => {
  const {
    productName,
    facultyName,
    productID,
    productType,
    course,
    group_name,
    subject,
    deliveryType,
    isFranchise,
    isWhatsapp,
    priceUpdate,
    price,
    discountPrice,
    description,
    shortDescription,
    featured,
    slug,
    category_id,
  } = req.body;

  const sql = `INSERT INTO products 
               (productName, facultyName, productID, productType, course, group_name, 
                subject, deliveryType, isFranchise, isWhatsapp, priceUpdate, price, discountPrice, 
                description, shortDescription, featured, slug, category_id) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    productName,
    facultyName,
    productID,
    productType,
    course,
    group_name,
    subject,
    deliveryType,
    isFranchise,
    isWhatsapp,
    priceUpdate,
    price,
    discountPrice,
    description,
    shortDescription,
    featured,
    slug,
    category_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error inserting data" });
    }

    return res.json({ message: "Product added successfully" });
  });
});


// Fetch all products
router.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching products" });
    }

    return res.json(result);
  });
});

//delete product
router.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error deleting product" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  });
});

// Update product
router.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const {
    productName,
    facultyName,
    productID,
    productType,
    course,
    group_name,
    subject,
    deliveryType,
    isFranchise,
    isWhatsapp,
    priceUpdate,
    price,
    discountPrice,
    description,
    shortDescription,
    featured,
    slug,
    category_id,
  } = req.body;

  const sql =
    "UPDATE products SET productName=?, facultyName=?, productID=?, productType=?, course=?, group_name=?, subject=?, deliveryType=?, isFranchise=?, isWhatsapp=?, priceUpdate=?, price=?, discountPrice=?, description=?, shortDescription=?, featured=?, slug=?, category_id=? WHERE id=?";

  const values = [
    productName,
    facultyName,
    productID,
    productType,
    course,
    group_name,
    subject,
    deliveryType,
    isFranchise,
    isWhatsapp,
    priceUpdate,
    price,
    discountPrice,
    description,
    shortDescription,
    featured,
    slug,
    category_id,
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error updating product" });
    }

    return res.status(200).json({ message: "Product updated successfully" });
  });
});


// Fetch a single product
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching Product" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ products: result[0] });
  });
});

let franchiseId;
// Add franchise
router.post("/add-franchise", (req, res) => {
  const {
    name,
    email,
    phone_number,
    password,
    gst_number,
    franchise_type,
    mode_of_payment,
  } = req.body;

  // Insert the franchise data into the "franchises" table
  const franchiseSql =
    "INSERT INTO franchises (name, email, phone_number, password, gst_number, franchise_type, mode_of_payment) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const franchiseValues = [
    name,
    email,
    phone_number,
    password,
    gst_number,
    franchise_type,
    mode_of_payment,
  ];

  db.query(franchiseSql, franchiseValues, (err, franchiseResult) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error creating franchise" });
    }
     franchiseId = franchiseResult.insertId;
   

    // Insert the franchise's email and password into the "user" table
    const userSql =
      "INSERT INTO user (name,email, password, role) VALUES (?, ?, ?,?)";

    const userValues = [name, email, password, "franchise"];

    db.query(userSql, userValues, (userErr, userResult) => {
      if (userErr) {
        console.error("Database query error:", userErr);
        return res
          .status(500)
          .json({ message: "Error creating franchise user account" });
      }

      return res
        .status(200)
        .json({ message: "Franchise created successfully" , franchiseId});
    });
  });
});

// select products
router.post('/select', (req, res) => {
  const { selectedProducts } = req.body;

  if (!franchiseId) {
    return res.status(400).json({ message: "Franchise ID not found" });
  }

  // Prepare the SQL query dynamically with placeholders for each value
  const insertQuery = 'INSERT INTO selected_product (franchise_id, product_id) VALUES ' +
    selectedProducts.map(productId => `(?, ${productId})`).join(', ');

  // Flatten the array of values for the query (only franchiseId is needed)
  const flattenedValues = selectedProducts.map(() => franchiseId);

  db.query(insertQuery, flattenedValues, (insertErr) => {
    if (insertErr) {
      console.error('Database query error:', insertErr);
      return res.status(500).json({ message: 'Error saving selected products' });
    }

    return res.status(200).json({ message: 'Selected products saved successfully' });
  });
});



// Fetch all franchise
router.get("/franchise", (req, res) => {
  const sql = "SELECT * FROM franchises";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching franchise" });
    }

    return res.json(result);
  });
});

// Delete franchise
router.delete("/franchise/:id", (req, res) => {
  const franchiseId = req.params.id;

  // Get the franchise email first
  const getEmailQuery = "SELECT email FROM franchises WHERE id = ?";
  db.query(getEmailQuery, [franchiseId], (getEmailErr, getEmailResult) => {
    if (getEmailErr) {
      console.error("Database query error:", getEmailErr);
      return res.status(500).json({ message: "Error getting franchise email" });
    }

    if (getEmailResult.length === 0) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    const franchiseEmail = getEmailResult[0].email;

    // Delete franchise from franchises table
    const deleteFranchiseQuery = "DELETE FROM franchises WHERE id = ?";
    db.query(deleteFranchiseQuery, [franchiseId], (err, franchiseResult) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Error deleting franchise" });
      }

      // Delete related records from users and selected_product tables based on email
      const deleteUsersQuery = "DELETE FROM user WHERE email = ?";
      const deleteSelectedProductsQuery = "DELETE FROM selected_product WHERE franchise_id = ?";
      
      // Execute the delete queries
      db.query(deleteUsersQuery, [franchiseEmail], (userErr, userResult) => {
        if (userErr) {
          console.error("Database query error:", userErr);
          return res.status(500).json({ message: "Error deleting related user records" });
        }

        db.query(deleteSelectedProductsQuery, [franchiseId], (selectedProductErr, selectedProductResult) => {
          if (selectedProductErr) {
            console.error("Database query error:", selectedProductErr);
            return res.status(500).json({ message: "Error deleting related selected products" });
          }

          return res.status(200).json({ message: "Franchise and related records deleted successfully" });
        });
      });
    });
  });
});



// Update franchise
router.put("/franchise/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone_number,
    password,
    gst_number,
    franchise_type,
    mode_of_payment,
    selected_products,
  } = req.body;

  // Update the franchise data in the database based on the provided id
  const sql =
    "UPDATE franchises SET name = ?, email = ?, phone_number = ?, password = ?, gst_number = ?, franchise_type = ?, mode_of_payment = ?, selected_products = ? WHERE id = ?";

  const values = [
    name,
    email,
    phone_number,
    password,
    gst_number,
    franchise_type,
    mode_of_payment,
    selected_products,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error updating franchise" });
    }

    return res.status(200).json({ message: "Franchise updated successfully" });
  });
});

// Fetch a single franchise
router.get("/franchise/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM franchises WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching franchise" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    return res.status(200).json({ franchise: result[0] });
  });
});

module.exports = router;
