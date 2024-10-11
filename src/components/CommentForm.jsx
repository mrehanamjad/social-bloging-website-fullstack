import React from 'react';
import { Button, InputArea } from './';
import { IoMdSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import appwriteCommentServices from '../appwrite/CommentConfig';
import { useSelector } from 'react-redux';

function CommentForm({ postId, comment, onCommentAdded,className }) {
    const userData = useSelector(state => state.auth.userData);
    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            commentText: comment?.commentText || '',
            replies:  comment?.replies || ''
        }
    });

    const commentText = watch('commentText'); // Watch value of the textarea

    const submit = async (data) => {
        if (comment) {
            const updatedComment = await appwriteCommentServices.updateComment(comment.$id, {
                ...data,
                postId,
                userId: userData.$id,
            });
            if(updatedComment) onCommentAdded();
        } else {
            const newComment = await appwriteCommentServices.createComment({
                ...data,
                postId,
                userId: userData.$id,
            });
            if(newComment) onCommentAdded();
        }

        reset();        
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={`w-full flex flex-col ${className}`}>
            <InputArea
                placeholder="Write Comment here ..."
                className='placeholder:text-yellow-300 placeholder:font-bold placeholder:text-xl'
                {...register('commentText', { required: true })}
            />
            <Button className={`self-end mx-4 ${ commentText ? '' : 'hidden'}`}>
                {comment ? 'Update' : 'Comment'} <IoMdSend className='inline-block' />
            </Button>
        </form>
    );
}

export default CommentForm;


