import React from 'react'
import { FaBlog } from 'react-icons/fa'
import { IoMdListBox } from 'react-icons/io'

function Logo({colorClass = 'text-black'}) {
  return (
    <div className='text-xl font-extrabold flex items-center'>
      <IoMdListBox className={`text-5xl ${colorClass}`}/>
      <FaBlog className={`text-4xl ${colorClass}`}/>
    </div>
  )
}

export default Logo