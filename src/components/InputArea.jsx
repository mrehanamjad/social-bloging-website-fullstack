import React, {  forwardRef, useId } from 'react';

function InputArea({label,className='',...props},ref) {

    const id = useId()

  return (
    <div className="w-full">
      {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>}
    <textarea
    ref={ref}
    className={`px-2 py-1 min-h-20 rounded-lg w-full overflow-auto resize-none border-2 ${className}`} 
    id={id}
    {...props}
  />
  </div>
  )
}

export default forwardRef(InputArea) 

