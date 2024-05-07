import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { IoReturnDownBack, IoBookSharp } from "react-icons/io5";
function MovieComponent({ backClick, ...props }) {




    function onBackClick() {
        backClick()
    }
    return (
        <>
       {/* { props?.recommendations.map((recommendation, index) => ( */}
            <div className='bg-neutral-800 w-1/4 rounded-xl m-2 place-content-start'  >
                <div className=' text-[20px] p-2 font-semibold text-white bg-zinc-600 m-2 rounded-xl'>
                    <div className='p-1 flex place-content-between'> <p>{props.recommendations?.Title}</p>
                        <IoReturnDownBack className='w-[25px] h-7 hover:text-black' onClick={onBackClick} />
                    </div>
                    <div className='flex text-[14px] place-content-evenly space-x-2'>
                        <div className='bg-zinc-900 p-1 rounded-md text-[12px]'>EN</div>
                        <div className='flex place-items-center'> <FaStar />{props?.recommendations['Vote Average'] || props?.recommendations?.Rating}</div>
                        <div className='flex place-items-center'><FaCalendar />{props?.recommendations['Release Date']}</div>
                        <div className='flex place-items-center'> {props.info?.duration === "min" ? <IoIosTime /> : <IoBookSharp />} {props.recommendations?.Runtime || props.recommendations?.Pages} {props.info?.duration}</div>
                    </div>
                </div>
                <div className=' rounded-lg m-2  place-content-evenly text-gray-400 font-normal text-[15px] ml-4'>
                    <div>Cast: {props?.recommendations?.Cast || props?.recommendations?.Author}</div>
                    <div>Genre: {props?.recommendations?.Genres}</div>
                    {/* <div>Scores: 9.03 by 1800 views</div> */}
                </div>
                <div className='m-2 mt-4 text-[12px] text-zinc-300 font-normal p-1 ml-3

'>
{props?.recommendations?.Overview}
                </div>
            </div>
            {/* ))} */}
        </>
    )
}



export default MovieComponent