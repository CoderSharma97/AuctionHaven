import React, { useState, useEffect, useRef } from "react";
import { RiAuctionLine, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import {
  BsTrophyFill,
  BsFillInfoSquareFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaUserCircle,
  FaFileInvoiceDollar,
  FaEye,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { SiGooglesearchconsole } from "react-icons/si";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const drawerRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (path) => {
    setShow(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-custom-primary text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden z-10"
      >
        <GiHamburgerMenu />
      </div>

      <div
        ref={drawerRef}
        className={`w-full sm:w-[300px] bg-gradient-to-r from-[#f6f4f0] to-[#ffffff] h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-transform duration-300 p-6 flex flex-col justify-between lg:left-0 border-r border-gray-200 shadow-lg rounded-r-lg z-10`}
      >
        <div className="relative">
          <h4
            className="text-3xl font-bold text-custom-primary mb-4 cursor-pointer"
            onClick={() => handleLinkClick("/")}
          >
            Auction<span className="text-custom-hover">Haven</span>
          </h4>

          <ul className="flex flex-col gap-4">
            <li onClick={() => handleLinkClick("/auctions")}>
              <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                <RiAuctionLine className="text-2xl mr-2" /> Auctions
              </span>
            </li>
            <li onClick={() => handleLinkClick("/leaderboard")}>
              <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                <BsTrophyFill className="text-2xl mr-2" /> Leaderboard
              </span>
            </li>
            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li onClick={() => handleLinkClick("/submit-commission")}>
                  <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                    <FaFileInvoiceDollar className="text-2xl mr-2" /> Submit
                    Commission
                  </span>
                </li>
                <li onClick={() => handleLinkClick("/create-auction")}>
                  <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                    <IoIosCreate className="text-2xl mr-2" /> Create Auction
                  </span>
                </li>
                <li onClick={() => handleLinkClick("/view-my-auctions")}>
                  <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                    <FaEye className="text-2xl mr-2" /> View My Auctions
                  </span>
                </li>
              </>
            )}
            {isAuthenticated && user?.role === "Super Admin" && (
              <li onClick={() => handleLinkClick("/dashboard")}>
                <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                  <MdDashboard className="text-2xl mr-2" /> Dashboard
                </span>
              </li>
            )}
          </ul>

          <div className="my-4 flex gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => handleLinkClick("/sign-up")}
                  className="bg-custom-primary text-white font-semibold hover:bg-[#D6482B] text-lg py-2 px-4 rounded-md shadow transition duration-150"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => handleLinkClick("/login")}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-200 font-semibold text-lg py-2 px-4 rounded-md shadow transition duration-150"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-custom-primary text-white font-semibold hover:bg-[#D6482B] text-lg py-2 px-4 rounded-md shadow transition duration-150"
              >
                Logout
              </button>
            )}
          </div>

          <hr className="my-4 border-gray-300" />
          <ul className="flex flex-col gap-4">
            {isAuthenticated && (
              <li onClick={() => handleLinkClick("/me")}>
                <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                  <FaUserCircle className="text-2xl mr-2" /> Profile
                </span>
              </li>
            )}
            <li onClick={() => handleLinkClick("/how-it-works-info")}>
              <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                <SiGooglesearchconsole className="text-2xl mr-2" /> How it works
              </span>
            </li>
            <li onClick={() => handleLinkClick("/about")}>
              <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                <BsFillInfoSquareFill className="text-2xl mr-2" /> About Us
              </span>
            </li>
            <li onClick={() => handleLinkClick("/contact")}>
              <span className="flex items-center text-lg font-medium text-gray-700 hover:text-custom-primary transition duration-150 cursor-pointer">
                <BsFillEnvelopeFill className="text-2xl mr-2" /> Contact Us
              </span>
            </li>
          </ul>

          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] sm:hidden"
          />
        </div>

        <div className="mt-auto">
          {/* Social Media Links and Footer */}
          <div className="flex gap-4 items-center mb-4">
            <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-full hover:text-blue-700 transition duration-150"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-full hover:text-pink-500 transition duration-150"
            >
              <RiInstagramFill />
            </Link>
            <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-full hover:text-blue-600 transition duration-150"
            >
              <FaTwitter />
            </Link>
            <Link
              to="/"
              className="bg-white text-stone-500 p-2 text-xl rounded-full hover:text-blue-800 transition duration-150"
            >
              <FaLinkedin />
            </Link>
          </div>
          <p className="text-stone-500">
            &copy; AuctionHaven {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
