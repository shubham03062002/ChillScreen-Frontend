// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Links based on login state
  const navLinks = isLoggedIn
    ? [
        { name: "Home", path: "/" },
        { name: "My Watchlist", path: "/watchlist" },
        { name: "Favourites", path: "/favourites" },
        { name: "Profile", path: "/profile" },

        { name: "Logout", action: handleLogout },
      ]
    : [
        { name: "Login", path: "/login" },
        { name: "Signup", path: "/signup" },
      ];

  return (
    <nav className="bg-gradient-to-r from-pink-200 via-pink-300 to-pink-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ChillScreen" className="h-10 w-auto drop-shadow-md" />
            <div className="chill-screen-logo text-xl">
              <span className="chill text-4xl">Chill</span>
              <span className="screen text-4xl">Screen</span>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden text-pink-700 hover:text-pink-900 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) =>
            link.action ? (
              <button
                key={link.name}
                onClick={link.action}
                className="text-lg font-medium text-pink-700 hover:text-pink-900 transition-all duration-300"
              >
                {link.name}
              </button>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-lg font-medium transition-all duration-300 ease-in-out 
                  hover:text-pink-900 ${
                    isActive ? "text-pink-900 after:w-full" : "text-pink-700 after:w-0"
                  } 
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-pink-900 after:transition-all after:duration-300`
                }
              >
                {link.name}
              </NavLink>
            )
          )}
        </div>

        {/* Mobile Links */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-pink-100 shadow-lg">
            <div className="flex flex-col items-start p-4 space-y-2">
              {navLinks.map((link) =>
                link.action ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      link.action();
                      toggleMenu();
                    }}
                    className="w-full text-left text-lg font-medium text-pink-700 hover:bg-pink-100 p-2 rounded-md"
                  >
                    {link.name}
                  </button>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-lg font-medium transition-all duration-300 ease-in-out w-full p-2 rounded-md 
                      ${
                        isActive
                          ? "text-pink-900 bg-pink-200"
                          : "text-pink-700 hover:bg-pink-100"
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </NavLink>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
