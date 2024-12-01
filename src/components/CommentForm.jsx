import React from 'react';
import { Button, InputArea } from './';
import { IoMdSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import appwriteCommentServices from '../appwrite/CommentConfig';
import { useSelector } from 'react-redux';

function CommentForm({ postId, comment, onCommentAdded,parentCommentId,className }) {
    const userData = useSelector(state => state.auth.userData);
    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            commentText: comment?.commentText || '',
        }
    });

    const commentText = watch('commentText'); // Watch value of the textarea

    const submit = async (data) => {
        if (comment) {
            const updatedComment = await appwriteCommentServices.updateComment(comment.$id, {
                ...data,
                postId,
                userId: userData.$id,
                parentCommentId: parentCommentId
            });
            if(updatedComment) onCommentAdded();
        } else {
            const newComment = await appwriteCommentServices.createComment({
                ...data,
                postId,
                userId: userData.$id,
                parentCommentId: parentCommentId
            });
            if(newComment) onCommentAdded();
        }

        reset();        
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={`w-full flex flex-col ${className}`}>
            <InputArea
                placeholder={parentCommentId?'Write a reply...':"Write a Comment..."}
                {...register('commentText', { required: true })}
            />
            <Button className={`self-end mx-1`}>
                {parentCommentId ? (comment ? 'Update' : 'Reply') : (comment ? 'Update' : 'Comment')} <IoMdSend className='inline-block' />
            </Button>
        </form>
    );
}

export default CommentForm;


