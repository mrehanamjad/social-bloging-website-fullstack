import React, { useState, useEffect } from 'react'
import { Container } from '../components'
import appwriteService from '../appwrite/config'
import { useParams } from 'react-router-dom'
import { CategoryDropdown } from '../components/CardCarousel'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryPosts, setNoMoreCategoryPosts } from '../store/postsSlice'
import ShowMutiPosts from '../components/ShowMutiPosts'
import { Query } from 'appwrite'



function CategorizedPosts() {
    const { slug } = useParams()

    // Capitalize first letter of category
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)
    const categoryDescription = 'Explore posts in this category'

    const [loading, setLoading] = useState(false)
    const categoryData = useSelector(state => state.posts.categoryPosts[categoryName]);
    const dispatch = useDispatch()



    async function fetchPost() {
        setLoading(true)
        try {
            const posts = categoryData?.lastId ? await appwriteService.getPostsByCategory(categoryName, [Query.limit(8), Query.cursorAfter(categoryData?.lastId)]) : await appwriteService.getPostsByCategory(categoryName, [Query.limit(8),]);
            if (posts) {
                dispatch(setCategoryPosts({
                    category: categoryName,
                    posts: posts.documents,
                    lastId: posts.documents.at(-1)?.$id || null
                }));
            }
            if (posts.documents.length < 8) {
                dispatch(setNoMoreCategoryPosts(categoryName));
            }

        } catch (error) {
            console.error('Error fetching posts:', error);
            dispatch(setNoMoreCategoryPosts(categoryName));
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (!categoryData || !categoryData.data?.length) {
            fetchPost();
        }
        window.scrollTo(0, 0);
    }, [slug]);



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

                </div>

                <ShowMutiPosts
                    fetchPost={fetchPost}
                    loading={loading}
                    postsData={categoryData?.data}
                    noMorePosts={categoryData?.noMore}
                    notFoundObject={{
                        title: `No Posts in ${categoryName}`,
                        description: "Check back later or explore other categories",
                        btnText: "Browse All Posts",
                        link: "/all-posts",
                    }} notFoundBtnIcon={false} />
            </Container>
        </div>
    )
}

export default CategorizedPosts