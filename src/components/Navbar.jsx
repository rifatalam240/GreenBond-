import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/Authcontext";
import { PiTreePalmFill } from "react-icons/pi";

const AllLinks = () => {
  const { user } = useAuth();
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/explore">Explores Gardeners</NavLink>
      </li>
      <li>
        <NavLink to="/allitems">All Items</NavLink>
      </li>
      <li>
        <NavLink to="/tips">Browse Tips</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/sharetips">Share a Garden Tip</NavLink>
          </li>
          <li>
            <NavLink to="/mytips">My Tips</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );
};

const Navbar = () => {
  const { user, signoutuser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSignout = () => {
    signoutuser()
      .then(() => {
        // navigate("/");
      })
      .catch((error) => console.error("Logout error", error));
  };

  // Theme-based classes
  const navbarBg =
    theme === "dark"
      ? "bg-[#1a2634] text-white border-b border-[#263040]"
      : "bg-[#f8fafc] text-[#03464D] border-b border-green-100";
  const menuBg =
    theme === "dark"
      ? "bg-[#232f3e] text-white"
      : "bg-base-100 text-[#03464D]";
  const dropdownBg =
    theme === "dark"
      ? "bg-[#232f3e] text-white"
      : "bg-base-100 text-[#03464D]";

  return (
    <div className={`navbar fixed top-0 left-0 w-full z-50 shadow-sm transition-colors duration-300 ${navbarBg}`}>
      <div className="navbar-start pr-4 ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 md:h-5 md:w-5 lg:h-6 lg:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow ${dropdownBg}`}
          >
            <AllLinks user={user} />
          </ul>
        </div>
        <div className="flex justify-center items-center btn-ghost text-xl lg:text-2xl mr-8 font-bold gap-2">
          <PiTreePalmFill className="text-green-800" />
          <Logo />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className={`menu menu-horizontal px-1 ${menuBg}`}>
          <AllLinks />
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        <button
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-gray-700 text-xl" />
          )}
        </button>

        {/* Authentication */}
        {!user ? (
          <>
            <NavLink
              to="/login"
              className={`btn ${theme === "dark" ? "bg-green-800 text-white border-none" : "bg-green-900 text-white"} `}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={`btn btn-outline ${theme === "dark" ? "hover:bg-green-800 hover:text-white border-green-700" : "hover:bg-green-900 hover:text-white"}`}
            >
              Sign Up
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/S0Q3G6G/default-user.png"
                  }
                  alt="User"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 ${dropdownBg}`}
            >
              <li className="text-sm px-2 py-1 text-gray-600 dark:text-gray-200">
                👤 {user?.displayName || "User"}
              </li>
              <li>
                <button
                  onClick={handleSignout}
                  className="text-red-600 hover:text-white hover:bg-red-500 flex items-center gap-2 px-3 py-1 rounded"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
