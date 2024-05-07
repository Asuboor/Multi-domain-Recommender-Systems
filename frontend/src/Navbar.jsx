import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Home from './Home'
import Recommenders from './Recommenders'
import Faq from './Faq'
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import axios from 'axios'

function Navbar(props) {

  const navigate = useNavigate();  
  console.log(document.cookie)

  console.log(props.click)

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  };

  const [token, setToken] = useState(getTokenFromCookie());
  const [user, setUser] = useState(null);

  useEffect(() => {
      // Check if user data exists in local storage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          setUser(JSON.parse(storedUser));
      }
      else{
      axios.get('http://localhost:6005/auth/user')
    .then(res => {
      setUser(res.data);
      localStorage.setItem('user');
    })
    .catch(err => {
      console.log(err);
    });
  }}, []);
  console.log(user)

  const handleLogout = () => {
    navigate('/login');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setToken(null);
    localStorage.removeItem('user');
  };
  
  return (
    <div className='bg-zinc-900 text-white font-semibold flex place-content-between text-2xl '>
        <div className='m-8'>Logo</div>
        <div className='flex m-8 space-x-24 pr-20'>
            <div> <Link to="/" >About Us</Link></div>
            <div><Link to="recommenders">Recommendations</Link></div>
            <div><Link to="faq">FAQ's</Link></div>
            {token && <div className='flex space-x-4 m-auto place-items-center '><IoMdLogOut className='hover:text-red-500'  onClick={handleLogout}/>  
            {user?.image ? <img src={user?.image} width={30} className='rounded-3xl' alt="" /> : <FaRegUserCircle />  } <p> {user?.displayName}</p>  </div> }
        </div>
    </div>
  )
}

export default Navbar