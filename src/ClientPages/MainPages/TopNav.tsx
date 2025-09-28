import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";

export default function TopNav() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white hover:text-blue-100 transition"
        >
          Trezo
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-8">
          <Link
            to="/"
            className="text-lg font-medium text-white hover:text-blue-200 transition"
          >
            Home
          </Link>
          <Link
            to="/clubs"
            className="text-lg font-medium text-white hover:text-blue-200 transition"
          >
            Clubs
          </Link>
          <Link
            to="/events"
            className="text-lg font-medium text-white hover:text-blue-200 transition"
          >
            Events
          </Link>
        </div>

        {/* Burger Menu Button (Mobile) */}
        <button
          className="sm:hidden text-2xl text-white"
          onClick={() => setBurgerOpen(!burgerOpen)}
        >
          {burgerOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {burgerOpen && (
        <div className="sm:hidden bg-blue-500 shadow-md">
          <Link
            to="/"
            onClick={() => setBurgerOpen(false)}
            className="block px-6 py-3 text-white font-medium hover:bg-blue-400 hover:text-white transition"
          >
            Home
          </Link>
          <Link
            to="/clubs"
            onClick={() => setBurgerOpen(false)}
            className="block px-6 py-3 text-white font-medium hover:bg-blue-400 hover:text-white transition"
          >
            Clubs
          </Link>
          <Link
            to="/events"
            onClick={() => setBurgerOpen(false)}
            className="block px-6 py-3 text-white font-medium hover:bg-blue-400 hover:text-white transition"
          >
            Events
          </Link>
        </div>
      )}
    </nav>
  );
}
