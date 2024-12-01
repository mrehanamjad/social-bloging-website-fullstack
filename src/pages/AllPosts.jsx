import React, { useState, useEffect } from 'react'
import { Button, Container, Loader, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaNewspaper, FaPen, FaSearch } from 'react-icons/fa'
import { CategoryDropdown } from '../components/CardCarousel'

function AllPosts({type}) {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                setFilteredPosts(posts.documents);
            }
            setLoading(false)
        }).catch((error) => {
            console.error('Error fetching posts:', error);
            setLoading(false)
        });
    }, []);

    // Filter posts based on type and user
    useEffect(() => {
        let result = posts;
        
        // Filter by type
        if (type === 'my') {
            result = result.filter(post => 
                userData && userData.$id === post.userId
            );
        }

        // Filter by search term
        if (searchTerm) {
            result = result.filter(post => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPosts(result);
    }, [type, posts, searchTerm, userData]);

    // Render content based on posts and type
    const renderContent = () => {
        // Loading state
        if (loading) {
            return (
                <div className="flex justify-center items-center w-full h-96">
                    <Loader />
                </div>
            );
        }

        // No posts for my posts
        if (type === 'my' && filteredPosts.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center w-full py-16 text-center">
                    <FaNewspaper className="w-24 h-24 text-gray-300 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        No Posts Yet
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Start sharing your thoughts and experiences with the world.
                    </p>
                    <Link to="/add-post">
                        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                            <FaPen size={20} />
                            Write Your First Post
                        </Button>
                    </Link>
                </div>
            );
        }

        // No posts in general
        if (filteredPosts.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center w-full py-16 text-center">
                    <FaSearch className="w-24 h-24 text-gray-300 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        No Posts Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {type === 'my' 
                            ? "You haven't written any posts yet." 
                            : "No posts are available at the moment."}
                    </p>
                    {type === 'my' && (
                        <Link to="/add-post">
                            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                                <FaPen size={20} />
                                Create Your First Post
                            </Button>
                        </Link>
                    )}
                </div>
            );
        }

        // Render posts
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPosts.map((post) => (
                    <div key={post.$id} className="w-full">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='w-full py-12 bg-gray-50 min-h-screen'>
            <Container>
                <div className="mb-8">
                    <div className='flex justify-between gap-3 md:items-center w-full max-md:flex-col  mb-6'>
                    <h1 className="text-4xl font-bold text-gray-900 ">
                        {type === 'my' ? 'My Posts' : 'All Posts'}
                    </h1>
                    <CategoryDropdown />
                    </div>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="relative flex-grow">
                            <input 
                                type="text" 
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                size={20} 
                            />
                        </div>
                    </div>
                </div>

                {renderContent()}
            </Container>
        </div>
    )
}

export default AllPosts