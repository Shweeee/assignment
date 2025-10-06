import React from "react";

export default function Header({ onCreate }) {
  return (
    <header className="bg-white shadow-sm py-3 px-6 flex items-center justify-between rounded-full mt-4 mx-auto max-w-6xl">
      {/* Left Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
          D
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-purple-600">Home</a>
          <a href="#" className="hover:text-purple-600">Find Jobs</a>
          <a href="#" className="hover:text-purple-600">Find Talents</a>
          <a href="#" className="hover:text-purple-600">About us</a>
          <a href="#" className="hover:text-purple-600">Testimonials</a>
        </nav>
      </div>

      {/* Right Button */}
      <button
        onClick={onCreate}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-5 py-2 rounded-full hover:opacity-90 transition"
      >
        Create Jobs
      </button>
    </header>
  );
}
