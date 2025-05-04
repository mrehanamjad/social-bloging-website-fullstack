import React from 'react';
import { Button, InputArea } from './';
import { IoMdSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import appwriteCommentServices from '../appwrite/CommentConfig';
import { useSelector } from 'react-redux';
import { FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function CommentForm({ postId, comment, onCommentAdded, parentCommentId, className }) {
    const userData = useSelector(state => state.auth.userData);
    const status = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const [isCommenting, setIsCommenting] = React.useState(false);
    const [backendError, setBackendError] = React.useState("")
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: {
            commentText: comment?.commentText || '',
        }
    });

    const submit = async (data) => {

        if (!status) {
            navigate('/login')
            return;
        }

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
                setBackendError("Something went wrong, please try again later");
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
                setBackendError("Something went wrong, please try again later");
            }
        }

        setIsCommenting(false);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={`w-full flex flex-col ${className}`}>
            <InputArea
                placeholder={parentCommentId ? 'Write a reply...' : "Write a Comment..."}
                {...register('commentText', { required: "Comment is required" })}
            />
            {errors.commentText && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FaTimesCircle className="mr-2" />
                    {errors.commentText.message}
                </p>
            )}
            {backendError && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FaTimesCircle className="mr-2" />
                    {backendError}
                </p>
            )}
            <Button isLoading={isCommenting} disabled={isCommenting} className={`self-end mx-1`}>
                {parentCommentId ? (comment ? 'Update' : 'Reply') : (comment ? 'Update' : 'Comment')} <IoMdSend className='inline-block' />
            </Button>
        </form>
    );
}

export default CommentForm;


