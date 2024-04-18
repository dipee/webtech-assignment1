import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const taxRate = 0.13;

const Bill = ({ cartItems }) => {
  //get products from cartItems
  const products = cartItems?.products;
  //calculate subtotal
  const subtotal = products?.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  //calculate tax

  const tax = subtotal * taxRate;
  //calculate grand total
  const grandTotal = subtotal + tax;

  return (
    <div className="mt-3">
      <ul className="list-group">
        <li className="list-group-item">Subtotal: ${subtotal?.toFixed(2)}</li>
        <li className="list-group-item">Tax (10%): ${tax?.toFixed(2)}</li>
        <li className="list-group-item">
          Grand Total: ${grandTotal?.toFixed(2)}
        </li>
      </ul>
    </div>
  );
};

export default Bill;
