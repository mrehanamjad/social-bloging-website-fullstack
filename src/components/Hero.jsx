import React from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';

function Hero() {
    const status = useSelector((state) => state.auth.status);
  return (
    <div className="relative md:min-h-screen pt-10 pb-6 w-full flex items-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Text Column */}
                        <div className="space-y-6 z-10">
                            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                Welcome to SocialBlogs
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Write, Share, <br />
                                <span className="text-blue-600">Explore Ideas</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Join a vibrant community of writers and readers. Share your thoughts, 
                                explore fresh ideas, and engage with stories that matter.
                            </p>
                            <div className="flex  max-sm:flex-col gap-4">
                                <Link to={status ? 'add-post' : "/login"}>
                                    <Button 
                                        className="group px-6 py-3 w-44 font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center"
                                    >
                                        Start Writing
                                        <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                    </Button>
                                </Link>
                                <Link to={status ? 'all-posts' : "/login"}>
                                    <Button  
                                        varient='white'
                                        className="px-6 py-3 w-44 font-bold "
                                    >
                                        Explore Blogs
                                    </Button>
                                </Link>
                            </div>
                        </div>
    
                        {/* Right Image Column */}
                        <div className="hidden md:flex justify-center items-center">
                            <img 
                                src="/heroImg.png" 
                                alt="Blogging concept illustration"
                                className="w-full max-w-lg  rounded-xl"
                            />
                        </div>
                    </div>
                </div>
  )
}

export default Hero