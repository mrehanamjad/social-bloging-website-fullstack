import React, { useEffect, useState } from 'react';
import { Container, PostCard, Button, CardCarousel, Loader } from '../components';
import appwriteService from '../appwrite/config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false); // Add a loading state
    const status = useSelector((state) => state.auth.status);
    const dataStore = useSelector((state) => state.auth.userData)
    console.log("user data stored",dataStore)
    useEffect(() => {
        if (status) {
            setLoading(true); 
            appwriteService.getPosts().then((postsData) => {
                if (postsData) {
                    setPosts(postsData.documents);
                }
                setLoading(false); 
            }).catch(error => {
                setLoading(false);
            });
        }
    }, [status]); 

    return (
        <div className='w-full'>
            <div className='h-[140vh] w-full bg-cover bg-center bg-fixed ' style={{ backgroundImage: `url("https://cdn.pixabay.com/photo/2020/07/28/11/43/circles-5444818_1280.png")` }} >
                <div className='w-full h-full bg-black/65  flex flex-col justify-between'>
                <div className='h-full flex flex-col justify-center items-center text-center gap-8 px-8'>
                    <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 mb-2'>Write<span className='text-gray-200'>,</span> Share<span className='text-gray-200'>, and</span> Explore <span className='text-gray-200'>Ideas</span></h1>
                    <h2 className='text-2xl lg:font-bold font-semibold text-white lg:px-10'>Join a vibrant community of writers and readers. Share your thoughts, explore fresh ideas, and engage with stories that matter.</h2>
                    <div className='flex gap-3 '>
                        <Link to={status ? 'add-post' : "/login"}><Button className='px-6 py-3 font-bold' varient={'blue'}>Start Writing</Button></Link>
                        <Link to={status ? 'all-posts' : "/login"}><Button className='px-6 py-3 font-bold' varient={'white'}>Explore Blogs</Button></Link>
                    </div>
                </div>
            <CardCarousel />
                </div>
            </div>


            {!status && posts.length === 0 ? (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    <Link to={'/login'}>Login to read posts</Link>
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                <Container>
                    <h1 className='font-bold text-4xl text-center m-6'>Posts: </h1>
                    <div className='flex flex-wrap'>
                        {loading ? (
                            <Loader />
                        ) : (
                            posts.length > 0 ? posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-sm:w-full'>
                                    <PostCard {...post} />
                                </div>
                            )) : <p className='text-xl text-center p-6'>No posts available</p>
                        )}
                    </div>
                </Container>
            )}
        </div>
    );
}

export default Home;
