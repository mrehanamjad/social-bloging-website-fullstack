import React, { useEffect, useState } from 'react'
import { Container, PostCard, Button, CardCarousel } from '../components'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
//👆 we can change name if it is expost default: in ../../appwrite/aut.js we have export default sevices but here we import  appwriteService.
function Home() {
    const [posts, setPosts] = useState([])

    const status = useSelector((state) => state.auth.status)
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) setPosts(posts.documents)
                console.log(posts)
        })
    }, [])

    // if (posts.length === 0) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Login to read posts
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }

    return (
        <div className='w-full pb-8 bg'>
            <div className='h-screen w-full bg-cover bg-center bg-fixed' style={{ backgroundImage: `url("https://cdn.pixabay.com/photo/2020/07/28/11/43/circles-5444818_1280.png")` }} >
                <div className='w-full h-full bg-black/65 flex flex-col justify-center items-center  text-center  gap-8 px-8 '>
                    <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 mb-2'>Write<span className='text-gray-200'>,</span> Share<span className='text-gray-200'>, and</span> Explore <span className='text-gray-200'>Ideas</span></h1>
                    <h2 className='text-2xl lg:font-bold font-semibold text-white lg:px-10 '>Join a vibrant community of writers and readers. Share your thoughts, explore fresh ideas, and engage with stories that matter.</h2>
                    <div className='flex gap-3 '>
                        <Button className='px-6 py-3 font-bold' varient={'blue'}>Start Writing</Button>
                        <Button className='px-6 py-3 font-bold' varient={'white'}>Explore Blogs</Button>
                    </div>
                </div>
            </div>

            <CardCarousel />

            {!status && posts.length === 0 ?(<div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>) : (<Container>
                <h1 className='font-bold text-3xl text-center my-6'>Posts: </h1>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? posts.map((post) => (
                        <div key={post.$id} className='p-2 sm:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    )) : (<p className='text-center text-3xl w-full'>Loading Posts ...</p>)}
                </div>
            </Container>)}
        </div>
    )
}

export default Home