import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from "react-redux"

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false; 

    useEffect(() => {
      if (slug) {
        appwriteService.getPost(slug).then((post) => {
            console.log("post",post)
            console.log("userData: ",userData)
            if (post) setPost(post);
            else navigate('/');
        })
      } else navigate("/");
    }, [slug, navigate])
    
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        })
    } 

    return post ? (
        <div className="py-8 pt-28 bg-blue-100 bg-cover bg-center relative">

                <div className='w-full h-[30rem] top-0 bg-blue-500 blur-xl absolute bg-center bg-cover'  style={{
        backgroundImage: `url("${appwriteService.getFilePreview(post.featuredImage)} ")`,
      }}></div>
            <Container>
            {isAuthor && (
                        <div className="absolute right-6 top-6 ">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button varient='blue' className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button varient='red' onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                <div className='w-full sm:w-10/12 md:w-3/4 shadow-2xl p-2 bg-white mx-auto z-0 relative'>
                <div className="w-full mb-6 text-center my-9">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold">{post.title}</h1>
                    <code>On {post.updatedOn} By {post.author} </code>
                </div>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                <article className="prose sm:prose-lg lg:prose-xl px-5 prose-video:w-28">
                    <blockquote className='p-6 lg:px-20'>
                    {parse(post.content)}
                    </blockquote>
                </article>
                <div className='p-2 px-4 border-2 border-blue-300 text-blue-500 cursor-pointer inline-block mx-10 rounded-2xl'>
                    {post.category}
                </div>
                </div>
            </Container>
        </div>
    ) : null;
}