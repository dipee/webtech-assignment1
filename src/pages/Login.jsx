import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const { login, authenticated } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => login(data))
      .catch((error) => {
        console.error("Error:", error);
        setError("Invalid email or password");
      });

    setRedirect(true); // Set the redirect state to true
  };

  useEffect(() => {
    if (authenticated) {
      setRedirect(true); // Set the redirect state to true
    }
  }, [authenticated]);
  // If redirect state is true, navigate to the homepage
  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group row my-3">
                  <label htmlFor="email" className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row my-3">
                  <label htmlFor="password" className="col-sm-3 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-primary btn-block">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-center">
                <p className="mb-0">Don't have an account?</p>
                <p className="mb-0">
                  Register <Link to="/register">here</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
