import React, { useEffect, useState } from "react";

import appwriteCommentServices from "../appwrite/CommentConfig";
import { useSelector } from "react-redux";
import { FiEdit2, FiMessageCircle } from "react-icons/fi";
import { BsTrash2 } from "react-icons/bs";
import { BiReply, BiSend } from "react-icons/bi";
import CommentForm from "./forms/CommentForm";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  const fetchComments = () => {
    appwriteCommentServices
      .getComments(postId)
      .then((postComments) => {
        setComments(postComments.documents || []);
        console.log("comment ",postComments.documents)
      })
      .catch((error) => console.error("Error fetching comments:", error));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const deleteComment = async (commentId) => {
    try {
      await appwriteCommentServices.deleteComment(commentId);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const startEditing = (commentId) => setEditCommentId(commentId);
  const stopEditing = () => setEditCommentId(null);
  const stopReplying = () => setReplyingTo(null);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-6">
        <FiMessageCircle className="mr-3 text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
        <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
          {comments.length}
        </span>
      </div>

      {/* Comment Input */}
      <div className="mb-8">
        <CommentForm 
          postId={postId} 
          onCommentAdded={fetchComments} 
          userData={userData}
        />
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments
            .filter((comment) => !comment.parentCommentId)
            .map((comment) => (
              <ShowComment
                key={comment.$id}
                comment={comment}
                comments={comments}
                postId={postId}
                userData={userData}
                editCommentId={editCommentId}
                replyingTo={replyingTo}
                startEditing={startEditing}
                stopEditing={stopEditing}
                setReplyingTo={setReplyingTo}
                stopReplying={stopReplying}
                deleteComment={deleteComment}
                fetchComments={fetchComments}
              />
            ))
        ) : (
          <div className="text-center text-gray-500 py-6">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
}

function ShowComment({
  comment,
  comments,
  postId,
  userData,
  editCommentId,
  replyingTo,
  startEditing,
  stopEditing,
  setReplyingTo,
  stopReplying,
  deleteComment,
  fetchComments,
}) {
  const nestedComments = comments.filter(
    (child) => child.parentCommentId === comment.$id
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };



  return (
    <div className="">
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        {editCommentId === comment.$id ? (
          <CommentForm
            postId={postId}
            comment={comment}
            onCommentAdded={() => {
              fetchComments();
              stopEditing();
            }}
            isEditing={true}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <img 
                  src={`https://ui-avatars.com/api/?name=${comment.userName}&background=0D8AFF&color=fff`} 
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{comment.userName || 'Anonymous'}</h4>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.$createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{comment.commentText}</p>

            <div className="flex items-center space-x-3">
              {userData && comment.userId === userData.$id && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => startEditing(comment.$id)}
                    className="text-blue-500 hover:text-blue-700 flex items-center"
                  >
                    <FiEdit2 size={16} className="mr-1" /> Edit
                  </button>
                  <button 
                    onClick={() => deleteComment(comment.$id)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <BsTrash2 size={16} className="mr-1" /> Delete
                  </button>
                </div>
              )}

              <button 
                onClick={() => setReplyingTo(comment.$id)}
                className="text-green-500 hover:text-green-700 flex items-center"
              >
                <BiReply size={16} className="mr-1" /> Reply
              </button>
            </div>

            {replyingTo === comment.$id && (
              <div className="mt-4">
                <CommentForm
                  postId={postId}
                  parentCommentId={comment.$id}
                  onCommentAdded={() => {
                    fetchComments();
                    stopReplying();
                  }}
                  isReplying={true}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nested Comments */}
      {nestedComments.length > 0 && (
        <div className="pl-6 space-y-4">
          {nestedComments.map((nestedComment) => (
            <ShowComment
              key={nestedComment.$id}
              comment={nestedComment}
              comments={comments}
              postId={postId}
              userData={userData}
              editCommentId={editCommentId}
              replyingTo={replyingTo}
              startEditing={startEditing}
              stopEditing={stopEditing}
              setReplyingTo={setReplyingTo}
              stopReplying={stopReplying}
              deleteComment={deleteComment}
              fetchComments={fetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default Comments;