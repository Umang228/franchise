import React from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const LivePreviewPage = ({ productInfo, imagePreview }) => {
  const images = imagePreview.map((preview, index) => ({
    original: preview,
    thumbnail: preview,
    description: `Image Preview ${index}`,
  }));

  return (
    <div>
      <h2>{productInfo.productName}</h2>
      <label>Images:</label>
      <div className="product-imgs-slider">
        <ReactImageGallery items={images} />
      </div>
      {/* Include other details as needed */}
    </div>
  );
};

export default LivePreviewPage;
