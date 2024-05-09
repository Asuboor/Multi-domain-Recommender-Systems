import React, { useEffect, useState } from 'react'
import Movie from "./Assets/movie.png"
import { Link } from 'react-router-dom'
import restraunts from './Assets/restt.png'
import book from "./Assets/book.png"
import course from "./Assets/course.png"
import webseries from "./Assets/webseries.png"
import ChatComponent from './Components/ChatComponent'


function Recommenders() {
  const [activeTab, setActiveTab] = useState('model');
  const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user data exists in local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    // console.log(user)
  function handleTabClick(tab) {
    setActiveTab(tab)
  }
  return (
    <div className='bg-[#16161D]'>
      

      <div className='flex m-auto w-60 h-20 rounded-[40px] text-black font-medium text-[20px] bg-[#F8F8FF] place-content-between mt-5 border-[5px]  border-[#2C0AA0]'>
      <div
        onClick={() => handleTabClick('model')}
        className={`cursor-pointer m-auto ml-2 p-2 rounded-3xl w-28 text-center ${
          activeTab === 'model' ? 'bg-[#674CC4] text-white' : ''
        } transition-all`}
      >
        Model
      </div>
      <div
        onClick={() => handleTabClick('prompt')}
        className={`cursor-pointer m-auto mr-2 p-2 rounded-3xl w-28 text-center ${
          activeTab === 'prompt' ? 'bg-[#674CC4] text-white' : ''
        } transition-all`}
      >
        Prompt
      </div>
    </div>
      {activeTab === 'model' &&
        <div className='flex mt-4 ml-14 mr-14  place-content-evenly flex-wrap '>
          <Link to={`/recommenders/movies`} className='bg-[#F8F8FF] m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] border-[#3109BA]'>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={Movie} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>MOVIES</div>
          </Link>
          <Link to={`/recommenders/books`} className='bg-[#F8F8FF] m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] border-[#3109BA]'>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={book} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>BOOKS</div>
          </Link>
          <Link to={`/recommenders/restaurants`} className='bg-[#F8F8FF] m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] border-[#3109BA]'>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={restraunts} alt="" width={500} /></div>
            <div className='text-center font-bold text-[30px]'>RESTAURANTS</div>
          </Link>
          <Link to={`/recommenders/courses`} className='bg-[#F8F8FF] m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] border-[#3109BA]'>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={course} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>ONLINE COURSES</div>
          </Link>
          <Link to={`/recommenders/web-series`} className='bg-[#F8F8FF] m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] border-[#3109BA]'>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={webseries} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>WEB SERIES</div>
          </Link>
          {/* <Link to={`/recommenders/movies`} className='bg-[#F8F8FF] m-16 w-[332px] h-[176px] rounded-[40px] '>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={Movie} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>COLLEGES</div>
          </Link> */}
        </div>
      }
      {activeTab === 'prompt' &&  <ChatComponent />}

    </div>
  )
}

export default Recommenders