import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
    $id, //appwrite syntax
    title,
    featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 hover:bg-blue-200 rounded-xl p-4 min-h-64">
            <div className="w-full justify-center mb-4 p-1">
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-40 max-w-48' />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p className='text-right '>~{"auther"}</p>
        </div>
    </Link>
  )
}

export default PostCard