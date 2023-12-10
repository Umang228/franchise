import React, { useState, useEffect } from 'react';
import { Card, Input, Select, Spin, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './admin/Navbar';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const ProductsAll = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    axios.get('http://localhost:8081/admin/products').then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    });
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterProducts(value, selectedFilter);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    filterProducts(searchTerm, value);
  };

  const filterProducts = (search, filter) => {
    let filtered = [...products];

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(lowerSearch) ||
          product.facultyName.toLowerCase().includes(lowerSearch)
      );
    }

    if (filter) {
      filtered = filtered.filter(
        (product) =>
          product.productType === filter ||
          product.course === filter ||  // Added filter for courses
          product.author === filter    // Added filter for authors
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when applying filters
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '22%', padding: '20px', backgroundColor: '#fff', boxShadow: '1px 1px 4px lightgray', height: '100vh', position: 'fixed' }}>
          <Search placeholder="Search products" onSearch={handleSearch} enterButton />
          <Select
            style={{ width: '100%', marginTop: '10px' }}
            placeholder="Filter by type, course, or author"
            onChange={handleFilterChange}
          >
            <Option value="">All Types</Option>
            <Option value="Combo">Combo</Option>
            <Option value="Type2">Type 2</Option>
            {/* Add more options based on your product types */}
          </Select>
          <Select
            style={{ width: '100%', marginTop: '10px' }}
            placeholder="Filter by course"
            onChange={handleFilterChange}
          >
            <Option value="">All Courses</Option>
            <Option value="CA Final">CA Final</Option>
            {/* Add more course options based on your data */}
          </Select>
          <Select
            style={{ width: '100%', marginTop: '10px' }}
            placeholder="Filter by author"
            onChange={handleFilterChange}
          >
            <Option value="">All Authors</Option>
            <Option value="Atul Aggarwal">Atul Aggarwal</Option>
            {/* Add more author options based on your data */}
          </Select>
          {/* Add more filters as needed */}
          {/* <Select ...> ... </Select> */}
        </div>

        {/* Product Cards */}
        <div style={{ flex: 1, padding: '20px', marginLeft: '22%' }}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {currentProducts.map((product) => (
                <Link key={product.id} to={`/admin/products/view/${product.id}`}>
                  <Card
                    style={{ width: 300, marginBottom: 20 }}
                    cover={<img alt={product.productName} src={product.image.split(',')[0]} />}
                  >
                    <Meta title={product.productName} description={product.facultyName} />
                  </Card>
                </Link>
              ))}
            </div>
          )}
          <Pagination
            style={{ marginTop: '20px', textAlign: 'center' }}
            current={currentPage}
            total={filteredProducts.length}
            pageSize={productsPerPage}
            onChange={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsAll;
