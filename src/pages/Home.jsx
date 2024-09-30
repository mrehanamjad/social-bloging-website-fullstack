import React, { useEffect, useState } from 'react'
import { Container, PostCard, Button, CardCarousel } from '../components'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';
//👆 we can change name if it is expost default: in ../../appwrite/aut.js we have export default sevices but here we import  appwriteService.
function Home() {
    const [posts, setPosts] = useState([])

    const status = useSelector((state) => state.auth.status)
    console.log('status ================>>>>>>>>>>>>>>>. ',status)
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

            {!status && posts.length === 0 ? (<div className="w-full py-8 mt-4 text-center">
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
                        <div key={post.$id} className='p-2 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-sm:w-full'>
                            <PostCard {...post} />
                        </div>
                    )) : (
                                                    <section class="bg-transparent w-full ">
        <div class="container w-full px-6 py-10 mx-auto animate-pulse">
            <h1 class="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

            <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

            <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                <div class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>

                <div class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>

                <div class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>

                <div class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>

                <div class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>

                <div class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>

                <div class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>

                <div class="w-full ">
                    <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                    
                    <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
            </div>
        </div>
    </section>
                    )}
                </div>
            </Container>)}
        </div>
    )
}

export default Home