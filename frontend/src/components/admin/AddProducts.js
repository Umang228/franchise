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
export default function AddProducts() {
  const [productInfo, setProductInfo] = useState({
    productUrl: "",
    productName: "",
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
    description: "",
    shortDescription: "",
    featured: false,
    slug: "",
    productImage: "",
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
    youtubeLink: "",
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const inputRef = React.createRef();
  const [activeTab, setActiveTab] = useState("basicdetails");
  const [htmlContent, setHtmlContent] = useState("");
  const [variantInput, setVariantInput] = useState({
    optionName: "",
    optionValues: [],
  });
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
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
  const handleYoutubeLinkChange = (event) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      youtubeLink: event.target.value,
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

    const galleryStyle = {
      position: "fixed",
      top: "6%",
      left: "10%",
      width: "80%",
      height: "80%",
      background: "white",
      border: "1px solid #ccc",
      padding: "20px",
      zIndex: "999",
      overflow: "auto",
      color: "black",
      display: "flex",
    };

    const contentStyle = {
      flex: 1,
      maxHeight: "100%",
      overflow: "auto",
    };

    return (
      <div style={galleryStyle} className="slid">
        <div style={contentStyle}>
          <h2>{productInfo.productName}</h2>
          <label>Images:</label>
          <div className="product-imgs-slider">
            <ReactImageGallery items={images} />
          </div>
          <button
            onClick={closeLivePreview}
            className="btn-10"
            style={{ position: "relative", left: "80%", top: "-20px" }}
          >
            Close
          </button>
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
  };

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();

    // Convert boolean values to 0 and 1
    const productInfoWithBooleanConversion = { ...productInfo };
    for (const key in productInfoWithBooleanConversion) {
      if (typeof productInfoWithBooleanConversion[key] === "boolean") {
        productInfoWithBooleanConversion[key] =
          productInfoWithBooleanConversion[key] ? 1 : 0;
      }
    }

    // Convert uploaded images to Base64 strings
    const imagePromises = uploadedImages.map(async (image) => {
      const reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(image);
      });

      return promise;
    });

    // Wait for all of the image promises to resolve
    const imageBase64Strings = await Promise.all(imagePromises);

    // Update the productInfo object with the array of image Base64 strings
    productInfoWithBooleanConversion.productImage = imageBase64Strings;

    const formData = new FormData();

    // Append productInfo fields to the FormData
    for (const key in productInfoWithBooleanConversion) {
      formData.append(key, productInfoWithBooleanConversion[key]);
    }
    try {
      const response = await axios.post(
        "http://localhost:8081/admin/add-product",
        formData, // Send productInfo with boolean conversion and image Base64 strings
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
  function generateVariantCombinations(variants) {
    if (!variants || variants.length === 0) {
      return [];
    }

    // Initialize combinations with the first variant's option values
    let combinations = variants[0].optionValues.map((optionValue) => [
      { optionName: variants[0].optionName, optionValue },
    ]);

    // Iterate over the remaining variants
    for (let i = 1; i < variants.length; i++) {
      const variant = variants[i];
      const newCombinations = [];

      // For each combination, create new combinations with the current variant's option values
      combinations.forEach((combination) => {
        variant.optionValues.forEach((optionValue) => {
          newCombinations.push([
            ...combination,
            { optionName: variant.optionName, optionValue },
          ]);
        });
      });

      combinations = newCombinations;
    }

    return combinations;
  }

  function calculatePrice(combination) {
    const basePrice = productInfo.finalPrice; // Use your base price
    // You may need to adjust the price based on the combination
    // For example, if variant1 is "Small" and variant2 is "Red," adjust the price.
    return basePrice + 0 /* Add adjustments based on combination */;
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
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
              <div
                key={variantIndex}
                style={{ position: "relative", top: "13px", padding: "12px" }}
              >
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
              </div>
            ))}
          </div>
          <div>
            {/* <table>
              <thead>
                <tr>
                  <th>Variant 1</th>
                  <th>Variant 2</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {generateVariantCombinations().map((combination, index) => (
                  <tr key={index}>
                    <td colSpan={2}>{combination.variant1}</td>
                    <td colSpan={2}>{combination.variant2}</td>
                    <td colSpan={2}>{calculatePrice(combination)}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
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
          </div>

          <button type="submit" id="btnn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
