import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { BiBookOpen, BiCalendarAlt, BiUser } from 'react-icons/bi';
// import { Calendar, User, BookOpen } from 'react-icons'

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



























// import React from 'react'
// import appwriteService from '../appwrite/config'
// import { Link } from 'react-router-dom'

// function PostCard({
//     $id, //appwrite syntax
//     title,
//     featuredImage,
//     author = 'unknown',
//     category,
// }) {
//   return (
//     <Link to={`/post/${$id}`}>
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full hover:shadow-blue-300 hover:-translate-y-4 duration-300">
//         <div className='h-52 w-full bg-cover bg-center ' style={{
//         backgroundImage: `url("${appwriteService.getFilePreview(featuredImage)} ")`,
//       }}
//       ></div>
//         <div className="p-2 pb-4 flex flex-col justify-between">
//             <span className='bg-black text-blue-300 px-1 text-sm w-fit'>{category}</span>
//             <h2 className="text-xl font-bold text-gray-800 mb-2 h-16 pt-1 overflow-hidden">{title.length <= 47 ? title : title.slice(0,47) + '..' }</h2>
//             <div className="flex justify-between items-center">
//                 <div className="flex items-center pl-1 ">
//                     <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Avatar" className="w-6 h-6 rounded-full mr-2 object-cover" />
//                     <span className="text-gray-800 font-semibold">{author && (author.length <= 20 ? author : author.slice(0,20) + '..' )}</span>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </Link>
//   )
// }

// export default PostCard