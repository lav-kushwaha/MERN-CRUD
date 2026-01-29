import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  let isAuthenticated = false; // example

  return (
    <header className="w-full bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-600"
        >
          MyApp
        </Link>

        <div className="space-x-4">
          {isAuthenticated ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;