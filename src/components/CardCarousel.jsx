// import React from 'react'
// import {CategoryCard} from '.'
// import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";


// function CardCarousel() {
    
//     const next = () => {
        
//     }

//   return (
//     <div className='h-screen w-full bg-cover bg-center bg-fixed flex items-center justify-center' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1530533718754-001d2668365a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` }} >
//         <FaArrowCircleLeft className='text-white text-3xl' />
//     <div className='w-full h-full bg-black/35 flex  items-center  text-center  gap-4 overflow-x-auto'>
//         <CategoryCard />
//         <CategoryCard className='bg-red-700' />
//         <CategoryCard className='bg-orange-700' />
//         <CategoryCard className='bg-blue-700' />
//         <CategoryCard className='bg-green-700' />
//         <CategoryCard className='bg-yellow-700' />
//         </div>
//         <FaArrowAltCircleRight  onClick={next} className='text-white text-3xl'  />
// </div>
//   )
// }

// export default CardCarousel





import React, { useRef } from 'react';
import { CategoryCard } from '.';
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

function CardCarousel() {
  const containerRef = useRef(null);

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200; // Scroll right by 100 pixels
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200; // Scroll left by 100 pixels
    }
  };

  return (
    <div className='h-screen w-full bg-cover bg-center bg-fixed flex flex-col gap-6 items-center justify-center text-white' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1530533718754-001d2668365a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` }} >
        <h1 className='font-bold text-4xl'>Categories</h1>
      <div ref={containerRef} className='w-full   flex items-center  text-center gap-4 overflow-hidden px-8'>
        <CategoryCard  text='Artifitial Intelligence' bgImg='https://cdn.pixabay.com/photo/2024/04/09/16/30/ai-generated-8686301_1280.jpg' />
        <CategoryCard  text='Tech' bgImg='https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=600'/>
        <CategoryCard  text='Bussiness & Finance' bgImg='https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600'/>
        <CategoryCard  text=''/>
        <CategoryCard />
        <CategoryCard />
      </div>
      <div className='flex gap-4'>
      <FaArrowCircleLeft onClick={scrollLeft} className='bg-white hover:bg-black hover:text-white rounded-full text-black text-5xl cursor-pointer active:scale-90 duration-300' />
      <FaArrowCircleRight onClick={scrollRight} className='bg-white rounded-full text-black hover:bg-black hover:text-white text-5xl cursor-pointer active:scale-90 duration-300' />
      </div>
    </div>
  );
}

export default CardCarousel;
