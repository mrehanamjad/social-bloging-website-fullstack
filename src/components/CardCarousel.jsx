import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaList,FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';


const CategoryCardData = [
  {
    text: 'All',
    className: '',
    bgImg: 'https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg?ga=GA1.1.1944218876.1730389044&semt=ais_hybrid',
  },
  {
    text: 'Technology',
    className: 'bg-right',
    bgImg: 'https://cdn.pixabay.com/photo/2023/01/20/19/48/chip-7732459_1280.png',
  },
  {
    text: 'Life & Culture',
    className: '',
    bgImg: 'https://cdn.pixabay.com/photo/2020/05/29/15/31/lantern-5235537_1280.jpg',
  },
  {
    text: 'Business & Finance',
    className: '',
    bgImg: 'https://cdn.pixabay.com/photo/2020/02/18/08/35/finance-4858797_1280.jpg',
  },
  {
    text: 'Health & Fitness',
    className: '',
    bgImg: 'https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    text: 'Creative Writing',
    className: '',
    bgImg: 'https://images.pexels.com/photos/5554771/pexels-photo-5554771.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    text: 'Travel & Adventure',
    className: '',
    bgImg: 'https://cdn.pixabay.com/photo/2017/08/07/23/50/climbing-2609319_1280.jpg',
  },
  {
    text: 'Food & Cooking',
    className: '',
    bgImg: 'https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_1280.jpg',
  },
  {
    text: 'Entertainment & Sports Media',
    className: '',
    bgImg: 'https://images.pexels.com/photos/5022810/pexels-photo-5022810.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    text: 'Self-Improvement',
    className: '',
    bgImg: 'https://images.pexels.com/photos/5206052/pexels-photo-5206052.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const CategoryCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? CategoryCardData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === CategoryCardData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      <div className="flex items-center space-x-4">
        
        <button 
          onClick={handlePrev} 
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>

        {/* Card Carousel Container */}
        <div className="flex overflow-hidden w-full space-x-4">
          {CategoryCardData.map((category, index) => (
            <Link key={category.text} to={category.text === 'All' ? `/all-posts` : `/all-posts/category/${category.text}`}>
            <div 
              key={category.text}
              className={`
                relative transform transition-all duration-300 ease-in-out
              
                flex-shrink-0 w-72 h-48 rounded-xl overflow-hidden
                shadow-lg cursor-pointer
              `}
              style={{
                transform: `translateX(-${(currentIndex * 100)+(currentIndex*5)}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {/* Background Image */}
              {category.bgImg && (
                <img 
                  src={category.bgImg} 
                  alt={category.text} 
                  className={`
                    absolute inset-0 w-full h-full object-cover
                    ${category.className}
                  `}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-20 transition-all duration-300"></div>

              {/* Category Text */}
              <div className="relative z-10 flex items-end h-full p-4">
                <h3 className="text-white text-xl font-bold drop-shadow-lg">
                  {category.text}
                </h3>
              </div>
            </div>
            </Link>
          ))}
        </div>

        {/* Navigation Button - Next */}
        <button 
          onClick={handleNext} 
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {CategoryCardData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full 
              ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs ">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between 
          bg-blue-500 text-white 
          px-4 py-2 rounded-lg 
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
            ${isOpen ? 'rotate-180' : 'rotate-0'}
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
              to={category.text === 'All' ? `/all-posts` : `/all-posts/category/${category.text}`}
              className="
                 px-4 py-2 
                hover:bg-blue-50 
                transition duration-200
                flex items-center
              "
              onClick={() => setIsOpen(false)}
            >
              {category.icon && <category.icon className="mr-2 text-blue-500" />}
              {category.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};


export default CategoryCardCarousel;

