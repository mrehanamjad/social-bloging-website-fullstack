import React from 'react';
import { Button, InputArea } from './';
import { IoMdSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import appwriteCommentServices from '../appwrite/CommentConfig';
import { useSelector } from 'react-redux';

function CommentForm({ postId, comment, onCommentAdded, parentCommentId, className }) {
    const userData = useSelector(state => state.auth.userData);
    const [isCommenting, setIsCommenting] = React.useState(false);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            commentText: comment?.commentText || '',
        }
    });

    const submit = async (data) => {
        setIsCommenting(true);
        if (comment) {
            try {

                const updatedComment = await appwriteCommentServices.updateComment(comment.$id, {
                    ...data,
                    postId,
                    userId: userData.$id,
                    parentCommentId: parentCommentId
                });
                if (updatedComment) onCommentAdded();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const newComment = await appwriteCommentServices.createComment({
                    ...data,
                    postId,
                    userId: userData.$id,
                    parentCommentId: parentCommentId
                });
                if (newComment) onCommentAdded();
            } catch (error) {
                console.log(error);
            }
        }

        setIsCommenting(false);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={`w-full flex flex-col ${className}`}>
            <InputArea
                placeholder={parentCommentId ? 'Write a reply...' : "Write a Comment..."}
                {...register('commentText', { required: true })}
            />
            <Button isLoading={isCommenting} disabled={isCommenting} className={`self-end mx-1`}>
                {parentCommentId ? (comment ? 'Update' : 'Reply') : (comment ? 'Update' : 'Comment')} <IoMdSend className='inline-block' />
            </Button>
        </form>
    );
}

export default CommentForm;


