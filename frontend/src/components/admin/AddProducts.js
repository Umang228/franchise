import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/addprod.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function AddProducts() {
  const [productInfo, setProductInfo] = useState({
    productUrl: "",
    productName: "",
    facultyName: "",
    productID: "",
    productType: "Combo",
    course: "",
    deliveryType: "Regular",
    isFranchise: false,
    isWhatsapp: false,
    priceUpdate: false,
    price: 0,
    finalPrice: 0,
    discountPrice: 0,
    description: "",
    shortDescription: "",
    featured: false,
    slug: "",
    productImage: null,
    variants: [],
    mrpText: "",
    discountText: "",
    rank: 0,
    topLeft: "",
    topRight: "",
    bottomLeft: "",
    bottomRight: "",
    highlights: "",
    productDetails: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const toggleDescriptionExpand = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };
  const [uploadedImages, setUploadedImages] = useState([]);
  const inputRef = React.createRef();
  const [activeTab, setActiveTab] = useState("basicdetails");
  const [htmlContent, setHtmlContent] = useState("");
  const [variantInput, setVariantInput] = useState({
    optionName: "",
    optionValues: [],
  });
  const [showLivePreview, setShowLivePreview] = useState(false);
  const livePreviewRef = useRef(null);

  useEffect(() => {
    // Function to calculate and set the final price
    const calculateFinalPrice = () => {
      const mrp = parseFloat(productInfo.price) || 0;
      const discount = parseFloat(productInfo.discountPrice) || 0;
      const finalPrice = mrp - discount;
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        finalPrice,
      }));
    };

    // Calculate and set the final price immediately
    calculateFinalPrice();

    // Update the final price every second
    const interval = setInterval(calculateFinalPrice, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [productInfo.price, productInfo.discountPrice]);

  useEffect(() => {
    // Add an event listener to handle clicks outside the Live Preview
    function handleClickOutside(event) {
      if (
        livePreviewRef.current &&
        !livePreviewRef.current.contains(event.target)
      ) {
        setShowLivePreview(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle changes in the HTML editor
  const handleHtmlChange = (content) => {
    setHtmlContent(content);
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      description: content,
    }));
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

  const LivePreview = ({ productInfo, htmlContent, imagePreview }) => {
    // Add inline styles to make it look attractive
    const previewStyle = {
      position: "fixed",
      top: "10%",
      left: "10%",
      width: "80%",
      height: "80%",
      background: "white",
      border: "1px solid #ccc",
      padding: "20px",
      zIndex: "999",
      overflow: "auto",
    };

    const toggleDescriptionExpand = () => {
      setDescriptionExpanded(!isDescriptionExpanded);
    };
    return (
      <div style={previewStyle}>
        <h2>{productInfo.productName}</h2>
        <div>
          <label>Product Title:</label>
          <p>{productInfo.productName}</p>
        </div>
        <div>
          <label>Product Description:</label>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
        <div>
          <label>Images:</label>
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
        </div>

        <button onClick={() => setShowLivePreview(false)}>Close</button>
      </div>
    );
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

    
    // Convert boolean values to 0 and 1
    const productInfoWithBooleanConversion = { ...productInfo };
    for (const key in productInfoWithBooleanConversion) {
      if (typeof productInfoWithBooleanConversion[key] === "boolean") {
        productInfoWithBooleanConversion[key] =
          productInfoWithBooleanConversion[key] ? 1 : 0;
      }
    }

  const formData = new FormData();

  // Append productInfo fields to the FormData
  for (const key in productInfo) {
    formData.append(key, productInfo[key]);
  }

  // Append uploaded images to the FormData
  for (const image of uploadedImages) {
    formData.append("productImages", image);
  }

    try {
      const response = await axios.post(
        "http://localhost:8081/admin/add-product",
        productInfoWithBooleanConversion, // Send productInfo with boolean conversion
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
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
  
      reader.onload = (e) => {
        previews.push(e.target.result);
  
        if (previews.length === selectedFiles.length) {
          setImagePreview((prevPreviews) => [...prevPreviews, ...previews]);
          setUploadedImages((prevImages) => [...prevImages, ...selectedFiles]);
        }
      };
  
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

  const handleShowLivePreview = () => {
    setShowLivePreview(true);
  };
  const closeLivePreview = () => {
    setShowLivePreview(false);
  };

  const handleAddMoreImages = () => {
    // Trigger a click on the file input element to allow users to select more images
    inputRef.current.click();
  };

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
              name="productUrl"
              value={productInfo.productUrl}
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
              name="productName"
              value={productInfo.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="htmlEditor">Product Description</label>
            <div
              className={`editor-container${
                isDescriptionExpanded ? " expanded" : ""
              }`}
              onClick={toggleDescriptionExpand}
            >
              <ReactQuill
                id="htmlEditor"
                name="description"
                value={productInfo.description}
                onChange={(content) =>
                  setProductInfo({ ...productInfo, description: content })
                }
              />
            </div>
          </div>
          <div>
            <label>Detailed Title - SEO</label>
            <textarea name="productTitle" id="" cols="30" rows="10"></textarea>
          </div>
          <div>
            <label>MRP</label>
            <input
              type="text"
              name="price"
              value={productInfo.price}
              onChange={handleChange}
              required
            />
            <label>Discount</label>
            <input
              type="text"
              name="discountPrice"
              value={productInfo.discountPrice}
              onChange={handleChange}
              required
            />
            <div className="flabel">
              <label>Final Price : </label>
              <span> Rs. </span>
              <span className="fprice" style={{ color: "#5E2BFF" }}>
                {productInfo.finalPrice}
              </span>
            </div>
          </div>
          <div>
            <label>Display MRP Text</label>
            <input
              type="text"
              name="mrpText"
              value={productInfo.mrpText}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Display Discount Text</label>
            <input
              type="text"
              name="discountText"
              value={productInfo.discountText}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Course</label>
            <select name="" id="" className="modeOfPayment">
              <option value="Course1">Course 1</option>
            </select>
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
              name="rank"
              value={productInfo.rank}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Subjects</label>
            <select name="" id="" className="modeOfPayment">
              <option value="Subject1">Subject 1</option>
            </select>
          </div>
          <div>
            <label>Categories</label>
            <select name="" id="" className="modeOfPayment">
              <option value="Categories1">Categorie 1</option>
            </select>
          </div>
          <div>
            <label>Sub Categories</label>
            <select name="" id="" className="modeOfPayment">
              <option value="Categories1">Categorie 1</option>
            </select>
          </div>
          <div>
            <label>Authors</label>
            <select name="" id="" className="modeOfPayment">
              <option value="Author1">Authors 1</option>
            </select>
          </div>
          <div>
            <label>Top Left Tag</label>
            <input
              type="text"
              name="topLeft"
              value={productInfo.topLeft}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Top Right Tag</label>
            <input
              type="text"
              name="topRight"
              value={productInfo.topRight}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Bottom Left Tag</label>
            <input
              type="text"
              name="bottomLeft"
              value={productInfo.bottomLeft}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Bottom Right Tag</label>
            <input
              type="text"
              name="bottomRight"
              value={productInfo.bottomRight}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Upload Images</label>
            <input
              type="file"
              accept="image/*"
              name="productImage"
              onChange={handleFileUpload}
              ref={inputRef}
              style={{ display: "none" }}
              multiple
            />
            <button onClick={handleAddMoreImages} className="btn-10">
              +
            </button>
          </div>

          {imagePreview.length > 0 && (
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
          )}
          <div>
            <label>Product Highlights</label>
            <input
              type="text"
              name="highlights"
              value={productInfo.highlights}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Product Details</label>
            <input
              type="text"
              name="productDetails"
              value={productInfo.productDetails}
              onChange={handleChange}
              required
            />
          </div>

          <div>
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
          <div>
            <button
              type="button"
              onClick={handleShowLivePreview}
              id="preview-button"
              className="btn-10"
            >
              Live Preview
            </button>
            {showLivePreview && (
              <div ref={livePreviewRef} className="live-preview-popup">
                <LivePreview
                  productInfo={productInfo}
                  htmlContent={htmlContent}
                  imagePreview={imagePreview}
                />
                <button onClick={closeLivePreview} className="btn-10">
                  Close
                </button>
              </div>
            )}
          </div>

          <button type="submit" id="btnn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
