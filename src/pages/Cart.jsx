import React, { useEffect, useState } from "react";
import Bill from "../components/Bill";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  saveCart,
  decreaseQtyFromCart,
  removeItemFromCart,
} from "../services/cartService";
import { useUser } from "../context/UserContext";
import { useShop } from "../context/ShopContext";

const Cart = () => {
  const { userDetails } = useUser();
  const [allCartItems, setAllCartItems] = useState(null);
  const navigate = useNavigate();
  const { setCartItems } = useShop();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(userDetails.userId);
        if (data.length > 0) {
          const mappedCartItems = data.map((cartItem) => {
            return {
              _id: cartItem._id,
              userId: cartItem.userId,
              products: cartItem.products.map((product) => {
                return {
                  productId: product.productId,
                  quantity: product.quantity,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  _id: product._id,
                };
              }),
            };
          });
          setAllCartItems(mappedCartItems[0]);
        } else {
          setAllCartItems(null);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
    setCartItems(allCartItems);
  }, [userDetails.userId]);

  const addQuantity = (product) => {
    saveCart(userDetails.userId, product, 1);
  };

  const subtractQuantity = (cartId, productId) => {
    decreaseQtyFromCart(cartId, productId);
  };

  const removeFromCart = (cartId, productId) => {
    removeItemFromCart(cartId, productId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mt-3">
      {allCartItems ? (
        <>
          <h2 className="text-start">Shopping Cart</h2>
          <ul className="list-group">
            {allCartItems.products.map((product) => (
              <li
                key={product.productId}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: 30, height: 30, marginRight: 5 }}
                  />
                  {product.name} (${product.price})
                </div>
                <div>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() =>
                      subtractQuantity(allCartItems._id, product.productId)
                    }
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => addQuantity(product)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() =>
                      removeFromCart(allCartItems._id, product.productId)
                    }
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Bill />
          <button
            className="btn btn-primary btn-sm ms-2 my-2"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      ) : (
        <h2>No items in cart</h2>
      )}
    </div>
  );
};

export default Cart;
