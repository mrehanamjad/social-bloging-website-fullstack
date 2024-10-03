import React, { useState, useEffect } from 'react'
import { Button, CardCarousel, Container, Loader, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//👆 we can change name if it is expost default: in ../../appwrite/aut.js we have export default sevices but here we import  appwriteService.

function AllPosts({type}) {
    const [posts, setPosts] = useState([])
    const userData = useSelector(state => state.auth.userData)
    console.log('user data in all amd my post :: ',userData);
    const [iHaveNoPost,setIHaveNoPost] = useState(true)
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                console.log("all possts",posts.documents)
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
                    ((type === 'my' && userData && userData.$id === post.userId) || (type === 'all'))  && <div key={post.$id} className='p-2 w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-sm:w-full'>
                            <PostCard {...post} />
                            {type === 'my' && iHaveNoPost && setIHaveNoPost(false)}
                        </div>
                    )) : <Loader />}
                    {type === 'my' && posts.length > 0 && iHaveNoPost &&  <div className='text-center p-12 w-full text-2xl '>
                        You do not have any Post <br />
                        <Link to={'/add-post'}><Button className='mt-5'>Write Post Now</Button></Link>
                    </div>}
                   
                </div>
            </Container>
        </div>
    )
}

export default AllPosts