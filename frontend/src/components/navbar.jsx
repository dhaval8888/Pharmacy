import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4004/user/logout", {
        method: "GET",
        credentials: "include", // if you're using cookies
      });

      // Clear localStorage or token
      localStorage.removeItem("jwt");

      // Update state
      setIsLoggedIn(false);

      // Redirect to home or login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-8 py-4 sticky top-0 z-50">
      <div className="text-2xl font-bold text-purple-600">
        <Link to="/">MEDIPOLIS</Link>
      </div>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
        </li>
        <li>
          <Link to="/doctor" className="hover:text-purple-600 transition">Doctor</Link>
        </li>
        <li>
          <Link to="/medicine" className="hover:text-purple-600 transition">Medicine</Link>
        </li>
        <li>
          <Link to="/order" className="hover:text-purple-600 transition">My Orders</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-purple-600 transition flex items-center">
            <ShoppingCart className="w-5 h-5 mr-1" />
            Cart
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-md shadow hover:from-purple-500 hover:to-purple-700 transition">
                Login
              </button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
