import React, { Children } from 'react'

function Button({
    children, // this is the button text - as it is a veriable so use can also change it to btnText etc
    type = "button",
    varient = 'blue', // varients are 'blue' & white
    className = "", // mostly we set className value empty string
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded active:scale-95 shadow-lg hover:shadow-none  ${(varient === 'blue' && "bg-blue-600 text-white hover:bg-blue-700") || (varient === 'white' && "bg-slate-200 hover:bg-slate-300") || (varient === 'red' && "bg-red-400 hover:bg-red-500")}    ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button