import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { useParams } from 'react-router-dom'

function CategorizedPosts() {
    const [posts, setPosts] = useState([])
    const {slug} = useParams()

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
        <div className='w-full py-8'>
            <Container>
                <h1 className='text-center text-3xl'></h1>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        post.category.toLowerCase() === slug.toLowerCase() && (<div key={post.$id} className='p-2 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-sm:w-full'>
                            <PostCard {...post} />
                        </div>)
                    ))}
                </div>
            </Container>
        </div>
    )
}


export default CategorizedPosts