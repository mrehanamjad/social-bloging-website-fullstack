import React, { useState, useEffect } from 'react'
import { Button, Container, Input, Loader, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaNewspaper, FaPen, FaSearch } from 'react-icons/fa'
import { CategoryDropdown } from '../components/CardCarousel'

function ShowMutiPosts({ postsData, loading,fetchPost,noMorePosts, notFoundObject = { title, description, link, btnText } }) {
    const renderContent = () => {

        // No posts for my posts
        if (postsData.length === 0 && !loading) {
            return (
                <div className="flex flex-col items-center justify-center w-full py-16 text-center">
                    <FaNewspaper className="w-24 h-24 text-gray-300 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {notFoundObject.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {notFoundObject.description}
                    </p>

                    {notFoundObject.btnText && <Link to={`${notFoundObject.link}`}>
                        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                            <FaPen size={20} />
                            {notFoundObject.btnText}
                        </Button>
                    </Link>}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {postsData.map((post) => (
                    <div key={post.$id} className="w-full">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        );

    };

    return (
        <>
            {renderContent()}

            {loading && (
                <div className="flex justify-center items-center w-full h-96">
                    <Loader />
                </div>
            )}

            {!noMorePosts && (
                <div className="w-full flex justify-center items-center mt-8">
                    <Button varient='white' onClick={fetchPost} variant="white">Load more</Button>
                </div>
            )}
        </>
    )
}

export default ShowMutiPosts