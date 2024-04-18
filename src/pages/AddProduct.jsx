import React, { useState } from "react";
import { saveProduct } from "../services/productService";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    shippingCost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProduct(formData);
  };

  return (
    <div className="container">
      <h2 className="my-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="price" className="col-sm-2 col-form-label">
            Price:
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Description:
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="image" className="col-sm-2 col-form-label">
            Image URL:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="shippingCost" className="col-sm-2 col-form-label">
            Shipping Cost:
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="shippingCost"
              name="shippingCost"
              value={formData.shippingCost}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
