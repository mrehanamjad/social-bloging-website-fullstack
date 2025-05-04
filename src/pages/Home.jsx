import React, { useEffect, useState } from 'react';
import { Container, PostCard,  CardCarousel, Loader } from '../components';
import appwriteService from '../appwrite/config';
import Hero from '../components/Hero';


function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
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

                        {/* {!status && posts.length === 0 ? (
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
                        ) : ( */}
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
                        {/* )} */}
                    </div>
                </section>
            </Container>
        </div>
    );
}

export default Home;