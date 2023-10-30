const express = require("express");
const router = express.Router();
const { db } = require("../db");
const multer = require("multer"); // for image handling
const fs = require("fs"); // for image deleting and editing


// Add course
router.post('/add-course', (req, res) => {
  const {
    courseName,
    courseSubjects,
    courseCategories,
    courseSubCategories,
    courseAuthors,
  } = req.body;

  // Define your SQL query and values here.
  const sql = `
    INSERT INTO courses (courseName, courseSubjects, courseCategories, courseSubCategories, courseAuthors)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [courseName, courseSubjects, courseCategories, courseSubCategories, courseAuthors];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error adding course" });
    }

    return res.status(200).json({ message: "Course added successfully" });
  });
});


// Route to fetch all users from the "user" table
router.get('/users', (req, res) => {
  const sql = 'SELECT * FROM user';

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }

    return res.status(200).json(result);
  });
});

// Route to display all users
router.get('/display-users', (req, res) => {
  const sql = 'SELECT * FROM user';

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }

    // Here, you can render an HTML view or send the user data as JSON to the client-side for display.
    // Below is an example of sending JSON data to the client:

    return res.status(200).json(result);
  });
});

router.get('/courses', (req, res) => {
  const sql = 'SELECT * FROM courses';

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching courses" });
    }

    return res.status(200).json(result);
  });
});

router.put('/update-course/:id', (req, res) => {
  const courseId = req.params.id; // Course ID passed as a URL parameter
  const {
    courseName,
    courseSubjects,
    courseCategories,
    courseSubCategories,
    courseAuthors,
  } = req.body;

  // Define your SQL query to update the course
  const sql = `
    UPDATE courses
    SET courseName = ?,
        courseSubjects = ?,
        courseCategories = ?,
        courseSubCategories = ?,
        courseAuthors = ?
    WHERE id = ?
  `;

  const values = [courseName, courseSubjects, courseCategories, courseSubCategories, courseAuthors, courseId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error updating course" });
    }

    return res.status(200).json({ message: "Course updated successfully" });
  });
});
router.get('/courses/:id', (req, res) => {
  const courseId = req.params.id; // Course ID passed as a URL parameter

  // Define your SQL query to fetch the course by ID
  const sql = 'SELECT * FROM courses WHERE id = ?';

  db.query(sql, courseId, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error fetching course by ID' });
    }

    if (result.length === 0) {
      // If no course is found with the given ID, return a 404 Not Found response
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return the course data as JSON
    return res.status(200).json(result[0]);
  });
});
router.delete('/delete-course/:id', (req, res) => {
  const courseId = req.params.id; // Course ID passed as a URL parameter

  // Define your SQL query to delete the course by ID
  const sql = 'DELETE FROM courses WHERE id = ?';

  db.query(sql, courseId, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error deleting course' });
    }

    if (result.affectedRows === 0) {
      // If no course is deleted (no matching ID found), return a 404 Not Found response
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return a success message
    return res.status(200).json({ message: 'Course deleted successfully' });
  });
});


/* --------------------------------

 Products

 --------------------------------*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/products");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

//add product
router.post("/add-product", upload.single("productImage"), (req, res) => {
  const {
    productUrl,
    productName,
    facultyName,
    productID,
    productType,
    course,
    deliveryType,
    isFranchise,
    isWhatsapp,
    priceUpdate,
    price,
    finalPrice,
    discountPrice,
    description,
    shortDescription,
    featured,
    slug,
    mrpText,
    discountText,
    rank,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    highlights,
    productDetails,
  } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }
  const image = req.file.path;

  const sql = `INSERT INTO products 
               (productName, facultyName, productID, productType, course, productUrl,finalPrice,
                 deliveryType, isFranchise, isWhatsapp, priceUpdate, price, discountPrice, 
                description, shortDescription, featured, slug, image, mrpText, discountText, rank, topLeft, topRight, bottomLeft, bottomRight, highlights, productDetails) 
               VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    productUrl,
    finalPrice,
    productName,
    facultyName,
    productID,
    productType,
    course,
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
    image,
    mrpText,
    discountText,
    rank,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    highlights,
    productDetails,
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
  const sqlSelectImage = "SELECT image FROM products WHERE id = ?";

  db.query(sqlSelectImage, [id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching product image" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imagePath = result[0].image;

    // Delete the image file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
        return res
          .status(500)
          .json({ message: "Error deleting product image" });
      }

      // Now delete the product from the database
      const sqlDeleteProduct = "DELETE FROM products WHERE id = ?";

      db.query(sqlDeleteProduct, [id], (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ message: "Error deleting product" });
        }

        return res
          .status(200)
          .json({ message: "Product deleted successfully" });
      });
    });
  });
});

// edit product
router.put("/products/:id", upload.single("productImage"), (req, res) => {
  const id = req.params.id;
  const {
    productName,
    facultyName,
    productType,
    productID,
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

  let image;
  if (req.file) {
    image = req.file.path;
  }

  // Fetch the existing image path from the database
  const getImageQuery = "SELECT image FROM products WHERE id = ?";
  db.query(getImageQuery, [id], (getImageError, getImageResult) => {
    if (getImageError) {
      console.error("Database query error:", getImageError);
      return res.status(500).json({ message: "Error updating product" });
    }

    // If an image exists in the database, delete it from the filesystem
    if (getImageResult[0].image) {
      const imagePath = getImageResult[0].image;

      fs.unlink(imagePath, (unlinkError) => {
        if (unlinkError) {
          console.error("Error deleting image:", unlinkError);
          // Handle the error if needed, but continue with the product update
        } else {
          console.log("Image deleted successfully.");
        }
      });
    }

    const sql = `UPDATE products 
                 SET productName=?, facultyName=?, productType=?, productID=?, course=?, group_name=?, 
                     subject=?, deliveryType=?, isFranchise=?, isWhatsapp=?, priceUpdate=?, 
                     price=?, discountPrice=?, description=?, shortDescription=?, featured=?, 
                     slug=?, category_id=?, image=?
                 WHERE id=?`;

    const values = [
      productName,
      facultyName,
      productType,
      productID,
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
      image,
      id,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Error updating product" });
      }

      return res.json({ message: "Product updated successfully" });
    });
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

/* --------------------------------

 Franchise

 --------------------------------*/

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
        .json({ message: "Franchise created successfully", franchiseId });
    });
  });
});

// select products
router.post('/select', (req, res) => {
  const { selectedProducts,enteredPrices,enteredDiscountPrices } = req.body;

  if (!franchiseId) {
    return res.status(400).json({ message: "Franchise ID not found" });
  }

  // Prepare the SQL query dynamically with placeholders for each value
  const insertQuery = 'INSERT INTO selected_product (franchise_id, product_id, price, discount_price) VALUES ' +
  selectedProducts.map(productId => '(?, ?, ?, ?)').join(', ');

// Flatten the array of values for the query (franchiseId, productId, price, discountPrice)
const flattenedValues = [];
selectedProducts.forEach(productId => {
  flattenedValues.push(franchiseId, productId, enteredPrices[productId], enteredDiscountPrices[productId]);
});

  db.query(insertQuery, flattenedValues, (insertErr) => {
    if (insertErr) {
      console.error('Database query error:', insertErr);
      return res.status(500).json({ message: 'Error saving selected products' });
    }

    return res.status(200).json({ message: 'Selected products saved successfully' });
  });
});

// Fetch products for select
router.get("/product", (req, res) => {
  const sql = "SELECT * FROM products WHERE isFranchise = 1";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Error fetching products" });
    }

    return res.json(result);
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
      const deleteSelectedProductsQuery =
        "DELETE FROM selected_product WHERE franchise_id = ?";

      // Execute the delete queries
      db.query(deleteUsersQuery, [franchiseEmail], (userErr, userResult) => {
        if (userErr) {
          console.error("Database query error:", userErr);
          return res
            .status(500)
            .json({ message: "Error deleting related user records" });
        }

        db.query(
          deleteSelectedProductsQuery,
          [franchiseId],
          (selectedProductErr, selectedProductResult) => {
            if (selectedProductErr) {
              console.error("Database query error:", selectedProductErr);
              return res
                .status(500)
                .json({ message: "Error deleting related selected products" });
            }

            return res
              .status(200)
              .json({
                message: "Franchise and related records deleted successfully",
              });
          }
        );
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
  } = req.body;

  // Fetch the previous email associated with the franchise
  const getEmailQuery = "SELECT email FROM franchises WHERE id = ?";
  db.query(getEmailQuery, [id], (getEmailErr, getEmailResult) => {
    if (getEmailErr) {
      console.error("Database query error:", getEmailErr);
      return res.status(500).json({ message: "Error getting franchise email" });
    }

    if (getEmailResult.length === 0) {
      return res.status(404).json({ message: "Franchise not found" });
    }

    const prevEmail = getEmailResult[0].email;

    // Update the franchise data in the database based on the provided id
    const franchiseSql =
      "UPDATE franchises SET name = ?, email = ?, phone_number = ?, password = ?, gst_number = ?, franchise_type = ?, mode_of_payment = ? WHERE id = ?";

    const franchiseValues = [
      name,
      email,
      phone_number,
      password,
      gst_number,
      franchise_type,
      mode_of_payment,
      id,
    ];

    db.query(franchiseSql, franchiseValues, (err, franchiseResult) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Error updating franchise" });
      }

      // Update the corresponding user's email and password in the "user" table
      const userSql =
        "UPDATE user SET name =?, email = ?, password = ? WHERE email = ?";

      const userValues = [name, email, password, prevEmail];

      db.query(userSql, userValues, (userErr, userResult) => {
        if (userErr) {
          console.error("Database query error:", userErr);
          return res.status(500).json({ message: "Error updating user" });
        }

        return res
          .status(200)
          .json({ message: "Franchise and user updated successfully" });
      });
    });
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

// Fetch already associated products
router.get("/product/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM selected_product WHERE franchise_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ message: "Error fetching selected products" });
    }

    const selectedProducts = result.reduce((acc, row) => {
      const { product_id, price, discount_price } = row;
      acc[product_id] = { price, discountPrice: discount_price };
      return acc;
    }, {});
    return res.json(selectedProducts);
  });
});

router.post("/update_selected_products", async (req, res) => {
  const { id, selectedProductIds, updatedProducts } = req.body;

  if (!id || !Array.isArray(selectedProductIds) || !Array.isArray(updatedProducts)) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    // Delete existing selected products for this franchise
    await db.query("DELETE FROM selected_product WHERE franchise_id = ?", [id]);

    // Insert the updated selected products
    const insertQuery = 'INSERT INTO selected_product (franchise_id, product_id, price, discount_price) VALUES ' +
      selectedProductIds.map((productId, index) => '(?, ?, ?, ?)').join(', ');

    // Flatten the array of values for the query (franchiseId, productId, price, discountPrice)
    const flattenedValues = [];
    selectedProductIds.forEach((productId, index) => {
      flattenedValues.push(id, productId, updatedProducts[index].price, updatedProducts[index].discountPrice);
    });

    await db.query(insertQuery, flattenedValues);

    return res
      .status(200)
      .json({ message: "Selected products updated successfully" });
  } catch (error) {
    console.error("Error updating selected products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



/* --------------------------------

 Order

 --------------------------------*/


 router.get('/order-details', async (req, res) => {
  try {
    // Fetch student details
    db.query('SELECT * FROM student', async (error, studentsResults, fields) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const students = studentsResults.map(row => ({
          franchise_id: row.franchise_id,
          product_id: row.product_id,
          student_name: row.name,
        }));

        const promises = students.map(student => {
          const franchiseQuery = 'SELECT name, email FROM franchises WHERE id = ?';
          const productQuery = 'SELECT productName FROM products WHERE id = ?';

          const franchisePromise = new Promise((resolve, reject) => {
            db.query(franchiseQuery, [student.franchise_id], (error, franchiseResults) => {
              if (error) {
                reject(error);
              } else {
                resolve(franchiseResults[0]);
              }
            });
          });

          const productPromise = new Promise((resolve, reject) => {
            db.query(productQuery, [student.product_id], (error, productResults) => {
              if (error) {
                reject(error);
              } else {
                resolve(productResults[0]);
              }
            });
          });

          return Promise.all([franchisePromise, productPromise])
            .then(([franchise, product]) => ({
              franchise_name: franchise.name,
              franchise_email: franchise.email,
              product_name: product.productName,
              student_name: student.student_name,
            }));
        });

        Promise.all(promises)
          .then(data => {
            res.status(200).json(data);
          })
          .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
          });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});








module.exports = router;
