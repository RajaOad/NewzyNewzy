import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHome, FaPlus, FaList, FaPowerOff, FaBars } from 'react-icons/fa';
import { GiNewspaper } from 'react-icons/gi';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [token, setToken] = useState('')

  useEffect(() => {
  
    setToken(localStorage.getItem('token'))
  }, [])
  



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

    
  };

  const  router = useRouter();

  const logout = ()=> {
    localStorage.removeItem('token')
    cookie.remove('token')
    // setUser({value: null})
    // setKey(Math.random())
    router.push('/user/login')
  }



  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`w-64 bg-gradient-to-b from-blue-500 to-indigo-500 text-white relative z-50 ${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16">
          {/* <img className="w-8 h-8 mr-2" src="/logo.png" alt="Logo" /> */}
          <span className="text-lg font-semibold">Newzy Newzy</span>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <Link legacyBehavior href="/user/dashboard" passHref>
                <a className="flex items-center py-2 px-4 rounded hover:bg-blue-600">
                  <FaHome className="mr-3 text-xl" />
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/user/addnews" passHref>
                <a className="flex items-center py-2 px-4 rounded hover:bg-blue-600">
                  <FaPlus className="mr-3 text-xl" />
                  <span>Add Article</span>
                </a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href={`/user/usernews?token=${token}`} passHref>
                <a className="flex items-center py-2 px-4 rounded hover:bg-blue-600">
                  <FaList className="mr-3 text-xl" />
                  <span>Your Articles</span>
                </a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/" passHref>
                <a className="flex items-center py-2 px-4 rounded hover:bg-blue-600">
                  <GiNewspaper className="mr-3 text-xl" />
                  <span>Newzy Newzy</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout button */}
        <div className="flex items-center justify-center mt-auto">
          <button onClick={logout} className="flex items-center px-20 py-2 my-16 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
            <FaPowerOff className="mr-2 text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Hamburger Menu */}
      <div className="flex flex-col sm:hidden absolute top-0 left-0">
        <div className="flex z-50 items-center justify-between bg-gray-900 text-white p-2">
        
          <button
            className="p-2 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars className="text-xl" />
          </button>
        </div>

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleSidebar}></div>
        )}
      </div>

  
    </div>
  );
};

export default Sidebar;
