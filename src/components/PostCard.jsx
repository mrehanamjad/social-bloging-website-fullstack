import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
    $id, //appwrite syntax
    title,
    featuredImage,
    author = 'unknown',
}) {
  return (
    <Link to={`/post/${$id}`}>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full hover:shadow-blue-300 hover:-translate-y-4 duration-300">
        <div className='h-60 w-full bg-cover bg-center ' style={{
        backgroundImage: `url("${appwriteService.getFilePreview(featuredImage)} ")`,
      }}
      ></div>
        <div class="p-6 flex flex-col justify-between">
            <h2 class="text-2xl font-bold text-gray-800 mb-2 h-24 overflow-hidden">{title.length <= 30 ? title : title.slice(0,20) + '..' }</h2>
            <div class="flex justify-between items-center">
                <div class="flex items-center ">
                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Avatar" class="w-6 h-6 rounded-full mr-2 object-cover" />
                    <span class="text-gray-800 font-semibold">{author && (author.length <= 20 ? author : author.slice(0,20) + '..' )}</span>
                </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default PostCard