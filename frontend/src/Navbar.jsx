
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi"; // Icon for the hamburger menu
import axios from 'axios';
import Logo from "./Assets/Recom-Ai.png";

function Navbar({ token, setToken, click }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'token') {
        setToken(value);
        break;
      }
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      axios.get('http://localhost:6005/auth/user')
        .then(res => {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [setToken]);

  const handleLogout = async () => {
    try {
      // Make a POST request to the server to log out
      const response = await axios.post('http://localhost:6005/auth/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        // Clear client-side tokens and user data
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        setToken(null);
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className='bg-[#16161D] text-white font-semibold'>
      <div className='flex justify-between items-center p-5'>
        <img src={Logo} width={160} alt="" />
        <div className='md:hidden'>
          <GiHamburgerMenu onClick={() => setIsOpen(!isOpen)} className='text-2xl cursor-pointer' />
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} absolute md:relative w-full md:w-auto md:flex flex-grow items-center bg-zinc-900 md:bg-transparent z-20 left-0 md:left-auto top-16 md:top-auto md:place-content-end lg:place-content-end xl:place-content-end text-[25px] gap-4`}>
          <Link to="/" className='block py-2 md:py-0 px-4 w-full md:w-auto text-center hover:text-[#595FF0]'>About Us</Link>
          <Link to="recommenders" className='block py-2 md:py-0 px-4 w-full md:w-auto text-center hover:text-[#595FF0]'>Recommendations</Link>
          <Link to="faq" className='block py-2 md:py-0 px-4 w-full md:w-auto text-center hover:text-[#595FF0]'>FAQ's</Link>
          {token ? (
            <div className='flex justify-center items-center space-x-4 '>
              <IoMdLogOut className='hover:text-red-500 cursor-pointer' onClick={handleLogout} />
              {user?.image ? <img src={user?.image} width={30} className='rounded-full' alt="" /> : <FaRegUserCircle />}
              <p>{user?.displayName}</p>
            </div>
          ) : (
            <div className='flex items-center space-x-4 cursor-pointer' onClick={handleLogin}>
              <RiLoginCircleFill className='hover:text-[#3109BA]' />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
