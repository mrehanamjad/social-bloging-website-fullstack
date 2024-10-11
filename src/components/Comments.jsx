import React, { useEffect, useState } from 'react';
import { Button, CommentForm } from './';
import appwriteCommentServices from '../appwrite/CommentConfig';
import { useSelector } from 'react-redux';

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null); // Track the comment being edited
  const userData = useSelector(state => state.auth.userData);

  // Function to fetch comments and set them
  const fetchComments = () => {
    appwriteCommentServices.getComments(postId)
      .then((postComments) => {
        setComments(postComments.documents);
      })
      .catch((error) => console.error('Error fetching comments:', error));
  };

  // Fetch comments when component is mounted
  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Function to delete a comment
  const deleteComment = async (commentId) => {
    try {
      await appwriteCommentServices.deleteComment(commentId);
      fetchComments(); 
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Function to start editing a comment
  const startEditing = (commentId) => {
    setEditCommentId(commentId);
  };

  // Function to stop editing
  const stopEditing = () => {
    setEditCommentId(null);
  };

  return (
    <div id="comments" className="px-10">
      <h1 className="text-2xl font-bold text-blue-600">Comments:</h1>
      
      {/* Comment Form for adding new comments */}
      <div className="w-full flex flex-col">
        <CommentForm postId={postId} onCommentAdded={fetchComments} />
      </div>
      
      <div className="px-10 py-10 text-sm">
        {comments.length > 0 ? (
          comments.map((comment, i) => (
            <div key={i} className="mb-4">
              {/* If editing, show CommentForm, otherwise show comment text */}
              {editCommentId === comment.$id ? (
                <CommentForm
                  postId={postId}
                  comment={comment}
                  onCommentAdded={() => {
                    fetchComments();
                    stopEditing();
                  }}
                />
              ) : (
                <>
                  <p className="mb-2">{comment.commentText}</p>
                  <div className="flex gap-2">
                    {comment.userId === userData.$id && (
                      <div className="space-x-2">
                        <button className="text-blue-400" onClick={() => startEditing(comment.$id)}>Edit</button>
                        <button className="text-red-400" onClick={() => deleteComment(comment.$id)}>Delete</button>
                      </div>
                    )}
                    <button>Reply</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
}

export default Comments;
