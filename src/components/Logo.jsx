import React from 'react'
import { FaBlog } from 'react-icons/fa'
import { IoMdListBox } from 'react-icons/io'

function Logo() {
  return (
    <div className='text-xl font-extrabold flex items-center'>
      <IoMdListBox className='text-5xl' />
      <FaBlog className='text-4xl' />
    </div>
  )
}

export default Logo