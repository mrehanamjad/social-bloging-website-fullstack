import React, { useState, useEffect } from 'react'
import { Container } from '../components'
import appwriteService from '../appwrite/config'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryDropdown } from '../components/CardCarousel'
import { setAllPosts, setNoMoreAllPosts } from '../store/postsSlice'
import { Query } from 'appwrite'
import ShowMutiPosts from '../components/ShowMutiPosts'

function AllPosts() {
    const [loading, setLoading] = useState(false)
    const postsData = useSelector(state => state.posts)
    const dispatch = useDispatch()



    async function fetchPost() {
        setLoading(true)
        try {
            const posts = postsData.lastAllPostId ? await appwriteService.getPosts([Query.limit(8), Query.cursorAfter(postsData.lastAllPostId)]) : await appwriteService.getPosts([Query.limit(8),]);
            if (posts) {
                dispatch(setAllPosts({
                    allPostData: posts.documents,
                    lastAllPostId: posts.documents.at(-1)?.$id || null
                }));
            }
            if (!posts || (posts && posts.documents.length < 8)) {
                console.log("less than 8")
                dispatch(setNoMoreAllPosts())
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (!postsData.lastAllPostId) {
            fetchPost();
        }
    }, []);

    return (
        <div className='w-full py-12 bg-gray-50 min-h-screen'>
            <Container>
                <div className="mb-8">
                    <div className='flex justify-between gap-3 md:items-center w-full max-md:flex-col  mb-6'>
                        <h1 className="text-4xl font-bold text-gray-900 ">
                            All Posts
                        </h1>
                        <CategoryDropdown />

                    </div>
                </div>

                <ShowMutiPosts fetchPost={fetchPost} loading={loading} postsData={postsData.allPostData} notFoundObject={{ title: "No Posts Found", description: "No posts are available at the moment." }} noMorePosts={postsData.noMoreAllPosts} />

            </Container>
        </div>
    )
}

export default AllPosts




