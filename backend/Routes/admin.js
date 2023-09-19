const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { db } = require("../db");
const verifyUser = require('../verifyUser.js');
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
     cb(null,'images/products')
  },
  filename:(req,file,cb)=>{
    cb (null,file.fieldname+"_"+Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({
  storage: storage
})

// router.use(verifyUser);
// Define your routes here

//add product
router.post("/add-product",upload.single('image'), (req, res) => {
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
  
  const image = req.file.filename;

  const sql = `INSERT INTO products 
               (productName, facultyName, productID, productType, course, group_name, 
                subject, deliveryType, isFranchise, isWhatsapp,priceUpdate, price, discountPrice, 
                image, description, shortDescription, featured, slug, category_id) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)`;

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
    image,
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
  } = req.body;

  const sql =
    "UPDATE products SET productName=?, facultyName=?, productID=?, productType=?, course=?, group_name=?, subject=?, deliveryType=?, isFranchise=?, isWhatsapp=?, priceUpdate=? WHERE id=?";

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
    id,
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
    selected_products,
  } = req.body;

  // Extract the product IDs from the selected_products array
  const selectedProductIds = selected_products.map((product) => product.id);

  // Convert the array of product IDs to a comma-separated string
  const selectedProductsString = selectedProductIds.join(", ");

  // Insert the franchise data into the "franchises" table
  const franchiseSql =
    "INSERT INTO franchises (name, email, phone_number, password, gst_number, franchise_type, mode_of_payment, selected_products) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  const franchiseValues = [
    name,
    email,
    phone_number,
    password,
    gst_number,
    franchise_type,
    mode_of_payment,
    selectedProductsString,
  ];

  db.query(franchiseSql, franchiseValues, (err, franchiseResult) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error creating franchise" });
    }

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
        .json({ message: "Franchise created successfully" });
    });
  });
});

// Fetch all franchise
router.get("/franchise", (req, res) => {
  const sql = "SELECT * FROM franchises";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching products" });
    }

    return res.json(result);
  });
});

//delete franchise
router.delete("/franchise/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM franchises WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error deleting product" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
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
