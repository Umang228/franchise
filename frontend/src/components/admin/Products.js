import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { AiFillEdit, AiFillDelete, AiFillEye } from 'react-icons/ai';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
export default function Products() {
  const [products, setProducts] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Function to fetch product data from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admin/products');
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value); // Update the search text
  };
  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
      product.facultyName.toLowerCase().includes(searchText.toLowerCase()) ||
      product.course.toLowerCase().includes(searchText.toLowerCase()) ||
      product.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      product.deliveryType.toLowerCase().includes(searchText.toLowerCase())
  );
  // Function to open the confirmation dialog for deletion
  const handleOpenConfirmationDialog = (id) => {
    setDeleteProductId(id);
    setShowConfirmationDialog(true);
  };

  // Function to close the confirmation dialog
  const handleCloseConfirmationDialog = () => {
    setDeleteProductId(null);
    setShowConfirmationDialog(false);
  };

  // Function to handle delete button click
  const handleDeleteClick = async () => {
    if (deleteProductId) {
      try {
        console.log(`Deleting product with ID: ${deleteProductId}`);

        const response = await axios.delete(`http://localhost:8081/admin/products/${deleteProductId}`);
        console.log('Delete response:', response);

        if (response.status === 200) {
          // Update the state of the products array
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== deleteProductId)
          );
          console.log('Product deleted successfully');
          setShowSuccessMessage(true);

          // Close the confirmation dialog
          handleCloseConfirmationDialog();

          // Hide the success message after 3 seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);

          // Soft reload by navigating to the current location
          navigate(navigate('/admin/products'));
        } else {
          console.log('Delete request did not return a success status:', response.status);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'productName', headerName: 'Product Name', flex: 1 },
    { field: 'facultyName', headerName: 'Faculty Name', flex: 1 },
    { field: 'course', headerName: 'Course', flex: 1 },
    { field: 'subject', headerName: 'Subject', flex: 1 },
    { field: 'deliveryType', headerName: 'Delivery Type', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="action">
          <button
            onClick={() => navigate(`/admin/products/edit/${params.row.id}`)}
            className="edit"
            style={{ marginLeft: '-18px' }}
          >
            <AiFillEdit />
          </button>
          <button
            onClick={() => handleOpenConfirmationDialog(params.row.id)}
            className="delete"
            style={{ marginLeft: '-18px' }}
          >
            <AiFillDelete />
          </button>
          <button
            style={{ marginLeft: '-18px', color: '#50C878' }}
            onClick={() => navigate(`/admin/products/view/${params.row.id}`)}
          >
            <AiFillEye />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="prod">
      <Sidebar />
      <div className="child-prod">

        <div className="topBar">
          <h1>Products</h1>
          <button className='btn-10' onClick={() => navigate(`add`)}>
            + Add Product
          </button>
        </div>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          className='searchField'
          style={{ margin: '10px' }}
        />
        <div style={{ height:'100%', width: '93%', marginLeft: '42px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={4}
            components={{
              Toolbar: CustomToolbar,
            }}
            disableSelectionOnClick
            onSelectionModelChange={(ids) => console.log(ids)}
          />
        </div>

        {showConfirmationDialog && (
          <div className="confirmation-dialog">
            <p>Are you sure you want to delete this product?</p>
            <button onClick={handleCloseConfirmationDialog}>Cancel</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        )}

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">Product deleted successfully.</div>
        )}
      </div>
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar
      components={{
        ColumnsPanel: CustomColumnsPanel,
        FiltersPanel: CustomFiltersPanel,
        DensitySelector: CustomDensitySelector,
        ExportButton: CustomExportButton,
      }}
    />
  );
};

const CustomColumnsPanel = () => {
  return (
    <div style={{ padding: '16px' }}>
      {/* Your custom columns panel content goes here */}
      <p>Custom Columns Panel</p>
    </div>
  );
};

const CustomFiltersPanel = () => {
  return (
    <div style={{ padding: '16px' }}>
      {/* Your custom filters panel content goes here */}
      <p>Custom Filters Panel</p>
    </div>
  );
};

const CustomDensitySelector = () => {
  return (
    <div style={{ padding: '16px' }}>
      {/* Your custom density selector content goes here */}
      <p>Custom Density Selector</p>
    </div>
  );
};

const CustomExportButton = () => {
  return (
    <div style={{ padding: '16px' }}>
      {/* Your custom export button content goes here */}
      <p>Custom Export Button</p>
    </div>
  );
};
