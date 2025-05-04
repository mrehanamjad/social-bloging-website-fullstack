import React, { Children } from 'react'

function Button({
    children,
    type = "button",
    varient = 'blue', // varients are 'blue' | `white`| `red`
    className = "", // mostly we set className value empty string
    isLoading = false,
    ...props
}) {
    return (
        <button className={`px-4 py-2 cursor-pointer rounded-3xl active:scale-95 shadow-lg hover:shadow-none  ${(varient === 'blue' && "bg-blue-600 text-white hover:bg-blue-700") || (varient === 'white' && "bg-slate-200 hover:bg-slate-300") || (varient === 'red' && "bg-red-400 hover:bg-red-500")}    ${className}`} {...props}>
            {isLoading ? <div className='w-5 h-5 border-2 mx-auto border-white rounded-full border-t-transparent animate-spin'></div> : children}
        </button>
    )
}

export default Button