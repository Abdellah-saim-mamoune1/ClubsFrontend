import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../Slices/Hooks";
import { User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ClearClientInfo } from "../../Slices/ClientSlices/ClientInfoSlice";


export default function TopNav() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const IsLoggedIn = useAppSelector((s) => s.ClientInfoSlice.IsLoogedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
   dispatch(ClearClientInfo());
    navigate("/"); 

  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-800 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white hover:text-blue-200 transition"
        >
          Trezo
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-6">
          <NavLink to="/" label="Home" />
          <NavLink to="/clubs" label="Clubs" />
          <NavLink to="/events" label="Events" />

          {/* Right section */}
          {IsLoggedIn ? (
            <>
              <Link to="/account" className="ml-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition">
                  <User className="w-6 h-6 text-white" />
                </div>
              </Link>
              <button
                onClick={handleSignOut}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="ml-4 px-4 py-2 bg-white text-blue-800 rounded-lg font-medium hover:bg-blue-100 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Burger Menu Button (Mobile) */}
        <button
          className="sm:hidden text-2xl text-white focus:outline-none"
          onClick={() => setBurgerOpen(!burgerOpen)}
        >
          {burgerOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {burgerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden bg-blue-800 shadow-md rounded-b-lg"
          >
            <NavLinkMobile
              to="/"
              label="Home"
              onClick={() => setBurgerOpen(false)}
            />
            <NavLinkMobile
              to="/clubs"
              label="Clubs"
              onClick={() => setBurgerOpen(false)}
            />
            <NavLinkMobile
              to="/events"
              label="Events"
              onClick={() => setBurgerOpen(false)}
            />

            {IsLoggedIn ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setBurgerOpen(false)}
                  className="flex items-center gap-3 px-6 py-3 text-white hover:bg-blue-500 transition"
                >
                  <User className="w-5 h-5" /> Profile
                </Link>

                <button
                  onClick={() => {
                    handleSignOut();
                    setBurgerOpen(false);
                  }}
                  className="block w-full text-left px-6 py-3 text-red-400 hover:bg-red-600 hover:text-white transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setBurgerOpen(false)}
                className="block px-6 py-3 text-white font-medium hover:bg-blue-500 transition"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* 🔹 Reusable link components for cleaner code */
function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="text-lg font-medium text-white hover:text-blue-200 transition"
    >
      {label}
    </Link>
  );
}

function NavLinkMobile({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-6 py-3 text-white font-medium hover:bg-blue-500 transition"
    >
      {label}
    </Link>
  );
}
