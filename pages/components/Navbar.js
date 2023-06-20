import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { GiNewspaper } from 'react-icons/gi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const Cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {

    if(localStorage.getItem('token')) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false)
    }

  }, [])
  


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categories = [
    'top',
    'business',
    'entertainment',
    'environment',
    'food',
    'health',
    'politics',
    'science',
    'sports',
    'technology',
    'tourism',
    'world',
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };
  const closeUserDropdown = () => {
    setIsUserDropdownOpen(false);
  };

  return (
    <motion.nav
      className={` navbar ${
        isSticky ? 'bg-white shadow-lg' : 'bg-gradient-to-b from-blue-500 to-indigo-500'
      } fixed w-full top-0 z-10`}
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="max-w-full lg:flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 md:mx-0">
      <div>
      <Link legacyBehavior href="/" passHref>
            <a className={`${
                    isSticky ? 'text-gray-700' : 'text-white'
                  } flex items-center font-bold text-lg md:text-2xl`}>
              <GiNewspaper className="mr-2 text-6xl hidden md:inline text-indigo-200"/>
             <span className='py-4 md:py-0'>Newzy Newzy</span>
            </a>
          </Link>
          </div>

        <div className="flex justify-between items-center lg:h-16">
    
          
          <div className="flex items-center">
            <div className="hidden lg:flex space-x-4">
              <Link legacyBehavior href="/" passHref>
                <a
                  className={`${
                    isSticky ? 'text-gray-700' : 'text-white'
                  } hover:text-indigo-200 px-3 py-2 rounded-md text-base font-medium`}
                  onClick={closeMenu}
                >
                  Home
                </a>
              </Link>
              {categories.slice(0, 6).map((category) => (
                <Link legacyBehavior href={`/news/${category}`} key={category} passHref>
                  <a
                    className={`${
                      isSticky ? 'text-gray-700' : 'text-white'
                    } hover:text-indigo-200 px-3 py-2 rounded-md text-base font-medium`}
                    onClick={closeMenu}
                  >
                    {Cap(category)}
                  </a>
                </Link>
              ))}
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className={`${
                      isSticky ? 'text-gray-700' : 'text-white'
                    } hover:text-indigo-200 flex items-center justify-center w-full px-3 py-2 rounded-md text-base font-medium focus:outline-none`}
                    onClick={toggleMenu}
                  >
                    More
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 10a1 1 0 0 1-2 0V6a1 1 0 1 1 2 0v4zm2 0a1 1 0 1 0 2 0V6a1 1 0 1 0-2 0v4zm3 2a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2h4z"
                      />
                    </svg>
                  </button>
                </div>
                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1 overflow-y-auto"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {categories.slice(6).map((category) => (
                        <Link legacyBehavior href={`/news/${category}`} key={category} passHref>
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-200"
                            role="menuitem"
                            onClick={closeMenu}
                          >
                            {category}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:hidden absolute top-4 right-4">
              <button
                onClick={toggleMenu}
                className={`${
                  isSticky ? 'text-gray-700' : 'text-white'
                } hover:text-indigo-200 focus:outline-none`}
              >
                {isOpen ? (
                  <FaTimes size={20} className="h-6 w-6" />
                ) : (
                  <FaBars size={20} className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link legacyBehavior href="/" passHref>
                <a
                  className={`${
                    isSticky ? 'text-gray-700' : 'text-white'
                  } block px-3 py-1 rounded-md text-base font-medium hover:bg-indigo-200`}
                  onClick={closeMenu}
                >
                  Home
                </a>
              </Link>
              {categories.map((category) => (
                <Link legacyBehavior href={`/news/${category}`} key={category} passHref>
                  <a
                    className={`${
                      isSticky ? 'text-gray-700' : 'text-white'
                    } block px-3 py-1 rounded-md text-base font-medium hover:bg-indigo-200`}
                    onClick={closeMenu}
                  >
                    {Cap(category)}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}

{isUserLoggedIn ? (
  // User dropdown when logged in
  <div className="absolute top-2 right-12 text-2xl lg:static flex justify-end">
    <button
      type="button"
      className={`${isSticky ? 'text-gray-700' : 'text-white'} hover:text-indigo-200 flex items-center justify-end w-10 h-10 p-2 rounded-full focus:outline-none`}
      onClick={toggleUserDropdown}
    >
      <FaUser />
    </button>
    {isUserDropdownOpen && (
      <div className="origin-top-right absolute right-0 mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div
          className="py-1 overflow-y-auto"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            href="/user/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-200"
            role="menuitem"
            onClick={closeUserDropdown}
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-200"
            role="menuitem"
            onClick={closeUserDropdown}
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-200"
            role="menuitem"
            onClick={closeUserDropdown}
          >
            Logout
          </a>
        </div>
      </div>
    )}
  </div>
) : (
  // Sign up and login buttons when not logged in
  <div className="absolute right-16 top-2 lg:static flex justify-end mb-2 lg:md-0 space-x-2">
    <Link legacyBehavior href="/user/signup">
      <a
        className={`${
          isSticky ? 'text-gray-700' : 'text-white'
        } hover:text-indigo-200 px-3 py-2 border rounded-md text-base font-medium`}
        onClick={closeMenu}
      >
        Sign up
      </a>
    </Link>
    <Link legacyBehavior href="/user/login">
      <a
        className={`${
          isSticky ? 'text-gray-700' : 'text-white'
        } hover:text-indigo-200 px-3 py-2 border rounded-md text-base font-medium`}
        onClick={closeMenu}
      >
        Login
      </a>
    </Link>
  </div>
)}


      </div>
    </motion.nav>
  );
};

export default Navbar;
