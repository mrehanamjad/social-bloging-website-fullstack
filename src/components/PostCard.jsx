import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { BiBookOpen, BiCalendarAlt, BiUser } from 'react-icons/bi';

function PostCard({
    $id,
    title,
    featuredImage,
    author = 'Unknown',
    category,
    updatedOn = new Date().toLocaleDateString()
}) {
  // Truncate text with better ellipsis handling
  const maxText = (text, maxLength) => 
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <Link 
      to={`/post/${$id}`} 
      className="block transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm transition-all">
        {/* Featured Image */}
        <div 
          className="h-56 w-full bg-cover bg-center relative" 
          style={{
            backgroundImage: `url("${appwriteService.getFilePreview(featuredImage)}")`,
            backgroundSize: 'cover'
          }}
        >
          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
            {maxText(category, 15)}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800  min-h-[56px]">
            {maxText(title, 45)}
          </h2>

          {/* Meta Information */}
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            {/* Author */}
            <div className="flex items-center space-x-1">
              <BiUser size={16} className="text-blue-500" />
              <span>{maxText(author, 20)}</span>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-1">
              <BiCalendarAlt size={16} className="text-blue-500" />
              <span>{updatedOn}</span>
            </div>
          </div>

          {/* Read More */}
          <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <BiBookOpen size={16} className="mr-2" />
            <span className="font-medium">Read More</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
