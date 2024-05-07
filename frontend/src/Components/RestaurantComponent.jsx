import React from 'react'
import { FaStar } from 'react-icons/fa'

function RestaurantComponent() {
  return (
    <div className='w-1/3  bg-[#F8F8FF] rounded-[35px] border-4 border-[#595FF0] place-content-center '>
        <div className='text-center font-bold text-[40px] m-4'>Title</div>
        <div className=' bg-[#595FF0]   border-2 border-[#595FF0] rounded-[15px] text-[18px] font-medium text-black m-8 p-3'>
            <div className='font-semibold text-[30px] text-center mb-3'>Info</div>
            <div>Cuisine: Indian</div>
            <div>Avg Price: 600</div>
            <div>Location: Jubilee Hills, Hyderabad</div>
            <div className='flex place-content-center'><FaStar className='m-1'/> <p>4.5</p></div>
        </div>
    </div>
  )
}

export default RestaurantComponent