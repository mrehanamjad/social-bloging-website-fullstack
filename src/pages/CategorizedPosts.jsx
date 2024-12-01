import React, { useState, useEffect } from 'react'
import { Container, PostCard, Loader } from '../components'
import appwriteService from '../appwrite/config'
import { useParams, Link } from 'react-router-dom'
import { FaSearch, FaTag } from 'react-icons/fa'
import { CategoryDropdown } from '../components/CardCarousel'



function CategorizedPosts() {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const {slug} = useParams()

    // Capitalize first letter of category
    const categoryName =  slug.charAt(0).toUpperCase() + slug.slice(1)
    const categoryDescription =  'Explore posts in this category'

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                const categorizedPosts = posts.documents.filter(
                    post => post.category.toLowerCase() === slug.toLowerCase()
                )
                setPosts(categorizedPosts)
                setFilteredPosts(categorizedPosts)
            }
            setLoading(false)
        }).catch((error) => {
            console.error('Error fetching posts:', error)
            setLoading(false)
        })
    }, [slug])

    // Search and filter posts
    useEffect(() => {
        const filtered = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPosts(filtered)
    }, [searchTerm, posts])

    // Render content based on posts
    const renderContent = () => {
        // Loading state
        if (loading) {
            return (
                <div className="flex justify-center items-center w-full h-96">
                    <Loader />
                </div>
            )
        }

        // No posts found
        if (filteredPosts.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center w-full py-16 text-center">
                    <FaTag className="w-24 h-24 text-gray-300 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        No Posts in {categoryName}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Check back later or explore other categories
                    </p>
                    <Link to="/all-posts">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Browse All Posts
                        </button>
                    </Link>
                </div>
            )
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
        )
    }

    return (
        <div className='w-full py-12 bg-gray-50 min-h-screen'>
            <Container>
                {/* Category Header */}
                <div className="mb-12">
                <div className='flex md:flex-row-reverse  justify-between gap-3 md:items-center w-full flex-col  mb-6'>
                        <CategoryDropdown />
                    <div className={`inline-block w-fit bg-blue-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium `}>
                        {categoryName} Category
                    </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {categoryName} Posts
                    </h1>
                    <p className="text-gray-600 max-w-2xl">
                        {categoryDescription}
                    </p>

                    {/* Search Input */}
                    <div className="mt-6 relative">
                        <input 
                            type="text" 
                            placeholder="Search posts in this category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                            size={20} 
                        />
                    </div>
                </div>

                {/* Posts Content */}
                {renderContent()}
            </Container>
        </div>
    )
}

export default CategorizedPosts