import React, { Children } from 'react'

function Button({
    children, // this is the button text - as it is a veriable so use can also change it to btnText etc
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "", // mostly we set className value empty string
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button