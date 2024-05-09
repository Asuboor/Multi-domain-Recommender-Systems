import React from 'react'
import { FaStar } from 'react-icons/fa'
import { MdOutlineRestaurant } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";

function RestaurantComponent(props) {
  return (
    <>
      {props?.recommendations.map((restaurant,index)=>(
        <div className='w-1/3  bg-[#F8F8FF] rounded-[35px] border-4 border-[#595FF0] place-content-center m-4 'key={index}>
        <div className='text-center font-bold text-[40px] m-4'>{restaurant?.Restaurant}</div>
        <div className=' bg-[#595FF0]   border-2 border-[#595FF0] rounded-[15px] text-[18px] font-medium text-black m-8 p-3'>
          <div className='font-semibold text-[30px] text-center mb-3'>Info</div>
          <div className='flex '><MdOutlineRestaurant className='' />: {restaurant?.Cuisine}</div>
          <div className='flex '><FaRupeeSign />: {restaurant?.Price}</div>
          <div className='flex '><FaLocationArrow />: {restaurant?.Area}, {restaurant?.City}</div>
          <div className='flex place-content-center'><FaStar className='m-1' /> <p>{restaurant?.Rating}</p></div>
        </div>
      </div>
      ))}

    </>
  )
}

export default RestaurantComponent