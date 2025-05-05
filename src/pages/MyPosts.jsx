import React, { useState, useEffect } from 'react'
import {  Container} from '../components'
import appwriteService from '../appwrite/config'
import { useDispatch, useSelector } from 'react-redux'
import { setMyPosts,  setNoMoreMyPosts } from '../store/postsSlice'
import { Query } from 'appwrite'
import ShowMutiPosts from '../components/ShowMutiPosts'

function MyPosts() {
    const [loading, setLoading] = useState(false)
    const postsData = useSelector(state => state.posts)
    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()



  async function fetchPost() {
        setLoading(true)
            try {
                const posts = postsData.lastMyPostId ? await appwriteService.getMyPosts(userData.$id,[Query.limit(8), Query.cursorAfter(postsData.lastAllPostId),]) : await appwriteService.getMyPosts(userData.$id,[Query.limit(8),]);
                if (posts) {
                    dispatch(setMyPosts({
                        myPostData: posts.documents,
                        lastMyPostId: posts.documents.at(-1)?.$id || null
                    }));
                }
                if (!posts || (posts && posts.documents.length < 8)) {
                    dispatch(setNoMoreMyPosts())
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                dispatch(setNoMoreMyPosts())
            } finally {
                setLoading(false);
            }
    }

    useEffect(() => {
        if (!postsData.lastMyPostId) {
            fetchPost();
        }
    }, []);

    return (
        <div className='w-full py-12 bg-gray-50 min-h-screen'>
            <Container>
                <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 ">
                            My Posts
                        </h1>
                </div>

                <ShowMutiPosts fetchPost={fetchPost} loading={loading} noMorePosts={postsData.noMoreMyPosts} postsData={postsData.myPostData} notFoundObject={{title:"No Posts Found",description:"Start sharing your thoughts and experiences with the world.",btnText:"Write Your First Post",link:"/add-post"}}  />
            </Container>
        </div>
    )
}

export default MyPosts