import React, { useState, useEffect } from 'react'
import { CardCarousel, Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
//👆 we can change name if it is expost default: in ../../appwrite/aut.js we have export default sevices but here we import  appwriteService.

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                console.log(posts.documents)
            }
        })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className='w-full py-8 min-h-screen'>
            <Container>
                <div className="flex flex-wrap">
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
            </Container>
        </div>
    )
}

export default AllPosts