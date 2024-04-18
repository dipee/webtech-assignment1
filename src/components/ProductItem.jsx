import React, { useContext, useState } from "react";
import { useShop } from "../context/ShopContext";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { saveCart } from "../services/cartService";

function ProductItem({ product }) {
  const { userDetails } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { setCartItems } = useShop();

  const handleAddToCart = () => {
    if (!userDetails) {
      navigate("/login");
    }
    product.productId = product._id;
    saveCart(userDetails.userId, product, 1);
    setShowAlert(true);

    console.log("Product added to cart", product);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="card product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className="card-img-top product-image"
          alt={product.name}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text description">
          {product.description.substring(0, 50)}
          {product.description.length > 50 ? "..." : ""}
        </p>
        <p className="card-text">Price: ${product.price}</p>
        <button onClick={handleAddToCart} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
      {showAlert && (
        <div
          className="alert alert-success"
          role="alert"
          style={{
            position: "fixed",
            top: "50px",
            right: "10px",
            zIndex: "9999",
          }}
        >
          Product added to cart!
        </div>
      )}
    </div>
  );
}

export default ProductItem;
