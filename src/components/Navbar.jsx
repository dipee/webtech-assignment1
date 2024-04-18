import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/UserContext";
import { useShop } from "../context/ShopContext";

function Navbar() {
  const { authenticated, logout } = useUser();
  const { totalQuantity } = useShop();
  return (
    <nav className="navbar navbar-expand sticky-top bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand font-bold" to="/">
          D-Shop
        </Link>
        <ul className="navbar-nav ms-auto">
          {authenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  <FontAwesomeIcon icon={faUser} /> User
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} /> Cart
                  {totalQuantity > 0 && ( // Only show quantity if it's greater than 0
                    <span className="badge bg-secondary ms-1">{totalQuantity}</span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
