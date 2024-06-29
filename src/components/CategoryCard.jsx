import React from 'react'
import Button from './Button'

function CategoryCard({className ="",bgImg = "",text =""}) {
  return (
    <div className={`w-52 h-72 bg-slate-400 rounded-3xl shrink-0 bg-cover bg-center group relative ${className}`} style={{backgroundImage:`url("${bgImg}")`}}>
      <div className='bg-white rounded-t-xl text-black absolute top-0 w-full duration-500 h-0 group-hover:h-[70%] flex flex-col justify-center items-center gap-4 group-hover:animate-pulse'>
        <h1 className='font-bold text-2xl hidden opacity-0 duration-1000 group-hover:block group-hover:opacity-100'>{text}</h1>
      </div>
      <div className='bg-blue-600 rounded-b-xl text-white absolute bottom-0 w-full duration-500 h-0 group-hover:h-[40%] rounded-tr-3xl flex flex-col justify-center items-center gap-4'>
        {/* <h1 className='font-bold text-2xl hidden opacity-0 duration-1000 group-hover:block group-hover:opacity-100'>{text}</h1> */}
        <Button textColor={"white"} bgColor='transparent' className='border-2  hidden opacity-0 duration-1000 group-hover:block group-hover:opacity-100'>Explore</Button>
      </div>
    </div>
  )
}

export default CategoryCard