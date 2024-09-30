import React, { useState, useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

interface Comment {
  commentId: string;
  userEmail: string;
  commentText: string;
  Likes: string[];
  timestamp: string;
  replies: Comment[];
}

interface MyCommentsProps {
  brandName: string;
  modelName: string;
}

const MyComments: React.FC<MyCommentsProps> = ({ brandName, modelName }) => {
  
  const [useremail, setuseremail] = useState<string>(''); // Input for a new useremail
  const [commentText, setCommentText] = useState<string>(''); // Input for a new comment
  const [editingCommentText, setEditingCommentText] = useState<string>(''); // Input for editing a comment
  const [comments, setComments] = useState<Comment[]>([]); // List of top-level comments
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // Track which comment is being edited
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>(''); // State for reply input
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyText, setEditingReplyText] = useState<string>(''); // For the reply text being edited

  const [userImage, setUserImage] = useState<string | null>(null);

  const [sortedComments, setSortedComments] = useState<Comment[]>([]); // For sorted comments
  const [sortingMode, setSortingMode] = useState('default'); // Sorting mode: 'default', 'top-comments', 'most-loved'
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Sorting order: 'asc' or 'desc'

  
  const fetchUserImage = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:8000/user-image', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const { image } = await response.json();
        setUserImage(`data:image/png;base64,${image}`);  /////////  WHY NOT JPG OR PNG BUT STILL WORKS
      }
    } catch (error) {
      console.error('Failed to fetch user image:', error);
    }
  };

  useEffect(() => {  
    fetchUserImage();
  }, []);

  const fetchUserEmail = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    try {
        const response = await fetch('http://localhost:8000/user/email', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user email');
        }
        const data = await response.json();
        const fetchedEmail = data.email;
        // Set the email in state and localStorage
        setuseremail(fetchedEmail);
        localStorage.setItem('userEmail', fetchedEmail);
        console.log('User email stored in localStorage:', fetchedEmail);
    } catch (error) {
        console.error('Error fetching user email:', error);
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, []); // Empty dependency array ensures this runs once on component mount



  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/get-comments/${brandName}/${modelName}`);
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const UserhasImage = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('You need to be logged in to check for an image.');
      return null;
    }
  
    const response = await fetch('http://localhost:8000/user-image', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.image; // This will be the user's image or null
    } else {
      console.error("Error fetching user image");
      return null;
    }
  };

  const postComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('You need to be logged in to post a comment.');
      return;
    }

    const userImage = await UserhasImage();
    if (!userImage) {
      console.error('You do not have an image. Please upload one before posting a comment.');
      return;
    }

    const response = await fetch(`http://localhost:8000/post-comment/${brandName}/${modelName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentText, 
        timestamp: new Date().toISOString() 
      }),
    });

    if (response.ok) {
      setCommentText(''); 
      fetchComments(); 
    } else {
      console.error("Error posting comment");
    }
  };

  const deleteComment = async (commentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('You need to be logged in to delete a comment.');
      return;
    }
    const response = await fetch(`http://localhost:8000/delete-comment/${brandName}/${modelName}/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Send the token for user authentication
      },
    });
    if (response.ok) {
      fetchComments(); // Refresh the comments after successful deletion
    } else if (response.status === 403) {
      console.error('You can only delete your own comments.');
    } else {
      console.error('Error deleting comment');
    }
  };

  const startEditing = async (commentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('You need to be logged in to edit a comment.');
      return;
    }
    // Check ownership before allowing edit
    const response = await fetch(`http://localhost:8000/check-comment-owner/${brandName}/${modelName}/${commentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const { isOwner } = await response.json();
      if (isOwner) {
        const comment = comments.find(c => c.commentId === commentId);
        if (comment) {
          setEditingCommentId(commentId);
          setEditingCommentText(comment.commentText); // Set editing text here
        }
      } else {
        console.error('You can only edit your own comments.');
      }
    } else {
      console.error('Error checking comment ownership.');
    }
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  const saveEdit = async (commentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('You need to be logged in to edit a comment.');
      return;
    }
    const response = await fetch(`http://localhost:8000/edit-comment/${brandName}/${modelName}/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentText: editingCommentText }), // Use editingCommentText
    });
    if (response.ok) {
      setEditingCommentText(''); // Clear the editing text
      setEditingCommentId(null);
      fetchComments(); // Refresh comments after editing
    } else if (response.status === 403) {
      console.error('You can only edit your own comments.');
    } else {
      console.error('Error editing comment');
    }
  };


  const startReplying = async (commentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('You need to be logged in to reply to a comment.');
      return;
    }





    const response = await fetch(`http://localhost:8000/check-comment-owner/${brandName}/${modelName}/${commentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const { isOwner } = await response.json();
      if (isOwner) {
        console.error('You cannot reply to your own comment.');
      } else {
        setReplyingCommentId(commentId);
        setReplyText(''); // Clear reply input
      }
    } else {
      console.error('Error checking comment ownership.');
    }
  };

  const cancelReply = () => {
    setReplyingCommentId(null);
    setReplyText('');
  };

  const postReply = async (commentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('You need to be logged in to reply to a comment.');
      return;
    }

    const response = await fetch(`http://localhost:8000/post-reply/${brandName}/${modelName}/${commentId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentText: replyText, timestamp: new Date().toISOString() }),
    });

    if (response.ok) {
      setReplyingCommentId(null);
      setReplyText('');
      fetchComments(); // Refresh comments after posting reply
    } else {
      console.error('Error posting reply');
    }
  };

  const deleteReply = async (commentId: string, replyId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('You need to be logged in to delete a reply.');
      return;
    }
    const response = await fetch(`http://localhost:8000/delete-reply/${brandName}/${modelName}/${commentId}/${replyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      fetchComments(); // Refresh comments after successful deletion
    } else if (response.status === 403) {
      console.error('You can only delete your own replies.');
    } else {
      console.error('Error deleting reply');
    }
  };

  const startEditingReply = async (commentId:string, replyId: string, replyText: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('You need to be logged in to edit a reply.');
        return;
    }
    const response = await fetch(`http://localhost:8000/check-reply-owner/${brandName}/${modelName}/${commentId}/${replyId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (response.ok) {
        const { isOwner } = await response.json();
        if (isOwner) {
            setEditingReplyId(replyId);
            setEditingReplyText(replyText);
        } else {
            console.error('You can only edit your own replies.');
        }
    } else {
        console.error('Error checking reply ownership.');
    }
  };

  const saveEditReply = async (commentId: string, replyId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('You need to be logged in to save a reply edit.');
        return;
    }
    const response = await fetch(`http://localhost:8000/edit-reply/${brandName}/${modelName}/${commentId}/${replyId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentText: editingReplyText }), // Use editingReplyText
    });
    if (response.ok) {
        setEditingReplyText(''); // Clear the editing text
        setEditingReplyId(null);
        fetchComments(); // Refresh comments after editing
    } else {
        console.error('Error editing reply');
    }
  };

  const handleLikeComment = async (commentId:string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('You need to be logged in to like a comment.');
        return;
    }

    const response = await fetch(`http://localhost:8000/like-comment/${brandName}/${modelName}/${commentId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const result = await response.json();
        console.log(result.message);  // "Liked the comment" or "Unliked the comment"
        // You may want to refetch the comments here to update the likes count
        fetchComments(); // Refresh comments after editing
    } else {
        const errorMessage = await response.text();
        console.error(`Error: ${errorMessage}`);
    }
  };



  // Function to handle sorting based on reply count (Top Comments)
  const sortByReplies = () => {
    const newOrder = sortingMode === 'top-comments' && sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...comments].sort((a, b) => {
      const diff = a.replies.length - b.replies.length;
      return newOrder === 'asc' ? diff : -diff;
    });
    setSortedComments(sorted);
    setSortingMode('top-comments');
    setSortOrder(newOrder);
  };

  // Function to handle sorting based on likes (Most Loved Comments)
  const sortByLikes = () => {
    const newOrder = sortingMode === 'most-loved' && sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...comments].sort((a, b) => {
      const diff = a.Likes.length - b.Likes.length;
      return newOrder === 'asc' ? diff : -diff;
    });
    setSortedComments(sorted);
    setSortingMode('most-loved');
    setSortOrder(newOrder);
  };

  // Reset view to default comments order (original order)
  const resetView = () => {
    setSortingMode('default');
    setSortedComments(comments); // Show original comments
  };

  // useEffect to handle sorting changes whenever comments or sorting options change
  useEffect(() => {
    if (sortingMode === 'default') {
      setSortedComments(comments); // Default to original comments
    }
  }, [comments, sortingMode]);


  
  return (
    <div>
      <h3>Comments</h3>

      {/* Sorting Buttons */}
      <div className='flex gap-7'>
        <button onClick={sortByReplies}>
          {sortingMode === 'top-comments' && sortOrder === 'asc'
            ? 'Show Top Comments (Descending)'
            : 'Show Top Comments (Ascending)'}
        </button>

        <button onClick={sortByLikes}>
          {sortingMode === 'most-loved' && sortOrder === 'asc'
            ? 'Show Most Loved Comments (Descending)'
            : 'Show Most Loved Comments (Ascending)'}
        </button>

        <button onClick={resetView}>Reset View</button>
      </div>

      {/* Comment Posting Section */}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
        rows={4}
      />
      <button onClick={postComment}>Post Comment</button>

      {/* Comments Display */}
      <div>
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <div key={comment.commentId} style={{paddingLeft: '20px' , marginBottom: '15px' }}>
              {/* Editing logic */}
              {editingCommentId === comment.commentId ? (
                <>
                  <textarea
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    rows={2}
                  />
                  <button onClick={() => saveEdit(comment.commentId)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     {/* Display user image only for the owner's comments */}
                     {comment.userEmail === useremail && userImage && (
                       <img src={userImage} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                     )}
                     <p>{comment.commentText}</p>
                  </div>

                  <p><strong>By:</strong> {comment.userEmail} <strong>At:</strong> {new Date(comment.timestamp).toLocaleString()}</p>
                  ({comment.Likes.length})

                  {/* Like/Unlike button based on Likes count */}
                  {comment.userEmail !== useremail && (
                    <button onClick={() => handleLikeComment(comment.commentId)}>
                      {comment.Likes.includes(useremail) ? <FaHeart /> : <FaRegHeart />} 
                    </button>
                  )}

                  {/* Other buttons like Edit, Delete, Reply */}

                  {comment.userEmail == useremail && (
                    <>
                      <button onClick={() => startEditing(comment.commentId)}>Edit Comment</button>
                      <button onClick={() => deleteComment(comment.commentId)}>Delete Comment</button>
                    </>
                  )}
                  {comment.userEmail !== useremail && (
                    <button onClick={() => startReplying(comment.commentId)}>Reply Comment</button>
                  )}

                  {replyingCommentId === comment.commentId && (
                    <div style={{ paddingLeft: '20px' }}>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        rows={2}
                      />
                      <button onClick={() => postReply(comment.commentId)}>Post Reply</button>
                      <button onClick={cancelReply}>Cancel</button>
                    </div>
                  )}

                  {/* Render replies */}
                  {comment.replies.length > 0 && (
                    <div style={{ paddingLeft: '30px' , marginTop: '15px' }}>
                      {comment.replies.map((reply) => (
                        <div key={reply.commentId}>
                          {editingReplyId === reply.commentId ? (
                            <>
                              <textarea
                                value={editingReplyText}
                                onChange={(e) => setEditingReplyText(e.target.value)}
                                rows={2}
                              />
                              <button onClick={() => saveEditReply(comment.commentId, reply.commentId)}>Save</button>
                              <button onClick={() => setEditingReplyId(null)}>Cancel</button>
                            </>
                          ) : (
                            <>

                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                {/* Display user image only for the owner's comments */}
                                {comment.userEmail === useremail && userImage && (
                                  <img src={userImage} alt="User" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                                )}
                                <p>{reply.commentText}</p>
                              </div>

                              <p><strong>By:</strong> {reply.userEmail} <strong>At:</strong> {new Date(reply.timestamp).toLocaleString()}</p>

                              {/* Reply Edit and Delete buttons */}
                              {comment.userEmail == useremail && (
                                <>
                                  <button onClick={() => startEditingReply(comment.commentId, reply.commentId, reply.commentText)}>Edit Reply</button>
                                  <button onClick={() => deleteReply(comment.commentId, reply.commentId)}>Delete Reply</button>
                                </>
                              )}
                              
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyComments;

















































//   return (
//     <div>
//       <h3>Comments</h3>
//       <textarea
//         value={commentText}
//         onChange={(e) => setCommentText(e.target.value)}
//         placeholder="Add a comment"
//         rows={4}
//       />
//       <button onClick={postComment}>Post Comment</button>

//       <div>
//         {comments.length > 0 ? (
//           comments.map((comment) => (
//             <div key={comment.commentId} style={{ marginBottom: '10px' }}>
//               {editingCommentId === comment.commentId ? (
//                 <>
//                   <textarea
//                     value={editingCommentText}
//                     onChange={(e) => setEditingCommentText(e.target.value)}
//                     rows={2}
//                   />
//                   <button onClick={() => saveEdit(comment.commentId)}>Save</button>
//                   <button onClick={cancelEdit}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     {/* Display user image only for the owner's comments */}
//                     {comment.userEmail === useremail && userImage && (
//                       <img src={userImage} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
//                     )}
//                     <p>{comment.commentText}</p>
//                   </div>
                  
//                   <p>
//                     <strong>By:</strong> {comment.userEmail} <strong>At:</strong> {new Date(comment.timestamp).toLocaleString()}
//                   </p>
                  
//                   {/* Do not show the like button for user's own comments */}
//                   {comment.userEmail !== useremail && (
//                     <button onClick={() => handleLikeComment(comment.commentId)}>
//                       {comment.Likes.includes(useremail) ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />} ({comment.Likes.length})
//                     </button>
//                   )}

//                   <button onClick={() => startEditing(comment.commentId)}>Edit</button>
//                   <button onClick={() => deleteComment(comment.commentId)}>Delete</button>
//                   <button onClick={() => startReplying(comment.commentId)}>Reply</button>

//                   {replyingCommentId === comment.commentId && (
//                     <div style={{ paddingLeft: '20px' }}>
//                       <textarea
//                         value={replyText}
//                         onChange={(e) => setReplyText(e.target.value)}
//                         placeholder="Write a reply..."
//                         rows={2}
//                       />
//                       <button onClick={() => postReply(comment.commentId)}>Post Reply</button>
//                       <button onClick={cancelReply}>Cancel</button>
//                     </div>
//                   )}

//                   {/* Render replies */}
//                   {comment.replies.length > 0 && (
//                     <div style={{ paddingLeft: '20px' }}>
//                       {comment.replies.map((reply) => (
//                         <div key={reply.commentId}>
//                           {editingReplyId === reply.commentId ? (
//                             <>
//                               <textarea
//                                 value={editingReplyText}
//                                 onChange={(e) => setEditingReplyText(e.target.value)}
//                                 rows={2}
//                               />
//                               <button onClick={() => saveEditReply(comment.commentId, reply.commentId)}>Save</button>
//                               <button onClick={() => setEditingReplyId(null)}>Cancel</button>
//                             </>
//                           ) : (
//                             <>
//                               <div style={{ display: 'flex', alignItems: 'center' }}>
//                                 {/* Display user image only for the owner's replies */}
//                                 {reply.userEmail === useremail && userImage && (
//                                   <img src={userImage} alt="User" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
//                                 )}
//                                 <p>{reply.commentText}</p>
//                               </div>
                              
//                               <p>
//                                 <strong>By:</strong> {reply.userEmail} <strong>At:</strong> {new Date(reply.timestamp).toLocaleString()}
//                               </p>

//                               <button onClick={() => startEditingReply(comment.commentId, reply.commentId, reply.commentText)}>Edit Reply</button>
//                               <button onClick={() => deleteReply(comment.commentId, reply.commentId)}>Delete Reply</button>
//                             </>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No comments yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };













