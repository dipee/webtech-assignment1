import React, { useState, useContext } from 'react';
import { useUser } from '../context/UserContext';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Bill from '../components/Bill';

const CheckOut = () => {
  const { userDetails } = useUser();
  const navigate = useNavigate();
  const { cartItems,removeAllFromCart } = useContext(ShopContext);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    setShowAlert(true);
    setCardDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
    removeAllFromCart();
    setTimeout(() => {
      setShowAlert(false);
      navigate('/');
    }, 2000);
  };


  return (
    <div className="row px-3">
      <div className="col-md-6">
        {/* User Details and Product Purchase Details */}
        {userDetails.name && (
          <div className="card mb-3 text-start">
            <div className="card-body">
              <h5 className="card-title">User Details</h5>
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
            </div>
          </div>
        )}
        <div className="card mb-3 text-start">
          <div className="card-body">
            <h5 className="card-title">Product Purchase Details</h5>
            <ul className="list-group">
        {Object.entries(cartItems).map(([id, data]) => (
          <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
              <img src={data[1].image} alt="" style={{width: 30, height: 30, marginRight: 5}}/>
              {data[1].name} (${data[1].price})
              </div>
              <div>
              <span className="mx-2">{data[0]}</span>
            </div>
          </li>
        ))}
      </ul>
      {<Bill />}
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
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
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
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
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
                <label htmlFor="cvv" className="form-label">CVV</label>
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
              <button type="submit" className="btn btn-primary">Process Payment</button>
            </form>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="alert alert-success" role="alert" style={{ position: 'fixed', top: '50px', right: '10px', zIndex: '9999', width: '300px' }}>
          Payment successful!
        </div>
      )}
    </div>
  );
}

export default CheckOut;
