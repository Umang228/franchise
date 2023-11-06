import React, { useState, useRef, useEffect } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "../style/addprod.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import LivePreviewPage from "./LivePreviewPage";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TiStarburst } from "react-icons/ti";
import { BiFontSize } from "react-icons/bi";
export default function AddProducts() {
  const [productInfo, setProductInfo] = useState({
    productUrl: "",
    productName: "",
    productUrl: "",
    facultyName: "",
    productID: "",
    productType: "Combo",
    course: "",
    subject: "",
    category: "",
    subCategory: "",
    author: "",
    deliveryType: "Regular",
    isFranchise: false,
    isWhatsapp: false,
    priceUpdate: false,
    price: 0,
    finalPrice: 0,
    discountPrice: 0,
    discountType: "normal",
    description: "",
    shortDescription: "",
    featured: false,
    slug: "",
    productImage: "",
    variants: [],
    variantCombinations: [],
    mrpText: "",
    discountText: "",
    rank: 0,
    topLeft: "",
    topRight: "",
    bottomLeft: "",
    bottomRight: "",
    highlights: "",
    productDetails: "",
    youtubeLink: "",
    displayField: "", // Selected field from the dropdown
    customFields: [], // Array to store custom fields
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const toggleDescriptionExpand = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };
  const [showTable, setShowTable] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const inputRef = React.createRef();
  const [activeTab, setActiveTab] = useState("basicdetails");
  const [htmlContent, setHtmlContent] = useState("");
  const [variantInput, setVariantInput] = useState({
    optionName: "",
    optionValues: [],
  });
  const [tabs, setTabs] = useState([
    { name: "Description", content: "" },
    { name: "Youtube Links", content: "" },
    { name: "Reviews", content: "" },

  ]);

  const [showLivePreview, setShowLivePreview] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const livePreviewRef = useRef(null);
  const [discountType, setDiscountType] = useState("normal");

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
  
    // Initialize the combinations with prices here
    const initialPrice = parseFloat(productInfo.price) || 0;
    const initialCombinations = generateVariantCombinations(productInfo.variants).map(
      (combination) => ({
        ...combination,
        price: initialPrice,
      })
    );
  
  
    axios
      .get("http://localhost:8081/admin/courses")
      .then((response) => {
        console.log("Response from server:", response.data);
        const courses = response.data;
        if (courses.length > 0) {
          // Access the first course and its related properties
          const firstCourse = courses[0];
          console.log("Course Subjects:", firstCourse.courseSubjects);
          console.log("Course Categories:", firstCourse.courseCategories);
          console.log("Course SubCategories:", firstCourse.courseSubCategories);
          setCourses(courses);
          const subjectsArray = Array.isArray(firstCourse.courseSubjects)
            ? firstCourse.courseSubjects.map((subject) => subject.subjectName)
            : [];
          setSubjects(subjectsArray);
          let categoriesArray = Array.isArray(firstCourse.courseCategories)
            ? firstCourse.courseCategories
            : [firstCourse.courseCategories];
          setCategories(categoriesArray);
          let subCategoriesArray = Array.isArray(
            firstCourse.subCourseCategories
          )
            ? firstCourse.subCourseCategories
            : [firstCourse.subCourseCategories];
          setCategories(subCategoriesArray);
          let authorsArray = Array.isArray(firstCourse.courseAuthors)
            ? firstCourse.courseAuthors
            : [firstCourse.courseAuthors];
          setAuthors(authorsArray);
        } else {
          setSubjects([]);
          setCategories([]);
          setSubCategories([]);
          setAuthors([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  
    // Calculate and set the final price immediately
    calculateFinalPrice();
  
    // Update the final price every second
    const interval = setInterval(calculateFinalPrice, 1000);
  
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [productInfo.price, productInfo.variants]);
  

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
  const handleYoutubeLinkChange = (event) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      youtubeLink: event.target.value,
    }));
  };
  const navigate = useNavigate();
  // handle variants
  const addVariant = () => {
    console.log("addVariant called");
    if (productInfo.variants.length < 4) {
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        variants: [
          ...prevProductInfo.variants,
          { optionName: "", optionValues: [] }, // Create an empty variant
        ],
      }));
    }
  };

  const addTab = () => {
    const newTab = { name: "New Tab", content: "" };
    setTabs([...tabs, newTab]);
  };

  const removeTab = (index) => {
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
  };

  const updateTabName = (index, newName) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].name = newName;
    setTabs(updatedTabs);
  };

  const updateTabContent = (index, newContent) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].content = newContent;
    setTabs(updatedTabs);
  };

  const LivePreview = ({
    productInfo,
    htmlContent,
    imagePreview,
    closeLivePreview,
  }) => {
    const images =
      imagePreview &&
      imagePreview.map((preview, index) => ({
        original: preview,
        thumbnail: preview, // You can use the same image as a thumbnail or specify a different one
        description: `Image Preview ${index}`,
      }));

    const contentStyle = {
      flex: 1,
      maxHeight: "100%",
      overflow: "auto",
    };

    return (
      <div>
        <div style={contentStyle}>
          <h2>
            <AiOutlineArrowLeft /> {productInfo.productName}
          </h2>
          <label>Images:</label>
          <div className="product-imgs-slider">
            <ReactImageGallery items={images} />
          </div>
          <div>
            {/* Display the product variants as dropdowns */}
            {productInfo.variants.map((variant, variantIndex) => (
              <div key={variantIndex}>
                <label>{variant.optionName}:</label>
                <select
                  name={`variant-${variantIndex}`}
                  value={productInfo.variants[variantIndex].selectedOption}
                  onChange={(e) => {
                    const selectedOption = e.target.value;
                    setProductInfo((prevProductInfo) => {
                      const updatedVariants = [...prevProductInfo.variants];
                      updatedVariants[variantIndex].selectedOption =
                        selectedOption;
                      return {
                        ...prevProductInfo,
                        variants: updatedVariants,
                      };
                    });
                  }}
                >
                  <option value="">Select an option</option>
                  {variant.optionValues.map((optionValue, optionIndex) => (
                    <option key={optionIndex} value={optionValue}>
                      {optionValue}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div>
            {/* Display the product description */}
            <div>
              <div
                style={{ color: "black" }}
                dangerouslySetInnerHTML={{ __html: productInfo.description }}
              ></div>
            </div>
          </div>
          <div>
            {/* Display the YouTube video */}
            {productInfo.youtubeLink && (
              <div>
                <iframe
                  title="YouTube Video"
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${productInfo.youtubeLink}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
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
    if (name === "price" || name === "discountPrice") {
      // Calculate the final price based on the selected discount type
      const price = parseFloat(productInfo.price);
      const discountPrice = parseFloat(productInfo.discountPrice);

      let finalPrice;

      if (discountType === "percentage") {
        // Discount is a percentage
        finalPrice = price - (price * discountPrice) / 100;
      } else {
        // Discount is a normal value
        finalPrice = price - discountPrice;
      }

      setProductInfo({
        ...productInfo,
        [name]: value,
        finalPrice: finalPrice.toFixed(2), // Optionally, round to 2 decimal places
      });
      calculatePrice();
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

    // Stringify the 'variants' array
    const productData = {
      ...productInfoWithBooleanConversion,
      variants: JSON.stringify(productInfo.variants),
    };

    // Create a new FormData
    const formData = new FormData();

    // Append productInfo fields to the FormData
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    // Append uploaded images to the FormData
    for (const image of uploadedImages) {
      formData.append("productImage", image);
    }

    try {
      // Send the FormData to the server
      const response = await axios.post(
        "http://localhost:8081/admin/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
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
  function generateVariantCombinations(variants) {
    if (!variants || variants.length === 0) {
      return [];
    }

    const optionNames = variants.map((variant) => variant.optionName);

    let combinations = [];
    const firstVariant = variants[0];

    firstVariant.optionValues.forEach((optionValue) => {
      combinations.push({
        [firstVariant.optionName]: optionValue,
        price: 0, // Initialize price as 0
      });
    });

    for (let i = 1; i < variants.length; i++) {
      const variant = variants[i];
      const newCombinations = [];

      combinations.forEach((combination) => {
        variant.optionValues.forEach((optionValue) => {
          newCombinations.push({
            ...combination,
            [variant.optionName]: optionValue,
            price: 0, // Initialize price as 0
          });
        });
      });

      combinations = newCombinations;
    }

    return combinations;
  }

  function calculatePrice(combination) {
    const mrp = parseFloat(productInfo.price) || 0;
    const discount = parseFloat(productInfo.discountPrice) || 0;
    const finalPrice =
      productInfo.discountType === "percentage"
        ? mrp - mrp * (discount / 100)
        : mrp - discount;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      finalPrice,
    }));
  }

  async function handleFileUpload(event) {
    debugger;
    const selectedFiles = event.target.files;
    const previews = [];
    const filesArray = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      const preview = await new Promise((resolve) => {
        reader.onload = (e) => {
          resolve(e.target.result);
        };

        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
      });

      previews.push(preview);
      filesArray.push(file);
    }

    // All files have been processed
    console.log("Previews:", previews);
    console.log("Files Array:", filesArray);
    setImagePreview((prevPreviews) => [...prevPreviews, ...previews]);
    setUploadedImages((prevImages) => [...prevImages, ...filesArray]);

    // Return a Promise so that the caller can wait for the function to finish
    return Promise.resolve();
  }

  // const handleShowLivePreview = () => {
  //   setShowLivePreview(true);
  // };
  // const closeLivePreview = () => {
  //   setShowLivePreview(false);
  // };
  const handleDiscountTypeChange = (e) => {
    setProductInfo({ ...productInfo, discountType: e.target.value });
    calculatePrice();
  };

  const handlePriceChange = (index, newPrice) => {
    if (productInfo.variantCombinations.length > index) {
      const updatedCombinations = [...productInfo.variantCombinations];
      updatedCombinations[index].price = parseFloat(newPrice) || 0;
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        variantCombinations: updatedCombinations,
      }));
    } else {
      console.error(`Combination at index ${index} does not exist.`);
    }
  };
  
  
  
  
  // Initialize the variantCombinations with an empty array here
  // setProductInfo((prevProductInfo) => ({
  //   ...prevProductInfo,
  //   variantCombinations: [],
  // }));
  
  useEffect(() => {
    // ... (the rest of your code)
  }, [productInfo.price, productInfo.discountPrice]);
  
  

  const addCustomField = () => {
    const newField = prompt("Enter a custom field name:");
    if (newField) {
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        customFields: [...prevProductInfo.customFields, newField],
      }));
    }
  };
  const handleProductNameChange = (e) => {
    const newProductName = e.target.value;
    const newProductUrl = newProductName; // Use the product name as the URL
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      productName: newProductName,
      productUrl: newProductUrl,
    }));
  };
  const handleAddMoreImages = () => {
    // Trigger a click on the file input element to allow users to select more images
    inputRef.current.click();
  };

  return (
    <body>
      <Sidebar />
      <div className="add-product-form">
        <h2>Add Product</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div>
            <label>Product Title</label>
            <input
              type="text"
              name="productName"
              value={productInfo.productName}
              onChange={handleProductNameChange}
              required
            />
          </div>
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
            <div>
              <label>Discount Type:</label>
              <select
                name="discountType"
                value={productInfo.discountType}
                onChange={handleDiscountTypeChange}
              >
                <option value="normal">Normal</option>
                <option value="percentage">Percentage (%)</option>
              </select>
            </div>
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
            <select
              name="course"
              value={productInfo.course}
              onChange={handleChange} // You should implement handleChange for this field
              className="modeOfPayment"
            >
              <option value="" disabled>
                Select a Course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
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
            <select
              name="subject"
              value={productInfo.subject}
              onChange={handleChange} // Implement handleChange for this field
              className="modeOfPayment"
            >
              <option value="" disabled>
                Select a Subject
              </option>
              {subjects.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.subjectName}
                  {console.log(course.subjectName)}
                </option>
              ))}
              <option value="test">test</option>
            </select>
          </div>
          <div>
            <label>Categories</label>
            <select
              name="category"
              value={productInfo.category}
              onChange={handleChange} // Implement handleChange for this field
              className="modeOfPayment"
            >
              <option value="" disabled>
                Select a Category
              </option>
              {courses.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
              <option value="test">test</option>
            </select>
          </div>
          <div>
            <label>Sub Categories</label>
            <select
              name="subCategory"
              value={productInfo.subCategory}
              onChange={handleChange} // Implement handleChange for this field
              className="modeOfPayment"
            >
              <option value="" disabled>
                Select a Sub Category
              </option>
              {subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.subCategoryName}
                </option>
              ))}
              <option value="test">test</option>
            </select>
          </div>
          <div>
            <label>Authors</label>
            <select
              name="author"
              value={productInfo.author}
              onChange={handleChange} // Implement handleChange for this field
              className="modeOfPayment"
            >
              <option value="" disabled>
                Select an Author
              </option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.authorName}
                </option>
              ))}
              <option value="test">pious</option>
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
              ref={inputRef} // Add this ref
              style={{ display: "none" }}
              multiple
            />
            <button onClick={handleAddMoreImages} className="btn-10">
              <i class="fa-solid fa-upload"></i>
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
            <label>YouTube Video Link:</label>
            <input
              type="text"
              name="youtubeLink"
              value={productInfo.youtubeLink}
              onChange={handleYoutubeLinkChange}
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
                  className="rdio"
                />
                Broadcast To Whatsapp
              </label>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="priceUpdate"
                  checked={productInfo.priceUpdate}
                  onChange={handleChange}
                  className="rdio"
                />
                Price Update
              </label>
              <label style={{ color: "black", padding: 15 }}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={productInfo.featured}
                  onChange={handleChange}
                  className="rdio"
                  style={{
                    margin: "18px",
                  }}
                />
                Featured
              </label>
            </div>
          </div>
          {tabs.map((tab, index) => (
            <div key={index}>
              <div className="descDiv">
                <label>Tab Name:</label>
                <input
                  type="text"
                  value={tab.name}
                  onChange={(e) => updateTabName(index, e.target.value)}
                />
                <button onClick={() => removeTab(index)} className="btn-10">
                  Remove
                </button>
              </div>
              <div>
                <label>{tab.name} Content:</label>
                <ReactQuill
                  value={tab.content}
                  onChange={(content) => updateTabContent(index, content)}
                />
              </div>
            </div>
          ))}

          <button onClick={addTab} className="btn-10">
            + Add Tab
          </button>

          <div>
            <button
              type="button"
              onClick={() => {
                addVariant();
                setShowTable(true);
              }}
              className="btn-10"
            >
              + Add Variant
            </button>
            {productInfo.variants.map((variant, variantIndex) => (
              <div
                key={variantIndex}
                style={{ position: "relative", top: "13px", padding: "12px" }}
              >
                <div>
                  <label>Option Name:</label>
                  <input
                    type="text"
                    value={variant.optionName}
                    className="optIn"
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
                  <label style={{ marginTop: "10px" }}>Option Values:</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {variant.optionValues.map(
                      (optionValue, optionValueIndex) => (
                        <div
                          key={optionValueIndex}
                          style={{ marginRight: "10px" }}
                        >
                          <input
                            type="text"
                            value={optionValue}
                            className="optVn"
                            onChange={(e) => {
                              const updatedOptionValues = [
                                ...variant.optionValues,
                              ];
                              updatedOptionValues[optionValueIndex] =
                                e.target.value;
                              setProductInfo((prevProductInfo) => {
                                const updatedVariants = [
                                  ...prevProductInfo.variants,
                                ];
                                updatedVariants[variantIndex].optionValues =
                                  updatedOptionValues;
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
                    {variant.optionValues.length < 4 && (
                      <button
                        type="button"
                        onClick={() => {
                          setProductInfo((prevProductInfo) => {
                            const updatedVariants = [
                              ...prevProductInfo.variants,
                            ];
                            updatedVariants[variantIndex].optionValues.push("");
                            return {
                              ...prevProductInfo,
                              variants: updatedVariants,
                            };
                          });
                        }}
                        className="btn-10"
                      >
                        + Add Option Value
                      </button>
                    )}
                  </div>
                </div>
                {/* <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    value={variant.price}
                    onChange={(e) => {
                      const newPrice = parseFloat(e.target.value) || 0;
                      setProductInfo((prevProductInfo) => {
                        const updatedVariants = [...prevProductInfo.variants];
                        updatedVariants[variantIndex].price = newPrice;
                        return {
                          ...prevProductInfo,
                          variants: updatedVariants,
                        };
                      });
                    }}
                  />
                </div> */}
              </div>
            ))}
          </div>

          {showTable && (
            <div>
              <table
                className="utable"
                style={{
                  position: "relative",
                  top: "-50px",
                  left: "-30px",
                  border: "0.5px solid gray",
                }}
              >
                <thead style={{ borderBottom: "0.5px solid gray" }}>
                  <tr>
                    {productInfo.variants.map((variant) => (
                      <th key={variant.optionName}>{variant.optionName}</th>
                    ))}
                    {productInfo.variants.some(
                      (variant) => variant.optionValues.length > 0
                    ) && <th>Price</th>}
                  </tr>
                </thead>
                <tbody>
                  {generateVariantCombinations(productInfo.variants).map(
                    (combination, index) => (
                      <tr key={index}>
                        {productInfo.variants.map((variant) => (
                          <td key={variant.optionName}>
                            {combination[variant.optionName]}
                          </td>
                        ))}
                        {productInfo.variants.some(
                          (variant) => variant.optionValues.length > 0
                        ) && (
                          <td>
                            <input
                              type="text"
                              value={combination.price} // Use the price value from the combination
                              onChange={(e) =>
                                handlePriceChange(index, e.target.value)
                              }
                            />
                          </td>
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* <div>
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
                {productInfo.youtubeLink && (
                  <div>
                    <iframe
                      title="YouTube Video"
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${productInfo.youtubeLink}`}
                      frameborder="0"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                    ></iframe>
                  </div>
                )}
                <button onClick={closeLivePreview} className="btn-10">
                  Close
                </button>
              </div>
            )}
          </div> */}

          <button type="submit" id="btnn">
            Add Product
          </button>
        </form>
      </div>
      <div className="left-form">
        <span>
          <TiStarburst
            style={{
              textAlign: "center",
              color: "linear-gradient(to right, #FF6B6B, #FFD166)",
              fontSize: "23px",
            }}
          />
        </span>
        <h3>Step 1: Product Information</h3>
        <p>
          1. Start by entering the product title in the "Product Title" field.
          This is the main name of your product.
        </p>
        <p>
          2. Provide a product URL, which should be a unique identifier for your
          product. This helps in SEO and easy access.
        </p>
        <p>
          3. Create a descriptive product description in the "Product
          Description" field using the rich text editor.
        </p>
        <p>4. Add a detailed title for SEO purposes.</p>
        <p>
          5. Enter the MRP (Maximum Retail Price) and the discounted price. The
          final price will be calculated automatically.
        </p>
        <p>6. Specify how the MRP should be displayed.</p>
        <p>7. Indicate how the discount should be displayed.</p>
        <p>8. Select the relevant course from the dropdown list.</p>
        <p>9. Choose the inventory status as "In Stock."</p>
        <p>10. Assign a rank to your product.</p>
        <p>
          11. Select the appropriate subject, category, and subcategory from
          their respective dropdown menus.
        </p>
        <p>12. Pick an author from the list.</p>
        <p>
          13. Add tags to your product - top left, top right, bottom left, and
          bottom right.
        </p>
        <p>
          14. Upload images by clicking the "Upload Images" button and selecting
          multiple images. They will be displayed below the button.
        </p>
        <p>15. Enter the product highlights.</p>
        <p>
          16. If you have a YouTube video related to the product, provide the
          link.
        </p>

        <h3>Step 2: Product Details</h3>
        <p>1. Enter specific product details.</p>
        <p>2. Specify the faculty name.</p>
        <p>3. Assign a unique product ID (SKU).</p>
        <p>4. Choose the product type - Combo or Single.</p>
        <p>5. Select the delivery type - Regular or Fast Track.</p>
        <p>6. Add a short description of the product.</p>
        <p>7. Specify the product's slug.</p>

        <h3>Step 3: Additional Services</h3>
        <p>
          1. Indicate if the product is a franchise, should be broadcasted on
          WhatsApp, requires price updates, or is featured. You can choose
          multiple options.
        </p>

        <h3>Step 4: Variants (if applicable)</h3>
        <p>
          1. Click the "+ Add Variant" button to add different product variants.
        </p>
        <p>
          2. For each variant, provide an option name and values. You can add
          multiple values for each option.
        </p>
        <p>
          3. Set prices for each combination of variant options in the table at
          the bottom of the form.
        </p>

        {/* <h3>Step 5: Live Preview</h3>
        <p>
          1. Click the "Live Preview" button to see how your product will
          appear.
        </p>
        <p>
          2. A pop-up will display the live preview, including the product
          description, images, and any embedded YouTube video.
        </p>
        <p>
          3. You can close the live preview by clicking the "Close" button
          within the pop-up.
        </p> */}

        <h3>Step 5: Submit Your Product</h3>
        <p>
          1. Finally, click the "Add Product" button at the end of the form to
          submit your product.
        </p>
      </div>
    </body>
  );
}
