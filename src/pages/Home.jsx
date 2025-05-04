import React, { useEffect, useState } from 'react';
import { Container,  CardCarousel,  Button } from '../components';
import appwriteService from '../appwrite/config';
import Hero from '../components/Hero';
import { useDispatch, useSelector } from 'react-redux';
import ShowMutiPosts from '../components/ShowMutiPosts';
import { Query } from 'appwrite';
import { setAllPosts, setNoMoreAllPosts } from '../store/postsSlice';
import { Link } from 'react-router-dom';


function Home() {
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
            console.log(postsData.noMoreAllPosts)
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
        <div className='w-full bg-gray-50'>

            <Hero />
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


                        <ShowMutiPosts fetchPost={() => { }} loading={loading} postsData={postsData.allPostData} noMorePosts={true} notFoundObject={{ title: "No Posts Available", description: "Be the first to create a post and start sharing your story!" }} />
                        <div className='flex justify-center items-center mt-3'>
                            <Link to={"/all-posts"} >
                                <Button varient='white' className='px-12'>View All</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
}

export default Home;