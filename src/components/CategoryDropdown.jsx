import React, { useState } from "react";
import { CategoryCardData } from "./CardCarousel";
import { FaList,FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
            w-full flex items-center justify-between 
            bg-blue-500 text-white 
            px-4 py-2 rounded-3xl 
            hover:bg-blue-600 
            transition duration-300 
          "
      >
        <span className="flex items-center">
          <FaList className="mr-2" />
          Categories
        </span>
        <FaChevronDown
          className={`
              transform transition-transform duration-300
              ${isOpen ? "rotate-180" : "rotate-0"}
            `}
        />
      </button>

      {isOpen && (
        <div
          className="
              absolute z-20 top-full left-0 right-0 
              mt-2 
              bg-white 
              shadow-lg rounded-lg 
              max-h-96 overflow-y-auto
              border border-gray-200
            "
        >
          {CategoryCardData.map((category) => (
            <Link
              key={category.text}
              to={
                category.text === "All"
                  ? `/all-posts`
                  : `/all-posts/category/${category.text}`
              }
              className="
                   px-4 py-2 
                  hover:bg-blue-50 
                  transition duration-200
                  flex items-center
                "
              onClick={() => setIsOpen(false)}
            >
              {category.icon && (
                <category.icon className="mr-2 text-blue-500" />
              )}
              {category.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;
