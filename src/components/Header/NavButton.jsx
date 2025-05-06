import React from 'react'

function NavButton({ item, onClick }) {
    return (
        <button
          onClick={onClick}
          className={`cursor-pointer relative flex items-center justify-center px-4 py-2 transition-all duration-300 rounded-3xl 
            ${
              item.name === "Signup"
                ? "bg-blue-600 text-white hover:text-blue-600 hover:bg-blue-50"
                : item.name === "Logout"
                ? "bg-red-600 text-white hover:text-red-600 hover:bg-red-100"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            }
          `}
        >
          <item.icon className="mr-2 " />
          {item.name && item.name !== "Search" && (
            <span className="text-sm font-medium">{item.name}</span>
          )}
        </button>
      );
}

export default NavButton