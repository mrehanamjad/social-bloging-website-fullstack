// import React, { useEffect, useState } from "react";
// import { Button, CommentForm } from "./";
// import appwriteCommentServices from "../appwrite/CommentConfig";
// import { useSelector } from "react-redux";

// function Comments({ postId }) {
//   const [comments, setComments] = useState([]);
//   const [editCommentId, setEditCommentId] = useState(null); // Track the comment being edited
//   const [replyingTo, setReplyingTo] = useState(null); // Track which comment is being replied to
//   const userData = useSelector((state) => state.auth.userData);

//   // Function to fetch comments and set them
//   const fetchComments = () => {
//     appwriteCommentServices
//       .getComments(postId)
//       .then((postComments) => {
//         setComments(postComments.documents || []); // Ensure it's an array
//       })
//       .catch((error) => console.error("Error fetching comments:", error));
//   };

//   // Fetch comments when component is mounted
//   useEffect(() => {
//     fetchComments();
//   }, [postId]);

//   // Function to delete a comment
//   const deleteComment = async (commentId) => {
//     try {
//       await appwriteCommentServices.deleteComment(commentId);
//       fetchComments();
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };


//   const startEditing = (commentId) => setEditCommentId(commentId);

//   const stopEditing = () => setEditCommentId(null);
  
//   const stopReplying = () => setReplyingTo(null);

//   return (
//     <div id="comments" className="px-10">
//       <h1 className="text-2xl font-bold text-blue-600">Comments:</h1>

//       {/* Comment Form for adding new comments */}
//       <div className="w-full flex flex-col">
//         <CommentForm postId={postId} onCommentAdded={fetchComments} />
//       </div>

//       <div className="px-10 py-10 text-sm">
//         {comments.length > 0 ? (
//           comments.map((comment) => {
//             if (!comment || !comment.$id) return null;

//            return (
//               <div key={comment.$id} className="mb-4">
//                 {/* If editing, show CommentForm, otherwise show comment text */}
//                 {!comment.parentCommentId && (editCommentId === comment.$id ? (
//                   <CommentForm
//                     postId={postId}
//                     comment={comment}
//                     onCommentAdded={() => {
//                       fetchComments();
//                       stopEditing();
//                     }}
//                   />
//                 ) : (
//                   <>
//                     <p className="mb-2">{comment.commentText || "No content"}</p>
//                     <div className="flex gap-2 flex-wrap">
//                       {/* Show Edit/Delete options if the user is the author */}
//                       {userData && comment.userId === userData.$id && (
//                         <div className="space-x-2">
//                           <button
//                             className="text-blue-400"
//                             onClick={() => startEditing(comment.$id)}
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="text-red-400"
//                             onClick={() => deleteComment(comment.$id)}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}

//                       {/* Reply button and form */}
//                       {replyingTo === comment.$id ? (
//                         <div className="w-full">
//                           <CommentForm
//                             postId={postId}
//                             parentCommentId={comment.$id}
//                             onCommentAdded={() => {
//                               fetchComments();
//                               stopReplying();
//                             }}
//                           />
//                         </div>
//                       ) : (
//                         <button
//                           onClick={() => setReplyingTo(comment.$id)}
//                           className="text-gray-600"
//                         >
//                           Reply
//                         </button>
//                       )}
//                     </div>
//                     {comments.map(com => (
                     
//                      com.parentCommentId === comment.$id && <p className="mb-2">{com.commentText || "No content"}</p>
                     
//                     ))}
//                   </>
                  
//                 ))}
//               </div>
//             );
//           })
//         ) : (
//           <p>No comments available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Comments;



import React, { useEffect, useState } from "react";
import { Button, CommentForm } from "./";
import appwriteCommentServices from "../appwrite/CommentConfig";
import { useSelector } from "react-redux";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null); // Track the comment being edited
  const [replyingTo, setReplyingTo] = useState(null); // Track which comment is being replied to
  const userData = useSelector((state) => state.auth.userData);

  // Function to fetch comments and set them
  const fetchComments = () => {
    appwriteCommentServices
      .getComments(postId)
      .then((postComments) => {
        setComments(postComments.documents || []); // Ensure it's an array
      })
      .catch((error) => console.error("Error fetching comments:", error));
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
      console.error("Error deleting comment:", error);
    }
  };

  const startEditing = (commentId) => setEditCommentId(commentId);
  const stopEditing = () => setEditCommentId(null);
  const stopReplying = () => setReplyingTo(null);

  return (
    <div id="comments" className="px-10">
      <h1 className="text-2xl font-bold text-blue-600">Comments:</h1>

      {/* Comment Form for adding new comments */}
      <div className="w-full flex flex-col">
        <CommentForm postId={postId} onCommentAdded={fetchComments} />
      </div>

      <div className="px-10 py-10 text-sm">
        {comments.length > 0 ? (
          comments.map((comment) =>
            comment && !comment.parentCommentId ? (
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
            ) : null
          )
        ) : (
          <p>No comments available</p>
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

  return (
    <div key={comment.$id} className="mb-4 ml-4 border-l-2 pl-4">
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
          <p className="mb-2">{comment.commentText || "No content"}</p>
          <div className="flex gap-2 flex-wrap">
            {/* Show Edit/Delete options if the user is the author */}
            {userData && comment.userId === userData.$id && (
              <div className="space-x-2">
                <button
                  className="text-blue-400"
                  onClick={() => startEditing(comment.$id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-400"
                  onClick={() => deleteComment(comment.$id)}
                >
                  Delete
                </button>
              </div>
            )}

            {/* Reply button and form */}
            {replyingTo === comment.$id ? (
              <div className="w-full">
                <CommentForm
                  postId={postId}
                  parentCommentId={comment.$id}
                  onCommentAdded={() => {
                    fetchComments();
                    stopReplying();
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => setReplyingTo(comment.$id)}
                className="text-gray-600"
              >
                Reply
              </button>
            )}
          </div>
        </>
      )}

      {/* Render nested comments */}
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
  );
}

export default Comments;
