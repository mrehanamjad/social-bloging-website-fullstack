import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import authService from '../../appwrite/auth'
import appwriteService from '../../appwrite/config'
//👆 we can change name if it is expost default: in ../../appwrite/aut.js we have export default sevices but here we import  appwriteService.
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register,
        handleSubmit,
        watch, // to monitor field continuosly
        setValue,
        control, // we pass this control as it is in our RTE.jsx
        getValues, // to grap values of all form
        formState: {errors},
    } = useForm({
        defaultValues: { // if user edits the post then we need defaultValues
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    function getCurrentDate() {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    console.log("userData: =====================", userData)

    const submit = async (data) => {
        if (post) {
            // handelling file 
            // this is the benefits of react-hook-form that form can accept such data if we build such form from scrach then it takes much much efforts 
            //data has directly access to images array we need first image therefore:
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
                const fileld = file.$id;
                data.featuredImage = fileld
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
    }

    // we watch title and when title changes then we call slugTransform
    const slugTransform = useCallback((value) => {
        if (value && (typeof value === 'string')) {
            // we us slug as document id and document id must be less then 36 chars therefore:
            // if(value.length > 35) value = value.slice(0,34) + "-";

            // approach 1:
            // const slug = value.toLowerCase().replace(/ /g,'-')
            // setValue('slug',slug)
            // return slug

            // 2nd approach:

            let transformedValue = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-z\d\s]+/g, '-')
                // its regex means in global(whole string) Replace each character by '-' but not a-z A-Z digits spaces || ^ = not encludes || g = global 
                .replace(/\s/g, '-') //  means replace spaces by '-' 
                if (transformedValue.length > 36) {
                    return transformedValue.substring(0, 33) + '--'; // Append '--' if length exceeds 36
                }
                return transformedValue;
        }
        return '';
    }, [])


    // 🤔 interview question: How optimize when you call method in useEffect 
    // 🙋 solution: store the method in a variable i.e subscription & unsubscribe it in return's callback. so that it does not call continuously.
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe() // for memory_management and optimization

    }, [watch, slugTransform, setValue])


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col  sm:flex-row sm:gap-0 gap-5">
            {/* left part */}
            <div className="sm:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 w-full text-lg py-1 px-2 rounded outline-none "
                    {...register("title", { required: "Title is required" })}
                />
                                {errors.title && <p className="text-red-600">{errors.title.message}</p>} {/* Error for Title */}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 w-full text-lg py-1 px-2 rounded outline-none"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            {/* right part */}
            <div className="sm:w-1/3 px-2">
                <Select
                    options={['Technology', 'Life & Culture', 'Business & Finance', 'Health & Fitness', 'Creative Writing', 'Travel & Adventure', 'Food & Cooking', 'Entertainment & Sports Media', 'Self-Improvement']}
                    label="Category:"
                    className="mb-4"
                    {...register("category", { required: true })}
                />
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post && "Featured image is required" })}
                />
                {errors.image && <p className="text-red-600">*{errors.image.message}</p>}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status:"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" varient='blue' className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
