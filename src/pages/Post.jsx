import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from "react-redux"
import { FaCommentAlt, FaShare } from 'react-icons/fa'
import { BiSolidCategory } from 'react-icons/bi'
import ShareCard from '../components/ShareCard'
import Comments from '../components/Comments'
import { HashLink } from 'react-router-hash-link';

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const location = useLocation()

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log("post", post)
                console.log("userData: ", userData)
                if (post) setPost(post);
                else navigate('/');
            }).catch((error) =>  error)
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

    const [showShareC, setShowShareC] = useState(false)

    return post ? (
        <div className="py-8 pt-28 bg-blue-100 bg-cover bg-center relative">

            <div className='w-full h-[30rem] top-0 bg-blue-500 blur-xl absolute bg-center bg-cover' style={{
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
                        <h1 className="text-2xl sm:text-4xl xl:text-5xl font-serif font-bold px-4 py-1">{post.title}</h1>
                        <code>On {post.updatedOn} By {post.author} </code>
                    </div>
                    <div className='p-1  px-10 flex justify-between items-center max-sm:flex-col'>
                        <Link to={`/all-posts/category/${post.category}`}>
                        <span className='cursor-pointer bg-blue-950 my-1 text-blue-200  text-sm font-medium transition-colors hover:bg-[#F5F5F5] hover:text-[#60A5FA] px-2 py-1 rounded-md flex justify-center items-center gap-2'><BiSolidCategory />
                            {post.category}</span></Link>
                        <div className='flex gap-2'>
                            <HashLink to='#comments' smooth >
                                <button className="cursor-pointer my-1 bg-blue-100 relative inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                                    <FaCommentAlt />
                                    Comment
                                </button>
                            </HashLink>
                            <button onClick={() => setShowShareC(true)} className="cursor-pointer my-1 bg-blue-100 relative inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                                <FaShare />
                                Share
                            </button>
                        </div>
                    </div>
                    <ShareCard shareUrl={`${window.location.origin}${location.pathname}${location.search}`} shareIconSize={'45'} showShareCard={showShareC} onClickCross={() => setShowShareC(false)} />

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
                    <Comments postId={post.$id}/>
                </div>
            </Container>
        </div>
    ) : null;
}