import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import User from "./pages/User";
import Cart from "./pages/Cart";
import { UserProvider } from "./context/UserContext";
import { ShopContextProvider } from "./context/ShopContext";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckOut from "./pages/CheckOut";
import Order from "./pages/Orders";

import AddProductForm from "./pages/AddProduct";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/product/:productID" element={<ProductDetail />} />
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckOut />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {
                <Route
                  path="/addproduct"
                  element={
                    <ProtectedRoute>
                      <AddProductForm />
                    </ProtectedRoute>
                  }
                />
              }
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Router>
        </ShopContextProvider>
      </UserProvider>
    </div>
  );
}

export default App;
