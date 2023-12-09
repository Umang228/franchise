import React, { useState, useRef, useEffect } from "react";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import "../style/addprod.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TiStarburst } from "react-icons/ti";
import * as XLSX from "xlsx";
import {
  UserOutlined,
  BarcodeOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  Checkbox,
  Space,
  Table,
  InputNumber,
  message,
  Modal,
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { CartesianProduct } from "js-combinatorics";
import Courses from "./Courses";
const { Option } = Select;
const selectStyle = {
  width: "100%",
  marginBottom: "16px", // Add margin bottom for spacing
};

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
    excelFile: null,
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
    tabs: [
      { tabName: "Description", content: "" },
      { tabName: "Youtube Links", content: "" },
    ],
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
  const [discountType, setDiscountType] = useState("normal");
  const [showVariantFields, setShowVariantFields] = useState(false);
  const [variantOptions, setVariantOptions] = useState([""]);
  const [variantSections, setVariantSections] = useState([
    { variantName: "", options: [""] },
  ]);
  const toggleDescriptionExpand = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };
  const [tableData, setTableData] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const inputRef = React.createRef();
  const [htmlContent, setHtmlContent] = useState("");
  const [variantInput, setVariantInput] = useState({
    optionName: "",
    optionValues: [],
  });
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [tabs, setTabs] = useState([
    { name: "Description", content: "" },
    { name: "Youtube Links", content: "" },
  ]);
  const [excelKeys, setExcelKeys] = useState([]);
  const [usedKeys, setUsedKeys] = useState([]);

  useEffect(() => {
    // Function to calculate and set the final price
    const calculateFinalPrice = () => {
      const mrp = parseFloat(productInfo.price) || 0;
      const discount = parseFloat(productInfo.discountPrice) || 0;

      if (discountType === "percentage") {
        const finalPrice = mrp - (mrp * discount) / 100;
        setProductInfo((prevProductInfo) => ({
          ...prevProductInfo,
          finalPrice: finalPrice.toFixed(2),
        }));
      } else {
        const finalPrice = mrp - discount;
        setProductInfo((prevProductInfo) => ({
          ...prevProductInfo,
          finalPrice: finalPrice.toFixed(2),
        }));
      }
    };

    // Fetch courses when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8081/admin/courses");
        console.log("Response from server:", response.data);
        const courses = response.data;
        if (courses.length > 0) {
          const firstCourse = courses[0];
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
          setSubCategories(subCategoriesArray);
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
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Calculate and set the final price immediately
    calculateFinalPrice();

    // Fetch courses when the component mounts
    fetchCourses();

    // Update the final price every second
    const interval = setInterval(calculateFinalPrice, 1800000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [productInfo.price, productInfo.variants]);

  const parseArray = (data) => {
    try {
      return Array.isArray(data)
        ? data.map(
          (item) =>
            item.subjectName ||
            item.categoriesName ||
            item.courseSubCategoriesName ||
            item.courseAuthorsName
        )
        : JSON.parse(data);
    } catch (error) {
      console.error("Error parsing array:", error);
      return [];
    }
  };

  const handleCourseChange = (value) => {
    const selectedCourse = courses.find(
      (course) => course.courseName === value
    );

    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      course: value,
      subject: "",
    }));

    setSubjects(
      selectedCourse ? parseArray(selectedCourse.courseSubjects) : []
    );
    setCategories(
      selectedCourse ? parseArray(selectedCourse.courseCategories) : []
    );
    setSubCategories(
      selectedCourse ? parseArray(selectedCourse.courseSubCategories) : []
    );
    setAuthors(selectedCourse ? parseArray(selectedCourse.courseAuthors) : []);
  };

  const extractSubjects = (course) => {
    // Check if courseSubjects is an array or a single value
    if (Array.isArray(course.courseSubjects)) {
      return course.courseSubjects.map((subject) => subject.subjectName);
    } else if (typeof course.courseSubjects === "string") {
      return [course.courseSubjects];
    } else {
      return [];
    }
  };

  const extractCategories = (course) => {
    if (Array.isArray(course.courseCategories)) {
      return course.courseCategories.map((subject) => subject.categoriesName);
    } else if (typeof course.courseCategories === "string") {
      return [course.courseCategories];
    } else {
      return [];
    }
  };

  const extractSubCategories = (course) => {
    if (Array.isArray(course.courseSubCategories)) {
      return course.courseSubCategories.map(
        (subject) => subject.courseSubCategoriesName
      );
    } else if (typeof course.courseSubCategories === "string") {
      return [course.courseSubCategories];
    } else {
      return [];
    }
  };
  const extractAuthors = (course) => {
    if (Array.isArray(course.courseAuthors)) {
      return course.courseAuthors.map((subject) => subject.courseAuthorsName);
    } else if (typeof course.courseAuthors === "string") {
      return [course.courseAuthors];
    } else {
      return [];
    }
  };

  const handleYoutubeLinkChange = (event) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      youtubeLink: event.target.value,
    }));
  };
  const navigate = useNavigate();

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
    updatedTabs[index].name = newName; // Fix: Update the key to name
    setTabs(updatedTabs);
  };

  const updateTabContent = (index, newContent) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].content = newContent;
    setTabs(updatedTabs);
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

  // Use local state to keep track of the price and discountType
  const [localPrice, setLocalPrice] = useState(productInfo.price);
  const [localDiscountType, setLocalDiscountType] = useState(
    productInfo.discountType
  );

  // ...

  // Function to calculate and set the final price
  const calculateFinalPrice = () => {
    setProductInfo((prevProductInfo) => {
      const price = parseFloat(localPrice);
      const discountPrice = parseFloat(prevProductInfo.discountPrice) || 0; // Ensure it's a number
      let finalPrice;

      if (localDiscountType === "percentage") {
        finalPrice = price - (price * discountPrice) / 100;
      } else {
        finalPrice = price - discountPrice;
      }

      return {
        ...prevProductInfo,
        finalPrice: finalPrice.toFixed(2),
      };
    });
  };

  useEffect(() => {
    calculateFinalPrice();

    // Update the final price every second
    const interval = setInterval(calculateFinalPrice, 100000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [localPrice, productInfo.discountPrice, localDiscountType]);

  // Effect to update localPrice when productInfo.price changes
  useEffect(() => {
    setLocalPrice(productInfo.price);
  }, [productInfo.price]);

  // Effect to update localDiscountType when productInfo.discountType changes
  useEffect(() => {
    setLocalDiscountType(productInfo.discountType);
  }, [productInfo.discountType]);

  // ...

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

    const productData = {
      ...productInfoWithBooleanConversion,
      tabs: JSON.stringify(tabs),
    };

    const variantCombinationsString = JSON.stringify(
      productData.variantCombinations
    );

    // Create a new FormData
    const formData = new FormData();

    // Append productInfo fields to the FormData
    for (const key in productData) {
      if (key === "variantCombinations") {
        formData.append(key, variantCombinationsString);
      } else {
        formData.append(key, productData[key]);
      }
    }

    formData.append("combinations", JSON.stringify(productInfo.variantCombinations));
    formData.append("priceChange", JSON.stringify(tableData.map((item) => item.priceChange)));
    formData.append("excelDetails", JSON.stringify(tableData.map((item) => item.excelData)));


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
    return Promise.resolve();
  }
  const handleDiscountTypeChange = (value) => {
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      discountType: value,
    }));
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
    inputRef.current.click();
  };

  const handleVarChange = (value, sectionIndex, optionIndex) => {
    const updatedSections = [...variantSections];
    updatedSections[sectionIndex].options[optionIndex] = value;
    setVariantSections(updatedSections);
  };

  const handleAddVariant = () => {
    const updatedSections = [...variantSections];
    updatedSections.push({
      name: "",
      options: [""],
    });
    setVariantSections(updatedSections);
  };

  const handleRemoveVariant = (sectionIndex) => {
    const updatedSections = [...variantSections];
    updatedSections.splice(sectionIndex, 1);
    setVariantSections(updatedSections);
  };

  const handleAddOptions = (sectionIndex) => {
    const updatedSections = [...variantSections];
    if (updatedSections[sectionIndex].options.length < 8) {
      updatedSections[sectionIndex].options.push("");
      setVariantSections(updatedSections);
    }
  };

  const handleRemoveOptions = (sectionIndex, optionIndex) => {
    const updatedSections = [...variantSections];
    if (updatedSections[sectionIndex].options.length > 1) {
      updatedSections[sectionIndex].options.splice(optionIndex, 1);
      setVariantSections(updatedSections);
    }
  };

  const handleGenerateCombinations = () => {
    const combinations = variantSections.length
      ? generateCombinations(variantSections)
      : [];
    const newData = combinations.map((combination, index) => ({
      key: index,
      ...variantSections.reduce(
        (acc, section, i) => ({
          ...acc,
          [section.name]: combination[i],
        }),
        {}
      ),
      priceChange: "", // Default value for priceChange
      uploadExcel: "", // Default value for uploadExcel
    }));

    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      variantCombinations: newData.map((item) => ({ ...item, excelData: item.uploadExcel })),
    }));

    setTableData(newData);
  };

  const generateCombinations = (sections) => {
    return sections.reduce((acc, section) => {
      if (acc.length === 0) {
        return section.options.map((option) => [option]);
      } else {
        return acc.flatMap((combo) =>
          section.options.map((option) => [...combo, option])
        );
      }
    }, []);
  };

  const handlePriceChange = (key, value) => {

    const newData = tableData.map((item) =>
      item.key === key ? { ...item, priceChange: value } : item
    );
    setTableData(newData);
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      variantCombinations: prevProductInfo.variantCombinations.map((item) =>
        item.key === key ? { ...item, priceChange: value } : item
      ),
    }));

  };

  const uploadProps = (record) => ({
    name: "file",
    accept: ".xlsx, .xls",
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          // Parse the Excel file data
          const workbook = XLSX.read(e.target.result, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Extract data from the sheet
          const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          // update in variants
          setProductInfo((prevProductInfo) => ({
            ...prevProductInfo,
            variantCombinations: prevProductInfo.variantCombinations.map(
              (item) =>
                item.key === record.key
                  ? { ...item, uploadExcel: excelData }
                  : item
            ),
          }));

          // Update the data in your table or perform other operations
          const newData = tableData.map((item) =>
            item.key === record.key ? { ...item, excelData } : item
          );
          console.log("the uploded excel sheet data is " + newData);
          setTableData(newData);
          console.log(`the uploded excel sheet data after table data is set `);
          console.log(newData);
          message.success("File read successfully");
        } catch (error) {
          console.error("Error reading file:", error);
          message.error("Error reading file");
        }
      };

      reader.readAsBinaryString(file);

      // Prevent default upload behavior
      return false;
    },
  });

  const columns = variantSections.map((section) => ({
    title: section.name,
    dataIndex: section.name,
    key: section.name,
  }));

  columns.push(
    {
      title: "Price Change",
      dataIndex: "priceChange",
      key: "priceChange",
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handlePriceChange(record.key, e.target.value)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <Upload {...uploadProps(record)}>
            <Button
              icon={<UploadOutlined />}
              style={{ color: "green" }}
            ></Button>
          </Upload>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveRow(record.key)}
          />
        </div>
      ),
    }
  );

  const handleView = (record) => {
    // Set the viewData state with the keys for the specific record
    setViewData(record.excelData || []);
    setViewModalVisible(true);
  };

  const handleRemoveRow = (key) => {
    const newData = tableData.filter((item) => item.key !== key);
    setTableData(newData);
  };

  return (
    <body>
      <Sidebar />
      <div className="add-product-form">
        <h2>Add Product</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <Form.Item
            label="Product Title"
            name="productName"
            rules={[
              { required: true, message: "Please enter the product title!" },
            ]}
          >
            <Input onChange={handleProductNameChange} />
          </Form.Item>
          <Form.Item
            label="Product URL"
            required
            style={{ marginBottom: "16px" }}
          >
            <Input
              type="text"
              name="productUrl"
              value={productInfo.productUrl}
              onChange={handleChange}
              style={{ width: "99%" }}
            />
          </Form.Item>

          <Form.Item label="Product Description" required>
            <Input.TextArea
              id="htmlEditor"
              name="description"
              value={productInfo.description}
              onChange={(e) =>
                setProductInfo({ ...productInfo, description: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Detailed Title - SEO">
            <Input.TextArea
              name="productTitle"
              autoSize={{ minRows: 3, maxRows: 10 }}
            />
          </Form.Item>
          <div>
            <Form.Item label="MRP">
              <Input
                type="text"
                name="price"
                value={productInfo.price}
                onChange={handleChange}
                required
              />
            </Form.Item>

            <Form.Item label="Discount">
              <Input
                type="text"
                name="discountPrice"
                value={productInfo.discountPrice}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <div style={{ margin: "13px" }}>
              <label>Discount Type:</label>
              <Select
                name="discountType"
                value={productInfo.discountType}
                onChange={handleDiscountTypeChange}
                style={{ width: "98%", borderRadius: "13px" }}
                dropdownStyle={{ borderRadius: "8px" }}
              >
                <Select.Option value="normal">Normal</Select.Option>
                <Select.Option value="percentage">Percentage (%)</Select.Option>
              </Select>
            </div>

            <div className="flabel">
              <label>Final Price : </label>
              <span> Rs. </span>
              <span className="fprice" style={{ color: "#5E2BFF" }}>
                {productInfo.finalPrice}
              </span>
            </div>
          </div>
          <Form.Item label="Display MRP Text">
            <Input
              type="text"
              name="mrpText"
              value={productInfo.mrpText}
              onChange={handleChange}
              required
            />
          </Form.Item>

          <Form.Item label="Display Discount Text">
            <Input
              type="text"
              name="discountText"
              value={productInfo.discountText}
              onChange={handleChange}
              required
            />
          </Form.Item>

          <div>
            <label>Inventory</label>
            <Select
              defaultValue="Instock" // Set a default value if needed
              style={{ width: "97%", margin: "13px" }}
              onChange={(value) =>
                handleChange({ target: { name: "inventory", value } })
              }
            >
              <Option value="Instock">In Stock</Option>
              <Option value="OutofStock">Out of Stock</Option>
            </Select>
          </div>
          <Form.Item label="Rank">
            <InputNumber
              type="number"
              name="rank"
              value={productInfo.rank}
              onChange={(value) =>
                setProductInfo((prevProductInfo) => ({
                  ...prevProductInfo,
                  rank: value,
                }))
              }
              style={{ width: "100%" }}
              required
            />
          </Form.Item>
          <div>
            <div>
              <label>Course</label>
              <Select
                name="course"
                value={productInfo.course}
                onChange={handleCourseChange}
                style={{...selectStyle}}
                disabled={!courses.length} // Disable if there are no courses
              >
                
                {courses.map((course) => (
                  <Option key={course.id} value={course.courseName}>
                    {course.courseName}
                  </Option>
                ))}
              </Select>
            </div>


            <div>
              <label>Subjects</label>
              <Select
                name="subject"
                value={productInfo.subject}
                onChange={(value) =>
                  handleChange({ target: { name: "subject", value } })
                }
                mode="multiple" // Enable multi-select
                style={selectStyle} // Apply the common style
              >
                {/* Options for multi-select Subjects */}
                {subjects.map((courseSubjects) => (
                  <Option key={courseSubjects} value={courseSubjects}>
                    {courseSubjects}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <label>Categories</label>
              <Select
                name="category"
                value={productInfo.category}
                onChange={(value) =>
                  handleChange({ target: { name: "category", value } })
                }
                mode="multiple" // Enable multi-select
                style={selectStyle} // Apply the common style
              >
                {/* Options for multi-select Categories */}
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <label>Sub Categories</label>
              <Select
                name="subCategory"
                value={productInfo.subCategory}
                onChange={(value) =>
                  handleChange({ target: { name: "subCategory", value } })
                }
                mode="multiple" // Enable multi-select
                style={selectStyle} // Apply the common style
              >
                {/* Options for multi-select Sub Categories */}
                {subCategories.map((subCategory) => (
                  <Option key={subCategory} value={subCategory}>
                    {subCategory}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <label>Authors</label>
              <Select
                name="author"
                value={productInfo.author}
                onChange={(value) =>
                  handleChange({ target: { name: "author", value } })
                }
                mode="multiple" // Enable multi-select
                style={selectStyle} // Apply the common style
              >
                {/* Options for multi-select Authors */}
                {authors.map((author) => (
                  <Option key={author} value={author}>
                    {author}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <Form.Item label="Top Left Tag">
            <Input
              type="text"
              name="topLeft"
              value={productInfo.topLeft}
              onChange={handleChange}
              required
            />
          </Form.Item>

          <Form.Item label="Top Right Tag">
            <Input
              type="text"
              name="topRight"
              value={productInfo.topRight}
              onChange={handleChange}
              required
            />
          </Form.Item>

          <Form.Item label="Bottom Left Tag">
            <Input
              type="text"
              name="bottomLeft"
              value={productInfo.bottomLeft}
              onChange={handleChange}
              required
            />
          </Form.Item>

          <Form.Item label="Bottom Right Tag">
            <Input
              type="text"
              name="bottomRight"
              value={productInfo.bottomRight}
              onChange={handleChange}
              required
            />
          </Form.Item>
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
          <div className="ant-form-item">
            <label htmlFor="highlights">Product Highlights</label>
            <Input
              id="highlights"
              name="highlights"
              value={productInfo.highlights}
              onChange={handleChange}
              required
              prefix={<UserOutlined />}
              placeholder="Enter product highlights"
            />
          </div>

          <div className="ant-form-item">
            <label htmlFor="youtubeLink">YouTube Video Link:</label>
            <Input
              id="youtubeLink"
              name="youtubeLink"
              value={productInfo.youtubeLink}
              onChange={handleYoutubeLinkChange}
              prefix={<i className="fab fa-youtube" />}
              placeholder="Paste YouTube video link"
            />
          </div>

          <div className="ant-form-item">
            <label htmlFor="productDetails">Product Details</label>
            <Input
              id="productDetails"
              name="productDetails"
              value={productInfo.productDetails}
              onChange={handleChange}
              required
              prefix={<BarcodeOutlined />}
              placeholder="Enter product details"
            />
          </div>

          <div className="ant-form-item">
            <label htmlFor="facultyName">Faculty Name:</label>
            <Input
              id="facultyName"
              name="facultyName"
              value={productInfo.facultyName}
              onChange={handleChange}
              required
              prefix={<UserOutlined />}
              placeholder="Enter faculty name"
            />
          </div>

          <div className="ant-form-item">
            <label htmlFor="productID">Product ID (SKU):</label>
            <Input
              id="productID"
              name="productID"
              value={productInfo.productID}
              onChange={handleChange}
              required
              prefix={<BarcodeOutlined />}
              placeholder="Enter product ID (SKU)"
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
              <Checkbox
                name="isFranchise"
                checked={productInfo.isFranchise}
                onChange={handleChange}
                className="rdio"
              >
                Is Franchise
              </Checkbox>
              <Checkbox
                name="isWhatsapp"
                checked={productInfo.isWhatsapp}
                onChange={handleChange}
                className="rdio"
              >
                Broadcast To Whatsapp
              </Checkbox>
              <Checkbox
                name="priceUpdate"
                checked={productInfo.priceUpdate}
                onChange={handleChange}
                className="rdio"
              >
                Price Update
              </Checkbox>
              <Checkbox
                name="featured"
                checked={productInfo.featured}
                onChange={handleChange}
                className="rdio"
                style={{ margin: "18px" }}
              >
                Featured
              </Checkbox>
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

          <Space direction="vertical" style={{ width: "100%" }}>
            {variantSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Form.Item label={`Variant Name ${sectionIndex + 1}`}>
                    <Input
                      value={section.name}
                      onChange={(e) => {
                        const updatedSections = [...variantSections];
                        updatedSections[sectionIndex].name = e.target.value;
                        setVariantSections(updatedSections);
                      }}
                      style={{ width: "95%" }}
                    />
                  </Form.Item>
                  {section.options.map((value, optionIndex) => (
                    <div key={optionIndex}>
                      <Form.Item
                        label={`Variant Option ${optionIndex + 1}`}
                        name={`option_${sectionIndex}_${optionIndex}`}
                      >
                        <Input
                          value={value}
                          onChange={(e) =>
                            handleVarChange(
                              e.target.value,
                              sectionIndex,
                              optionIndex
                            )
                          }
                          style={{ width: "95%" }}
                        />
                        {optionIndex > 0 && (
                          <MinusOutlined
                            onClick={() =>
                              handleRemoveOptions(sectionIndex, optionIndex)
                            }
                            style={{ marginLeft: "10px", color: "red" }}
                          />
                        )}
                      </Form.Item>
                    </div>
                  ))}
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => handleAddOptions(sectionIndex)}
                  >
                    Add Option
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => handleRemoveVariant(sectionIndex)}
                  >
                    Remove Variant
                  </Button>
                </Space>
              </div>
            ))}
            <Button className="btn-10" onClick={handleAddVariant}>
              + Add Variant
            </Button>
          </Space>

          <div className="variantTable">
            <Button className="btn-10" onClick={handleGenerateCombinations}>
              Generate Combinations
            </Button>
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={false}
              style={{ width: "100vw" }}
            />
          </div>
          <Modal
            title="View Keys"
            visible={viewModalVisible}
            onCancel={() => setViewModalVisible(false)}
            footer={null}
          >
            <Table
              dataSource={viewData.map((key, index) => ({
                key: index,
                value: key,
              }))}
              columns={[
                { title: "Index", dataIndex: "key", key: "key" },
                { title: "Keys", dataIndex: "value", key: "value" },
              ]}
              pagination={false}
            />
          </Modal>

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

        <h3>Step 5: Submit Your Product</h3>
        <p>
          1. Finally, click the "Add Product" button at the end of the form to
          submit your product.
        </p>
      </div>
    </body>
  );
}
