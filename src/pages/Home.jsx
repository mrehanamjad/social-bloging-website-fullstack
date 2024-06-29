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
        <div className='w-full pb-8'>
            <div className='h-screen w-full bg-cover bg-center bg-fixed' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHdyaXRpbmd8ZW58MHx8MHx8fDA%3D")` }} >
                <div className='w-full h-full bg-black/35 flex flex-col justify-center items-center  text-center  gap-8 px-8 '>
                    <h1 className='text-5xl md:text-8xl lg:text-7xl scroll font-extrabold text-gray-800 mb-2'>Welcome to <code className='text-blue-700 bg-white p-2 rounded-md'>NextMedium</code></h1>
                    <h2 className='text-3xl lg:font-bold font-semibold text-white '>Discover, read, and share your stories with the world.</h2>
                    <div className='flex gap-3 '>
                        <Button className='hover:bg-transparent border-2 border-blue-600'>Start Writing</Button>
                        <Button className='border-2 border-blue-600 hover:bg-blue-600' bgColor='bg-transparent '>Reacd What Other Posted</Button>
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