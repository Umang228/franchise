import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { BsFillCartPlusFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from "react-rating-stars-component";

export default function ProductDetails() {
  debugger;  
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  useEffect(() => {
    // Fetch product details based on the product ID from the URL params
    axios
      .get(`http://localhost:8081/admin/products/${productId}`)
      .then((response) => {
        if (response.data.products && typeof response.data.products.variants === "string") {
            response.data.products.variants = JSON.parse(response.data.products.variants);
          }
        setProduct(response.data.products);
      });
  }, [productId]);

  if (!product) {
    return <div style={{ color: "black", fontSize: "32px" }}>Loading...</div>;
  }

  // Convert the image paths to full URLs by appending the base URL
  const baseUrl = "http://localhost:8081"; // Replace with your actual base URL
  const images = [
    "https://imgs.search.brave.com/gP4WAtTy7UTEmcRj_9MdP_cTRIXAMqj6bk8tRysmYzk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jYXdp/emFyZC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMDgv/Q0EtQ291cnNlLUd1/aWRlLTEtMS53ZWJw",
    "https://imgs.search.brave.com/LGlXTtAAYkM5QO0K_mGeHbgNX7jm1MscpNRyje7ahXo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YWVjY2dsb2JhbC5p/bi9pbWFnZXMvMjAy/My8wNy8xNy9jYS1j/b3Vyc2VzLWFmdGVy/LTEydGgud2VicA",
    "https://imgs.search.brave.com/S_deFXvqq3YuotbIxx6Gs0F1MwMe1aMN8F-UT8mSpi0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY29sbGVnZWR1/bmlhLmNvbS9wdWJs/aWMvaW1hZ2UvZDgz/OWRkZWY3NTA5Mzkx/MGI1Zjk0ZWUzZWU3/NjY2NWYuanBlZz90/cj13LTYwMSxoLTQy/MSxjLWZvcmNl",
  ];

  // Calculate the price based on the selected variants
  const calculatePrice = () => {
    let price = product.price; // Start with the base price

    // Loop through selected variants and adjust the price
    for (const variantName in selectedVariants) {
      const selectedValue = selectedVariants[variantName];
      const variant = product.variants.find(
        (v) => v.optionName === variantName
      );

      if (variant) {
        const selectedOption = variant.optionValues.find(
          (ov) => ov === selectedValue
        );
        if (selectedOption) {
          price += variant.priceAdjustment;
        }
      }
    }

    return price;
  };

  // Handle variant selection
  const handleVariantChange = (variantName, selectedValue) => {
    setSelectedVariants({
      ...selectedVariants,
      [variantName]: selectedValue,
    });
  };



  // Define tab content
  const descriptionContent = product.description; // Replace with actual data
  const youtubeContent = product.youtubeVideos; // Replace with actual data
  const reviewsContent = product.reviews; // Replace with actual data
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Implement the review submission logic here, e.g., send data to the server
    // You can access the 'name', 'email', 'rating', and 'review' state variables here
  };

  product.variants = [
    {
      optionName: "Course Type",
      optionValues: ["Pendrive", "Online", "Classroom"],
      priceAdjustment: 0,
    },
    {
      optionName: "Course Duration",
      optionValues: ["3 Months", "6 Months", "12 Months"],
      priceAdjustment: 30,
    },
    // ... other variants
  ];

  return (
    <div className="ProductDetails" style={{ backgroundColor: "white" }}>
      <div className="leftSide">
        <Carousel showArrows={true} className="slider">
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Product ${index}`} />
            </div>
          ))}
        </Carousel>

        {/* Tab buttons */}
        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab("description")}
            className={activeTab === "description" ? "active" : ""}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("youtube")}
            className={activeTab === "youtube" ? "active" : ""}
          >
            YouTube Videos
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={activeTab === "reviews" ? "active" : ""}
          >
            Reviews
          </button>
        </div>

        {/* Tab content */}
        <div className="tab-content">
          {activeTab === "description" && (
            <div
              className="tab-content-description"
              dangerouslySetInnerHTML={{ __html: descriptionContent }}
              style={{ width: "90vw" }}
            />
          )}
          {activeTab === "youtube" && (
            <div className="tab-content-youtube">
              <iframe
                title="YouTube Video"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${youtubeContent}`}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              ></iframe>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-content-reviews">
              <h3>Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Rating:</label>
                  {/* Star rating component */}
                  <Rating
                    count={5}
                    size={24}
                    value={rating}
                    onChange={(newRating) => setRating(newRating)}
                  />
                </div>
                <div>
                  <label>Review:</label>
                  <textarea
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-10" style={{top:'20px',position:'relative'}}>Submit Review</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="rightSide">
        <span>
          Courses {">"} <span className="course">{product.course}</span>
        </span>
        <h1>{product.productName}</h1>
        <p>
          By <span className="faculty">{product.facultyName}</span>
        </p>

        {/* Render variant selection dropdowns */}
        {product.variants.map((variant) => (
          <div key={variant.optionName} className="Variants">
            <label className="varLabel">{variant.optionName}:</label>
            <select
              value={selectedVariants[variant.optionName] || ""}
              onChange={(e) =>
                handleVariantChange(variant.optionName, e.target.value)
              }
              className="varInp"
            >
              <option value="">Select {variant.optionName}</option>
              {variant.optionValues.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Display the adjusted price based on selected variants */}
        <h3 className="Price">
          Rs. <span className="price">{calculatePrice()}</span>
        </h3>

        <span className="pB">
          <button className="addToCart">
            <BsFillCartPlusFill /> Add To Cart
          </button>
        </span>
      </div>
    </div>
  );
}
