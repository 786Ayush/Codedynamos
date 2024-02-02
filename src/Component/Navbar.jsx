import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const LinksList = () => (
    <div className="md:hidden absolute top-16 right-0 p-4 bg-[var(--nav-color)] w-full z-50">
      <ul>
        <li className="w-full hover:bg-zinc-600 rounded text-center">
          <Link to="/" className="text-white  ">
            Home
          </Link>
        </li>
        <li className="w-full hover:bg-zinc-600 rounded text-center">
          <Link to="/about" className="text-white ">
            About us
          </Link>
        </li>
        <li className="w-full hover:bg-zinc-600 rounded text-center">
          <Link to="/internship" className="text-white ">
            Internship domains
          </Link>
        </li>
        <li className="w-full hover:bg-zinc-600 rounded text-center">
          <Link to="/roadmap" className="text-white">
            Roadmap
          </Link>
        </li>
        <li className="w-full hover:bg-zinc-600 rounded text-center">
          <Link to="/contact" className="text-white">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav
      className={`relative flex justify-around items-center text-white z-50`}
      style={{ backgroundColor: "var(--nav-color)" }}
    >
      {/* Logo on the left */}
      <div className="flex items-center">
        <img src="/Logo.png" alt="Logo" className="h-16 w-16 mr-2" />
        {/* <span className="text-xl font-bold">YourLogo</span> */}
      </div>

      {/* Buttons in the center (visible on larger screens) */}
      <div className={`hidden md:flex gap-4 ${showLinks ? "flex" : "hidden"}`}>
        <Link
          to="/"
          className="text-white px-4 py-2 hover:bg-zinc-600 rounded"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white px-4 py-2 hover:bg-zinc-600 rounded"
        >
          About us
        </Link>
        <Link
          to="/internship"
          className="text-white px-4 py-2 hover:bg-zinc-600 rounded"
        >
          Internship domains
        </Link>
        <Link
          to="/roadmap"
          className="text-white px-4 py-2 hover:bg-zinc-600 rounded"
        >
          Roadmap
        </Link>
        <Link
          to="/contact"
          className="text-white px-4 py-2 hover:bg-zinc-600 rounded"
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center">
        {/* Login button on the right */}
        <div>
          <Link
            to="/login"
            className="text-white px-4 py-2 rounded m-2"
            style={{ backgroundColor: "var(--button)" }}
          >
            Login
          </Link>
        </div>
        {/* Button to show/hide links on smaller screens */}
        <div className="md:hidden">
          <button onClick={toggleLinks} className="text-white">
            {showLinks ? <IoClose size={30} /> : <IoMenu size={30} />}
          </button>
          {showLinks && <LinksList />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
