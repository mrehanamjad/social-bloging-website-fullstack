import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Adjust import path as needed

const HeroSection = ({ status }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Text Column */}
        <div className="space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Write<span className="text-blue-600">,</span> Share
            <span className="text-blue-600">,</span> and 
            <span className="text-blue-600"> Explore</span> Ideas
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join a vibrant community of writers and readers. Share your thoughts, 
            explore fresh ideas, and engage with stories that matter.
          </p>
          <div className="flex space-x-4">
            <Link to={status ? 'add-post' : "/login"}>
              <Button 
                className="px-6 py-3 font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Start Writing
              </Button>
            </Link>
            <Link to={status ? 'all-posts' : "/login"}>
              <Button 
                variant="outline" 
                className="px-6 py-3 font-bold border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Explore Blogs
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="hidden md:flex justify-center items-center">
          <img 
            src="/api/placeholder/600/500" 
            alt="Blogging concept illustration"
            className="w-full max-w-lg object-contain animate-float"
          />
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 transform skew-x-12 origin-top-right -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-50 to-transparent"></div>
    </div>
  );
};

export default HeroSection;