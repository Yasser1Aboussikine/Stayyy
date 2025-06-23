  import React, { use } from "react";
  import { useState, useEffect } from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import { assets } from "../assets/assets";
  import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

  //will be used as labelIcon for bookings

  const BookIcon = () => (
    <svg
      className="w-4 h-4 text-gray-700"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
      />
    </svg>
  );


  const Navbar = () => {
    const navLinks = [
      { name: "Home", path: "/" },
      { name: "Hotels", path: "/hotels" },
      { name: "Bookings", path: "/" },
      { name: "About", path: "/about" },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { openSignIn } = useClerk();
    const { user } = useUser();

    useEffect(() => {
      
      if (location.pathname !== "/") {

        setIsScrolled(true);
        return;
        
      } else {
        
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

      }
    }, [location.pathname]);

    return (
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/90 shadow-lg backdrop-blur-lg py-3 md:py-4"
            : "bg-[#49B9FF]/20 backdrop-blur-sm py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img
              src={assets.logo}
              alt="logo"
              className={`h-9 transition-all duration-300 ${
                isScrolled ? "invert opacity-80" : "filter brightness-0 invert"
              }`}
            />
            <h1
              className={`text-2xl font-bold tracking-wide transition-all duration-300 ${
                isScrolled ? "text-gray-800" : "text-white drop-shadow-lg"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Stayyy
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className={`group flex flex-col gap-0.5 transition-all duration-300 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </a>
          ))}
          
          {user && 
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all duration-300 ${
              isScrolled
                ? "text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white"
                : "text-white border-white hover:bg-white hover:text-gray-800"
            }`}
          >
            Dashboard
          </button>
          }
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className={`cursor-pointer p-2 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            <img
              src={assets.searchIcon}
              alt="Nothing to show"
              className={`h-7 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg ${
                isScrolled
                  ? "filter brightness-0 invert"
                  : "filter brightness-0 invert drop-shadow-lg"
              }`}
            />
          </button>

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() =>
                    navigate(
                      user.externalId ? `/${user.externalId}/bookings` : "/"
                    )
                  }
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              className={`px-8 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                isScrolled
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              onClick={openSignIn}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}

        <div
          className={`flex items-center gap-3 md:hidden absolute top-1.8 right-4 cursor-pointer p-3 rounded-full transition-all duration-300 
              ${isScrolled && "bg-gray-500 hover:bg-gray-600"}`}
        >
          {user && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() =>
                    navigate(
                      user.externalId ? `/${user.externalId}/bookings` : "/"
                    )
                  }
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
          <img
            src={assets.menuIcon}
            alt="None"
            className={`h-4 transition-all duration-300 ${
              isScrolled ? "invert" : "filter brightness-0 invert"
            }`}
            onClick={() => setIsMenuOpen(true)}
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
          </button>
          {navLinks.map((link, i) => (
            <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}

          {user &&
            <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
            Dashboard
            </button>
          }

          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() =>
                    navigate(
                      user.username ? `/${user.username}/bookings` : "/"
                    )
                  }
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
              onClick={openSignIn}
            >
              Login
            </button>
          )}
          
        </div>
      </nav>
    );
  };

  export default Navbar;
