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
                    userId: userData.$id
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

            // approach 1:
            // const slug = value.toLowerCase().replace(/ /g,'-')
            // setValue('slug',slug)
            // return slug

            // 2nd approach:
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-z\d\s]+/g, '-')
                // its regex means in global(whole string) Replace each character by '-' but not a-z A-Z digits spaces || ^ = not encludes || g = global 
                .replace(/\s/g, '-') //  means replace spaces by '-' 

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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* left part */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            {/* right part */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
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
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
