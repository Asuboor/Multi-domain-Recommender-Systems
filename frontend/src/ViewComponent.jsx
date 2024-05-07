// import React from 'react'
// import testImage from "./Assets/test-image.jpg"
// function ViewComponent({ titleClick, ...props }) {
//   function onTitleClick(value) {
//     titleClick()
//     console.log(value)
//   }
//   return (
//     <>
//       {
//         props?.recommendations.map((recommendation, index) => (
//           // <li key={index}>
//           //   <p>Title: {recommendation.Title}</p>
//           //   <p>Director: {recommendation.Director}</p>
//           //   {/* Add more fields as needed */}
//           // </li>
//           <div className='bg-neutral-800 w-1/4 rounded-xl m-2' key={index} >

//             <div className='w-60 m-auto p-2 ' ><img src={testImage} alt="" className='rounded-xl' /></div>
//             <div className='bg-[#696DD2] rounded-lg m-3 mb-1 flex place-content-evenly text-white font-medium'>
//               <div>{props.info?.category}</div>
//               <div >|</div>
//               <div>{recommendation['Release Date']}</div>
//               <div >|</div>
//               <div>{recommendation?.Runtime + " " + props.info?.duration}</div>
//             </div>
//             <button className='text-center text-[20px] font-semibold text-white m-auto flex hover:text-blue-400 ' onClick={onTitleClick(index)}>{recommendation?.Title}</button>

//           </div>
//         ))}

//     </>
//   )
// }

// export default ViewComponent

import React from 'react';
import testImage from "./Assets/test-image.jpg";

function ViewComponent({ titleClick, ...props }) {
  function onTitleClick(index) {
    return function() {
      titleClick(index);
      console.log(index)
    };
  }

  return (
    <>
      {props?.recommendations.map((recommendation, index) => (
        <div className='bg-neutral-800 w-1/4 rounded-xl m-2' key={index}>
          <div className='w-60 m-auto p-2'><img src={recommendation?.Image || testImage} alt="" className='rounded-xl' /></div>
          <div className='bg-[#696DD2] rounded-lg m-3 mb-1 flex place-content-evenly text-white font-medium'>
            <div>{props.info?.category}</div>
            <div>|</div>
            <div>{recommendation['Release Date'] ||  "★" + recommendation?.Rating }</div>
            <div>|</div>
            <div>{(recommendation?.Runtime || recommendation?.Pages) + " " + props.info?.duration}</div>
          </div>
          <button className='text-center text-[20px] font-semibold text-white m-auto flex hover:text-blue-400' onClick={onTitleClick(index)}>{recommendation?.Title}</button>
        </div>
      ))}
    </>
  );
}

export default ViewComponent;




