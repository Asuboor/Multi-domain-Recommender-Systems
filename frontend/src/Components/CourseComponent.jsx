import React from 'react'
import { FaStar } from "react-icons/fa";
import Udemy from "../Assets/udemy.png"
import Coursera from "../Assets/coursera.png"
function CourseComponent() {
    return (
        <div className='bg-[#F8F8FF] w-1/3 rounded-[35px] border-4 border-[#595FF0] m-4 '>
            <img src={Udemy} alt="" className='p-2 w-full rounded-[20px] border-1 border-[#595FF0]' />
            <div className='m-4 pl-3 pr-3'>
                <div className='flex place-content-between font-bold text-[22px]' >
                    <div>Title</div>
                    <div className='flex gap-1'><FaStar className='m-auto' /> 4.5</div>
                </div>
                <div className='text-[18px] font-semibold text-[#3109BA]'>By: Imran</div>
                <div className='font-medium text-[14px] mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat atque ex quam beatae officiis aspernatur odit dignissimos hic, consectetur, in aliquid maiores impedit temporibus ducimus quod illum, est non repellat? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, quisquam sapiente commodi ipsa ratione nulla? Sed accusamus sunt id magnam nihil! Laborum facere libero dolores officiis eaque iusto quas nemo.</div>
            </div>
            <div className=' pb-1 p-3 font-semibold text-[15px] text-[#EE3F4A] text-center'>A Beginner level course with completion time of around 3-6 months.</div>
        </div>
    )
}

export default CourseComponent