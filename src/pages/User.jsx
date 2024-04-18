import React from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
const UserPage = () => {
  const { userDetails } = useUser();
  console.log(userDetails);
  return (
    <div className="container mt-3">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          {/* User Information */}
          <h2 className="card-title text-center my-3">User Information</h2>
          <div className="card">
            <div className="card-body">
              <div>
                <p className="text-start">
                  <strong>Name:</strong> {userDetails.name}
                </p>
                <p className="text-start">
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p className="text-start">
                  <strong>Address:</strong> {userDetails.address}
                </p>
              </div>
            </div>
          </div>
          <Link to={"/orders"}>
            <button className="btn btn-success my-3">My Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
