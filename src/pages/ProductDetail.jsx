import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/productsData";
import { ShopContext } from "../context/ShopContext";

function ProductDetail() {
  const { addToCart } = useContext(ShopContext);
  const { productID } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const productFound = products.find(
      (product) => product._id.toString() === productID
    );
    setProduct(productFound);
  }, [productID]);
  useEffect(() => {
    fetch(`http://localhost:3001/products/${productID}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <strong>Price:</strong> ${product.price}
              </p>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
