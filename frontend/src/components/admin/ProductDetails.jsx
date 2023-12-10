import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { BsFillCartPlusFill } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
import { AiOutlineHeart } from "react-icons/ai";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from "react-rating-stars-component";
import Navbar from "./Navbar";
import CoursesNavbar from "./CoursesNavbar";
import { CartProvider,useCart} from "./CartContext";
import { useParams, useNavigate } from "react-router-dom";
import OrigPdetails from "./OrigPdetails";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
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
  const cartContext = useCart();
  const { addToCart } = cartContext || {};
  const [imagesArray, setImagesArray] = useState([]);
  // const { addToCart } = useCart();
  const parseVariants = (variantCombinations) => {
    const variantsMap = {};
    // Parse the variantCombinations and group by optionName
    variantCombinations.forEach((combination) => {
      Object.entries(combination).forEach(([key, value]) => {
        if (key !== "key" && key !== "priceChange" && key !== "uploadExcel") {
          if (!variantsMap[key]) {
            variantsMap[key] = {
              optionName: key,
              optionValues: [],
              priceChange: Number(combination.priceChange) || 0,
            };
            console.log('the key is :-',key);
          }
  
          // Add optionValues
          if (!variantsMap[key].optionValues.includes(value)) {
            variantsMap[key].optionValues.push(value);
          }
  
          // Update priceAdjustment if priceChange is present
          if (key === "priceChange") {
            product.priceChange += Number(variantsMap[key].priceChange) || 0;
            console.log('priceAdjustment ',variantsMap[key].priceChange );
          }
        }
      });
    });
  
    // Convert variantsMap object to an array
    const dynamicVariants = Object.values(variantsMap);
  
    return dynamicVariants;
  }

  useEffect(() => {
    // Fetch product details based on the product ID from the URL params
    axios
      .get(`http://localhost:8081/admin/products/${productId}`)
      .then((response) => {
        const variantCombinations = JSON.parse(
          response.data.products.variantCombinations
        );
        const dynamicVariants = parseVariants(variantCombinations);
        // Update the product object with the dynamically generated variants
        console.log(dynamicVariants);
        response.data.products.variants = dynamicVariants;
        setProduct(response.data.products);

        console.log("variant combi");
        console.log(response.data.products.variantCombinations);
        // Convert product.image to an array if it's not already
        const imagesArray = response.data.products.image
          ? response.data.products.image.split(",")
          : [];

        // Update the product object with the parsed images array
        response.data.products.image = imagesArray;
        const parsedTabs = JSON.parse(response.data.products.tabs);
        console.log("Tabs ", parsedTabs);
        // Update the tabs state with the dynamic tabs received from the server
        setTabs(parsedTabs);
        const serverDefaultTab =
          parsedTabs.length > 0 ? parsedTabs[0].name : "description";
        setDefaultTab(serverDefaultTab);
        setActiveTab(serverDefaultTab);

        setProduct(response.data.products);

        // Update imagesArray state
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

  // Convert the image paths to full URLs by appending the base URL
  const baseUrl = "http://localhost:8081"; // Replace with your actual base URL

  // Calculate the price based on the selected variants
  const calculateAdjustedPrice = () => {
    let adjustedPrice =Number(product.finalPrice);

    // Loop through selected variants and adjust the price
    for (const variantName in selectedVariants) {
      const selectedValue = selectedVariants[variantName];
      const variant = product.variants.find(
        (v) => v.optionName === variantName
      );
      console.log('variants are', product.variants.priceChange);
      if (variant) {
        const selectedOption = variant.optionValues.find(
          (ov) => ov === selectedValue
        );
        if (selectedOption) {
          adjustedPrice += variant.priceChange;
        }
      }
    }

    return adjustedPrice;
  };


  // Handle variant selection
  const handleVariantChange = (variantName, selectedValue) => {
    setSelectedVariants({
      ...selectedVariants,
      [variantName]: selectedValue,
    });
  };
  // Handle "Add To Cart" button click
  const handleAddToCart = (data) => {
    console.log('Clicked on Add to cart');
    console.log("The Data is :-",data);
    setCart([data])
    const selectedProduct = {
      id: product.id,
      name: product.productName,
      variants: selectedVariants,
      price: calculateAdjustedPrice(),
    };

    // Add the product to the cart
    if (addToCart) {
      addToCart(selectedProduct);
      const updatedCart = JSON.stringify([...cartContext.cart, selectedProduct]);
      localStorage.setItem("cartItems", updatedCart);
      navigate('/cart');
      console.log("Cart Items :-", selectedProduct);
    } else {
      console.error("addToCart is not defined in the context");
    }

    console.log("Cart Items :-",selectedProduct)

  };

  // Define tab content
  const descriptionContent = product.description; // Replace with actual data
  const youtubeContent = product.youtubeVideos; // Replace with actual data
  const reviewsContent = product.reviews; // Replace with actual data
  const handleReviewSubmit = (e) => {
    e.preventDefault();
  };

  const extractYouTubeLinks = (content) => {
    // Replace HTML entities with actual characters
    const decodedContent = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  
    // Use regex to extract all src attribute values
    const matches = decodedContent.match(/<iframe.*?<\/iframe>/g);
    return matches ? matches.map(match => match.match(/src=["'](.*?)["']/)[1]) : [];
  };
  return (
    <CartProvider style={{ backgroundColor: "white" }}>
      {/* <CoursesNavbar /> */}
      <OrigPdetails/>
    </CartProvider>
  );
}
