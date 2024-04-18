import React from "react";
import { getOrders } from "../services/orderService";
import { useUser } from "../context/UserContext";

const Order = () => {
  const [orders, setOrders] = React.useState([]);
  const { userDetails } = useUser();

  React.useEffect(() => {
    getOrders(userDetails.userId).then((data) => {
      setOrders(data);
    });
  }, []);

  return (
    <div className="order-list">
      <h3>Order List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>

            <th>Total Price</th>
            <th>Total Tax</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>${order.totalPrice}</td>
              <td>${order.totalTax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
