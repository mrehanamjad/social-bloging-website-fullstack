import React,{useId,forwardRef} from 'react'

const Input = forwardRef(function Input({
    label,
    type = 'text',
    clasName = "", // mostly we set className value empty string
    ...props
},ref) {

    const id = useId();

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>}
            <input 
            type={type}
            className={`px-3 py-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${clasName}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input


// Another Way:
/*

function Input({
    //.props as above
},ref) {

    //As above ...
    
})

export default forwardRef(Input)

*/