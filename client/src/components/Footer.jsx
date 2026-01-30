import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Left */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
            Privacy
          </span>
          <span className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
            Terms
          </span>
          <span className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;