import React, { useState, useContext } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Bill from "../components/Bill";

import { useShop } from "../context/ShopContext";

import { saveOrder } from "../services/orderService";
import { savePayment } from "../services/paymentService";

const CheckOut = () => {
  const { userDetails } = useUser();
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const { cartItems } = useShop();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setShowAlert(true);
    await saveOrder(getOrderData());

    await savePayment({
      userId: userDetails.userId,
      creditCardNumber: cardDetails.cardNumber,
      expirationDate: cardDetails.expiryDate,
      cvv: cardDetails.cvv,
    });

    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });

    setTimeout(() => {
      setShowAlert(false);
      navigate("/");
    }, 2000);
  };

  const getOrderData = () => {
    return {
      userId: userDetails.userId,
      totalPrice: cartItems.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
      totalTax: cartItems.reduce(
        (acc, product) => acc + product.price * product.quantity * 0.1,
        0
      ),
      products: cartItems.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      })),
    };
  };

  return (
    <div className="row px-3">
      <div className="col-md-6">
        {/* User Details and Product Purchase Details */}
        {userDetails.name && (
          <div className="card mb-3 text-start">
            <div className="card-body">
              <h5 className="card-title">User Details</h5>
              <p>
                <strong>Name:</strong> {userDetails.name}
              </p>
              <p>
                <strong>Address:</strong> {userDetails.address}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
            </div>
          </div>
        )}
        <div className="card mb-3 text-start">
          <div className="card-body">
            <h5 className="card-title">Product Purchase Details</h5>
            <ul className="list-group">
              {cartItems.map((cart) => (
                <li
                  key={cart.productId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <img
                      src={cart.image}
                      alt=""
                      style={{ width: 30, height: 30, marginRight: 5 }}
                    />
                    {cart.name} (${cart.price})
                  </div>
                  <div>
                    <span className="mx-2">{cart.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Bill cartItems={{ products: cartItems }} />
          </div>
        </div>
      </div>
      <div className="col-md-6">
        {/* Payment Process */}
        <div className="card mb-3 text-start">
          <div className="card-body">
            <h5 className="card-title">Payment Process</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Process Payment
              </button>
            </form>
          </div>
        </div>
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
            width: "300px",
          }}
        >
          Payment successful!
        </div>
      )}
    </div>
  );
};

export default CheckOut;
