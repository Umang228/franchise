import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { BsFillCartPlusFill } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
import Rating from "react-rating-stars-component";
import Navbar from "../Navbar";
import CoursesNavbar from "../admin/CoursesNavbar";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
export default function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [cart, setCart] = useState(0); // State to track the cart count
  const [tabs, setTabs] = useState([]);
  const [defaultTab, setDefaultTab] = useState("description");
  const [imagesArray, setImagesArray] = useState([]);
  const navigate = useNavigate();

  const parseVariants = (variantCombinations) => {
    const variantsMap = {};

    variantCombinations.forEach((combination) => {
      Object.entries(combination).forEach(([key, value]) => {
        if (key !== "key" && key !== "priceChange" && key !== "uploadExcel") {
          if (!variantsMap[key]) {
            variantsMap[key] = {
              optionName: key,
              optionValues: [],
              priceAdjustment: 0,
            };
          }

          if (!variantsMap[key].optionValues.includes(value)) {
            variantsMap[key].optionValues.push(value);
          }

          if (key === "priceChange") {
            variantsMap[key].priceAdjustment += parseFloat(value) || 0;
          }
        }
      });
    });

    const dynamicVariants = Object.values(variantsMap);
    return dynamicVariants;
  };
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/admin/products/${id}`)
      .then((response) => {
        const variantCombinations = JSON.parse(
          response.data.products.variantCombinations
        );
        const dynamicVariants = parseVariants(variantCombinations);
        response.data.products.variants = dynamicVariants;
        setProduct(response.data.products);

        const imagesArray = response.data.products.image
          ? response.data.products.image.split(",")
          : [];

        response.data.products.image = imagesArray;
        const parsedTabs = JSON.parse(response.data.products.tabs);
        setTabs(parsedTabs);
        const serverDefaultTab =
          parsedTabs.length > 0 ? parsedTabs[0].name : "description";
        setDefaultTab(serverDefaultTab);
        setActiveTab(serverDefaultTab);

        setProduct(response.data.products);
        setImagesArray(imagesArray);
      });
  }, [productId]);

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThreeDots color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  const baseUrl = "http://localhost:8081";
  const calculatePrice = () => {
    let price = product.price;

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

  const handleVariantChange = (variantName, selectedValue) => {
    setSelectedVariants({
      ...selectedVariants,
      [variantName]: selectedValue,
    });
  };

  const handleAddToCart = (data) => {
    setCart([data]);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Add your logic for submitting reviews
  };

  const extractYouTubeLinks = (content) => {
    const decodedContent = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const matches = decodedContent.match(/<iframe.*?<\/iframe>/g);
    return matches ? matches.map((match) => match.match(/src=["'](.*?)["']/)[1]) : [];
  };
  const handleBuyNow = () => {
    navigate('/franchise/student-details');
  };


  return (
    <div style={{ backgroundColor: "white" }}>
      <SideBar/>
      <div className="ProductDetails" style={{ backgroundColor: "white",marginLeft:'55px'}}>
        <div className="leftSide">
          <Carousel showArrows={true} className="slider">
            {imagesArray.map((imageUrl, index) => (
              <div key={index}>
                <img src={`${baseUrl}/${imageUrl}`} alt={`Product ${index}`} />
              </div>
            ))}
          </Carousel>

          <div className="tab-buttons">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab.name)}
                className={activeTab === tab.name ? "active" : ""}
              >
                {tab.name}
              </button>
            ))}
            <button
              onClick={() => setActiveTab("reviews")}
              className={activeTab === "reviews" ? "active" : ""}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab-content-${tab.name.toLowerCase()}`}
                style={{ width: "90vw" }}
              >
                {activeTab === tab.name && (
                  <>
                    {tab.name === "Youtube Links" &&
                    tab.content.includes("<p>&lt;iframe") ? (
                      <div style={{ textAlign: "center" }}>
                        {extractYouTubeLinks(tab.content).length === 1 ? (
                          <iframe
                            width="560"
                            height="315"
                            src={extractYouTubeLinks(tab.content)[0]}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          extractYouTubeLinks(tab.content).map(
                            (youtubeLink, idx) => (
                              <iframe
                                key={idx}
                                width="560"
                                height="315"
                                src={youtubeLink}
                                title={`YouTube video player ${idx + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{ marginBottom: "15px" }}
                              ></iframe>
                            )
                          )
                        )}
                      </div>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: tab.content }} />
                    )}
                  </>
                )}
              </div>
            ))}

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
                  <button
                    type="submit"
                    className="btn-10"
                    style={{ top: "20px", position: "relative" }}
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="rightSide">
          <span>
            Courses {">"} <span className="course">{product.course}</span>
          </span>
          <h3 style={{ color: "#0C0C0C" }}>{product.productName}</h3>
          <p>
            By <span className="faculty">{product.author}</span>
          </p>

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

          <h3 className="Price">
            Rs. <span className="price">{calculatePrice()}</span>
          </h3>

          <span className="pB">
  
          <button onClick={handleBuyNow} className="btn-10">
              Buy Now
            </button>

          </span>
        </div>
      </div>
    </div>
  );
}
