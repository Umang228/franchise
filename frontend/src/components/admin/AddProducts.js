import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/addprod.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function AddProducts() {
  const [productInfo, setProductInfo] = useState({
    productName: "",
    facultyName: "",
    productID: "",
    productType: "Combo",
    course: "",
    group_name: "",
    subject: "",
    deliveryType: "Regular",
    isFranchise: false,
    isWhatsapp: false,
    priceUpdate: false,
    price: 0,
    discountPrice: 0,
    description: "",
    shortDescription: "",
    featured: false,
    slug: "",
    category_id: "",
    productImage: null,
    variants: [],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [activeTab, setActiveTab] = useState("basicdetails");
  const [htmlContent, setHtmlContent] = useState("");
  const [variantInput, setVariantInput] = useState({
    optionName: "",
    optionValues: [],
  });
  // Handle changes in the HTML editor
  const handleHtmlChange = (content) => {
    setHtmlContent(content);
  };
  const navigate = useNavigate();
// handle variants
const addVariant = () => {
  if (productInfo.variants.length < 4) {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      variants: [
        ...prevProductInfo.variants,
        { optionName: variantInput.optionName, optionValues: [] },
      ],
    }));
  }
};

const addOptionValue = (variantIndex, optionValue) => {
  if (productInfo.variants[variantIndex].optionValues.length < 4) {
    setProductInfo((prevProductInfo) => {
      const updatedVariants = [...prevProductInfo.variants];
      updatedVariants[variantIndex].optionValues.push(optionValue);
      return {
        ...prevProductInfo,
        variants: updatedVariants,
      };
    });
  }
};




  const handleChange = (event) => {
    const { name, type, value, checked, files } = event.target;

    if (type === "checkbox") {
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        [name]: checked,
      }));
    } else if (type === "file") {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        productImage: event.target.files[0],
      }));
    } else {
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      for (const key in productInfo) {
        // converting boolean values into 0 and 1
        const value =
          typeof productInfo[key] === "boolean"
            ? Number(productInfo[key])
            : productInfo[key];
        formData.append(key, value);
      }
      const response = await axios.post(
        "http://localhost:8081/admin/add-product",
        formData
      );
      if (response.status === 200) {
        setSuccessMessage("Product added successfully.");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };

  const handleFileUpload = (event) => {
    const selectedFiles = event.target.files;

    // Create an array to store image previews
    const previews = [];

    // Loop through the selected files
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      // Define a callback function for when the file is loaded
      reader.onload = (e) => {
        previews.push(e.target.result); // Add the image data URI to the previews array

        // If all files have been processed, update the state with the image previews
        if (previews.length === selectedFiles.length) {
          setImagePreview(previews);
          setProductInfo((prevProductInfo) => ({
            ...prevProductInfo,
            productImage: selectedFiles, // Store all selected files in state
          }));
        }
      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(file);
    }
  };

  const htmlEditorModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const htmlEditorFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];



  return (
    <div>
      <Sidebar />
      <div className="add-product-form">
        <h2>Add Product</h2>
        {/* <header className="prod-header">
          <nav>
            <ul>
              <li className="basicdetails">
                <a
                  href="#basicdetails"
                >
                  Basic Details
                </a>
              </li>
              <li className="images">
                <a href="#images">
                  Images
                </a>
              </li>
              <li className="description">
                <a href="#desc">
                  Description
                </a>
              </li>
              <li className="digitalresources">
                <a
                  href="#digires"
                >
                  Digital Resources
                </a>
              </li>
              <li className="variants">
                <a href="#variants">
                  Variants
                </a>
              </li>
            </ul>
          </nav>
        </header> */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Product URL:</label>
            <input
              type="text"
              name="productName"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
            {/* <span>Open</span>
            <span>Copy</span> */}
          </div>
          <div>
            <label>Product Title</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="htmlEditor">Product Description</label>
            <ReactQuill
              id="htmlEditor"
              value={htmlContent}
              onChange={handleHtmlChange}
              modules={htmlEditorModules}
              formats={htmlEditorFormats}
              className="editor"
            />
          </div>
          <div>
            <label>Detailed Title - SEO</label>
            <textarea name="productTitle" id="" cols="30" rows="10"></textarea>
          </div>
          <div>
            <label>MRP</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
            <label>Discount</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
            <div className="flabel">
              <label>Final Price : </label>
              <span> Rs. </span>
              <span className="fprice" style={{ color: "#5E2BFF" }}>
                {productInfo.productName}
              </span>
            </div>
          </div>
          <div>
            <label>Display MRP Text</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Display Discount Text</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Course</label>
            <select name="" id="" className="modeOfPayment"></select>
          </div>
          <div>
            <label>Inventory</label>
            <select name="" id="" className="modeOfPayment">
              <option value="Instock">In Stock</option>
            </select>
          </div>
          <div>
            <label>Rank</label>
            <input
              type="number"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Subjects</label>
            <select name="" id="" className="modeOfPayment"></select>
          </div>
          <div>
            <label>Categories</label>
            <select name="" id="" className="modeOfPayment"></select>
          </div>
          <div>
            <label>Sub Categories</label>
            <select name="" id="" className="modeOfPayment"></select>
          </div>
          <div>
            <label>Authors</label>
            <select name="" id="" className="modeOfPayment"></select>
          </div>
          <div>
            <label>Top Left Tag</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Top Right Tag</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Bottom Left Tag</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Bottom Right Tag</label>
            <input
              type="text"
              name="productTitle"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>

          <div className="product-imgs">
            {imagePreview.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Image Preview ${index}`}
                style={{ width: "100px", height: "auto", margin: "5px" }}
              />
            ))}
          </div>
          <div>
            <label>Product Highlights</label>
            <input
              type="text"
              name="producthighlights"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Product Details</label>
            <input
              type="text"
              name="producthighlights"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="button" onClick={addVariant} className="btn-10">
              + Add Variant
            </button>
            {productInfo.variants.map((variant, variantIndex) => (
              <div key={variantIndex}>
                <div>
                  <label>Option Name:</label>
                  <input
                    type="text"
                    value={variant.optionName}
                    onChange={(e) => {
                      const newOptionName = e.target.value;
                      setProductInfo((prevProductInfo) => {
                        const updatedVariants = [...prevProductInfo.variants];
                        updatedVariants[variantIndex].optionName =
                          newOptionName;
                        return {
                          ...prevProductInfo,
                          variants: updatedVariants,
                        };
                      });
                    }}
                  />
                </div>
                <div>
                  <label>Option Values:</label>
                  <>
                    {variant.optionValues.map(
                      (optionValue, optionValueIndex) => (
                        <div key={optionValueIndex}>
                          <input
                            type="text"
                            value={optionValue}
                            onChange={(e) => {
                              const newOptionValue = e.target.value;
                              setProductInfo((prevProductInfo) => {
                                const updatedVariants = [
                                  ...prevProductInfo.variants,
                                ];
                                updatedVariants[variantIndex].optionValues =
                                  updatedVariants[
                                    variantIndex
                                  ].optionValues.map((value, index) => {
                                    return index === optionValueIndex
                                      ? newOptionValue
                                      : value;
                                  });
                                return {
                                  ...prevProductInfo,
                                  variants: updatedVariants,
                                };
                              });
                            }}
                          />
                        </div>
                      )
                    )}
                  </>

                  {variant.optionValues.length < 4 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newOptionValue = "";
                        addOptionValue(variantIndex, newOptionValue);
                      }}
                      className="btn-10"
                    >
                      + Add Option Value
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* <div>
            <label>Faculty Name:</label>
            <input
              type="text"
              name="facultyName"
              value={productInfo.facultyName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Product ID (SKU):</label>
            <input
              type="text"
              name="productID"
              value={productInfo.productID}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Product Type:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="productType"
                  value="Combo"
                  checked={productInfo.productType === "Combo"}
                  onChange={handleChange}
                  className="rdio"
                />
                Combo
              </label>
              <label>
                <input
                  type="radio"
                  name="productType"
                  value="Single"
                  checked={productInfo.productType === "Single"}
                  onChange={handleChange}
                  className="rdio"
                />
                Single
              </label>
            </div>
          </div>
          <div>
            <label>Course:</label>
            <input
              type="text"
              name="course"
              value={productInfo.course}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Group:</label>
            <input
              type="text"
              name="group_name"
              value={productInfo.group_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={productInfo.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Delivery Type:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="deliveryType"
                  value="Regular"
                  checked={productInfo.deliveryType === "Regular"}
                  onChange={handleChange}
                  className="rdio"
                />
                Regular
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryType"
                  value="Fast Track"
                  checked={productInfo.deliveryType === "Fast Track"}
                  onChange={handleChange}
                  className="rdio"
                />
                Fast Track
              </label>
            </div>
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={productInfo.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Discount Price:</label>
            <input
              type="number"
              name="discountPrice"
              value={productInfo.discountPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={productInfo.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Short Description:</label>
            <textarea
              name="shortDescription"
              value={productInfo.shortDescription}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Slug:</label>
            <input
              type="text"
              name="slug"
              value={productInfo.slug}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Category ID:</label>
            <input
              type="text"
              name="category_id"
              value={productInfo.category_id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              name="productImage"
              onChange={handleChange}
              accept="image/*"
            />
              {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }}
            />
          )}
          </div>
          <div>
            <label>Additional Services:</label>
            <div>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="isFranchise"
                  checked={productInfo.isFranchise}
                  onChange={handleChange}
                  className="rdio"
                />
                Is Franchise
              </label>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="isWhatsapp"
                  checked={productInfo.isWhatsapp}
                  onChange={handleChange}
                />
                Broadcast To Whatsapp
              </label>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="priceUpdate"
                  checked={productInfo.priceUpdate}
                  onChange={handleChange}
                />
                Price Update
              </label>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={productInfo.featured}
                  onChange={handleChange}
                />
                Featured
              </label>
            </div>
          </div> */}

          <button type="submit" id="btnn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
