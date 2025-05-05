import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    FaEdit,
    FaImage,
    FaTimesCircle,
    FaCalendarAlt,
    FaTag,
    FaSave
} from 'react-icons/fa'

function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const [previewImage, setPreviewImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [backendError, setBackendError] = useState("")

    function getCurrentDate() {
        const today = new Date();
        return today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const submit = async (data) => {
        try {
            setIsLoading(true)
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    appwriteService.deleteFile(post.featuredImage)
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                    updatedOn: getCurrentDate(),
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        updatedOn: getCurrentDate(),
                        userId: userData.$id,
                        author: userData.name,
                    })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);

            if (error.message.toLowerCase().includes("id already exists")) {
                setBackendError("Post with this slug (Name) already exists!");
            } else if( error.message.toLowerCase().includes("no longer than ")) {
                setBackendError("Post content characters limit exceeded. Please shorten your content.");
            }else if (error.message.toLowerCase().includes("missing required attribute")) {
                setBackendError("Please fill in all required fields.");
            } else if (error.message.toLowerCase().includes("invalid type for attribute")) {
                setBackendError("Invalid data in one or more fields.");
            } else if (error.message.toLowerCase().includes("unauthorized")) {
                setBackendError("You don't have permission to perform this action.");
            } else if (error.message.toLowerCase().includes("invalid file")) {
                setBackendError("Please upload a valid image file.");
            } else {
                setBackendError("Something went wrong. Please try again.");
            }

        } finally {
            setIsLoading(false)

        }
    }

    const slugTransform = useCallback((value) => {
        if (value && (typeof value === 'string')) {
            let transformedValue = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-z\d\s]+/g, '-')
                .replace(/\s/g, '-')

            return transformedValue.length > 36
                ? transformedValue.substring(0, 33) + "-" + (Math.floor(Math.random() * 90) + 10)
                : transformedValue;
        }
        return '';
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }

            if (name === "image" && value.image && value.image[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result);
                }
                reader.readAsDataURL(value.image[0]);
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <div className="w-full bg-white shadow-2xl rounded-2xl overflow-hidden p-8 mt-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <FaEdit className="mr-3 text-blue-500" />
                {post ? 'Update Post' : 'Create New Post'}
            </h2>

            <form onSubmit={handleSubmit(submit)} className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div>
                        <Input
                            label="Title"
                            placeholder="Enter post title"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 transition duration-300"
                            icon={<FaTag className="text-gray-400" />}
                            {...register("title", {
                                required: "Title is required",
                                minLength: {
                                    value: 5,
                                    message: "Title must be at least 5 characters"
                                }
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <FaTimesCircle className="mr-2" />
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            label="Slug"
                            placeholder="Auto-generated slug"
                            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
                            {...register("slug", { required: true })}
                            readOnly
                        />
                    </div>

                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>

                {/* Right Column */}
                <div className="space-y-6 ">
                    <Select
                        label="Category"
                        options={[
                            'Technology', 'Life & Culture', 'Business & Finance',
                            'Health & Fitness', 'Art & Creativity',
                            'Travel & Adventure', 'Food & Cooking',
                            'Entertainment & Sports Media', 'Self-Improvement'
                        ]}
                        className="w-full"
                        {...register("category", { required: "Category is required" })}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="cursor-pointer flex-grow">
                                <Input
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    className="hidden"
                                    {...register("image", {
                                        required: !post && "Featured image is required"
                                    })}
                                />
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition">
                                    <FaImage className="mx-auto text-3xl text-gray-400 mb-2" />
                                    <span className="text-gray-500">
                                        {previewImage || post ? 'Change Image' : 'Upload Image'}
                                    </span>
                                </div>
                            </label>
                            {(previewImage || (post && post.featuredImage)) && (
                                <div className="w-32 h-32 rounded-lg overflow-hidden">
                                    <img
                                        src={previewImage || appwriteService.getFilePreview(post.featuredImage)}
                                        alt="Featured"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                <FaTimesCircle className="mr-2" />
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    <Select
                        label="Status"
                        options={["active", "inactive"]}
                        className="w-full"
                        {...register("status", { required: true })}
                    />

                    <div className="flex items-center space-x-4">
                        <FaCalendarAlt className="text-gray-500" />
                        <span className="text-sm text-gray-600">
                            {getCurrentDate()}
                        </span>
                    </div>

                    <Button
                        type="submit"
                        varient='blue'
                        className="w-full flex items-center justify-center space-x-2 py-3"
                        isLoading={isLoading}
                    >
                        <FaSave />
                        <span>{post ? 'Update Post' : 'Publish Post'}</span>
                    </Button>
                    <div className='text-red-500 py-3 px-2'>{backendError}</div>
                </div>
            </form>
        </div>
    );
}

export default PostForm