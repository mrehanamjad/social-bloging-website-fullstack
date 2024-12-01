import React, { useEffect, useState } from 'react';
import { Container, PostCard, Button, CardCarousel, Loader } from '../components';
import appwriteService from '../appwrite/config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (status) {
            setLoading(true); 
            appwriteService.getPosts().then((postsData) => {
                if (postsData) {
                    setPosts(postsData.documents);
                }
                setLoading(false); 
            }).catch(error => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
        }
    }, [status]); 

    return (
        <div className='w-full bg-gray-50'>
            
            {/* Hero Section */}
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

            {/* Categories Section */}
            <Container>
                <section className="bg-white my-12 shadow-lg rounded-xl w-full container mx-auto py-16 px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover a world of diverse topics and interests. From technology to lifestyle, find your perfect read.
                        </p>
                    </div>
                    <CardCarousel />
                </section>
            </Container>

            {/* Posts Section */}
            <Container>
                <section className="bg-white shadow-lg rounded-xl py-16 w-full px-6">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Posts</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Handpicked stories that inspire, inform, and entertain. Dive into our latest and greatest.
                            </p>
                        </div>

                        {!status && posts.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                                    Discover Amazing Stories
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Login to unlock a world of fascinating reads and create your own.
                                </p>
                                <Link to="/login">
                                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                        Login to Read
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {loading ? (
                                    <div className="col-span-full flex justify-center">
                                        <Loader />
                                    </div>
                                ) : (
                                    posts.length > 0 ? (
                                        posts.map((post) => (
                                            <div key={post.$id} className='w-full'>
                                                <PostCard {...post} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12">
                                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                                                No Posts Available
                                            </h3>
                                            <p className="text-gray-600">
                                                Be the first to create a post and start sharing your story!
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </Container>
        </div>
    );
}

export default Home;