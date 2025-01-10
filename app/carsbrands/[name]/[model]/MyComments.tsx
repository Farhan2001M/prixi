import React, { useState, useEffect , useRef } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CustomToast, CustomToastContainer } from "../../../components/CustomToastService";

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

interface AnonymousComment {
  anonyTextId: string;
  anonyText: string;
  timestamp: string; // ISO format timestamp
}

const MyComments: React.FC<MyCommentsProps> = ({ brandName, modelName }) => {
  
  const [useremail, setuseremail] = useState<string>(''); // Input for a new useremail
  const [commentText, setCommentText] = useState<string>(''); // Input for a new comment
  const [editingCommentText, setEditingCommentText] = useState<string>(''); // Input for editing a comment
  const [comments, setComments] = useState<Comment[]>([]); // List of top-level comments
  const [anonymousComments, setAnonymousComments] = useState<AnonymousComment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // Track which comment is being edited
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>(''); // State for reply input
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyText, setEditingReplyText] = useState<string>(''); // For the reply text being edited

  const [userImage, setUserImage] = useState<string | null>(null);

  const [sortedComments, setSortedComments] = useState<Comment[]>([]); // For sorted comments
  const [sortingMode, setSortingMode] = useState('default'); // Sorting mode: 'default', 'top-comments', 'most-loved'
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Sorting order: 'asc' or 'desc'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<null | (() => void)>(null);
  // Refs for the buttons
  const buttonClicked = useRef(false); // Tracks if a button was clicked
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Reference for the textarea

  const handleFocusLoss = (action: () => void) => {
    if (buttonClicked.current) {
      // If a button was clicked, skip modal logic
      buttonClicked.current = false;
      action();
      return;
    }

    if (commentText.trim() !== "") {
      setPendingAction(() => action); // Save the pending action
      setIsModalOpen(true); // Open the modal
    } else {
      action(); // Perform the action directly if no text is present
    }
  };

  const handleDiscard = () => {
    setCommentText(""); // Clear the textarea
    setIsModalOpen(false); // Close the modal
    if (pendingAction) pendingAction(); // Perform the pending action
  };

  const handleContinue = () => {
    setIsModalOpen(false); // Close the modal
    // Refocus on the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (commentText.trim() !== "") {
        e.preventDefault();
        e.returnValue = ""; // Standard for showing the browser warning
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [commentText]);

  
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
            const { image, GenImage } = await response.json();
            const finalImage = image ? image : GenImage;
            setUserImage(`data:image/png;base64,${finalImage}`);
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
    } catch (error) {
        console.error('Error fetching user email:', error);
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, []); // Empty dependency array ensures this runs once on component mount



  useEffect(() => {
    fetchComments();
    fetchAnonymousComments();
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

  const fetchAnonymousComments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/get-anonymous-comments/${brandName}/${modelName}`);
      const data: { anonymousComments: AnonymousComment[] } = await response.json(); // Explicitly type the response
      setAnonymousComments(data.anonymousComments); // Update state
    } catch (err) {
      console.error("Error fetching anonymous comments:", err);
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
        return data.image || data.GenImage; // Return custom image if available, otherwise GenImage
    } else {
        console.error("Error fetching user image");
        return null;
    }
  };


  const postComment = async () => {
    if (commentText == ""){
      CustomToast.error("Empty comment cannot be posted.😥");
      console.log("empty comment cannot be posted")
      return
    }
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

  const postAnonymousComment = async () => {
    if (commentText == "") {
      CustomToast.error("Empty Anonymous comment cannot be posted.😥");
      return;
    }
    const response = await fetch(`http://localhost:8000/post-anonymous-comment/${brandName}/${modelName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        anonyText: commentText,
        timestamp: new Date().toISOString(),
      }),
    });
    if (response.ok) {
      setCommentText(''); // Clear textarea
      fetchAnonymousComments(); // Refresh AnonymousComments
    } else {
      console.error("Error posting anonymous comment");
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
      CustomToast.success("Comment Deleted Successfully.😋");
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
      CustomToast.success("Comment Edited Successfully.😋");

    } else if (response.status === 403) {
      console.error('You can only edit your own comments.');
    } else {
      CustomToast.error("Comment text needs to be changed before saving Successfully.🙂");
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
    if (replyText == ""){
      console.log("empty comment cannot be posted")
      return
    }
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
      CustomToast.success("Reply Posted Successfully.😋");
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
      CustomToast.success("Reply Deleted Successfully.😋");
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

    if (editingReplyText == ""){
      console.log("empty comment cannot be posted")
      return
    }
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
        CustomToast.success("Reply Edited Successfully.😋");
    } else {
        CustomToast.error("Reply text needs to be changed before saving Successfully.🙂");
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
    <div className="min-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
  
      {/* Sorting Buttons */}
      <div className="flex justify-center mb-4 w-full">
        <div className="flex w-full  space-x-4">
          {/* Left Button - "Most Replied" */}
          <button
            onClick={sortByReplies}
            className="flex-1 px-4 py-2 text-base font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          >
            {sortingMode === 'top-comments' && sortOrder === 'asc'
              ? 'Show Most Replied Comments (Descending)'
              : 'Show Most Replied Comments (Ascending)'}
          </button>

          {/* Center Button - "Reset View" */}
          <button
            onClick={resetView}
            className="min-w-64 px-6 py-2 text-base font-medium text-white bg-red-600 rounded hover:bg-red-700 transition duration-200"
          >
            Reset View
          </button>

          {/* Right Button - "Most Liked" */}
          <button
            onClick={sortByLikes}
            className="flex-1 px-4 py-2 text-base font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          >
            {sortingMode === 'most-loved' && sortOrder === 'asc'
              ? 'Show Most Liked Comments 💖 (Descending)'
              : 'Show Most Liked Comments 💖 (Ascending)'}
          </button>
        </div>
      </div>
  
      {/* Comment Posting Section */}
      {/* Textarea */}
      <textarea
        ref={textareaRef} // Attach the ref to the textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
        rows={4}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:border-blue-500"
        onBlur={() =>
          setTimeout(() => {
            handleFocusLoss(() => {});
          }, 0) // Ensure this runs after button clicks are processed
        }
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <p className="text-gray-800 mb-4">
              Your comment will be discarded if you leave without posting it. Do you want to continue?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDiscard}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
              >
                Discard Comment
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Continue Writing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onMouseDown={() => (buttonClicked.current = true)} // Set flag on button press
          onClick={postComment}
          className="w-full py-2 text-base font-medium text-white bg-green-600 rounded hover:bg-green-700 transition duration-200"
        >
          Post Comment
        </button>
        <button
          onMouseDown={() => (buttonClicked.current = true)} // Set flag on button press
          onClick={postAnonymousComment}
          className="w-full py-2 text-base font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        >
          Post Anonymously
        </button>
      </div>

      {/* Comments Display */}
      <div className="mt-6">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <div
              key={comment.commentId}
              className="border-b border-gray-200 pb-4 mb-4"
            >
              {/* Editing logic */}
              {editingCommentId === comment.commentId ? (
                <>
                  <textarea
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    rows={2}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveEdit(comment.commentId)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2 mb-2">
                      {comment.userEmail === useremail && userImage && (
                          <img
                              src={userImage}
                              alt="User"
                              className="w-8 h-8 rounded-full"
                          />
                      )}
                      <p className="flex-1">{comment.commentText}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    <strong>By:</strong> {comment.userEmail} <strong>At:</strong>{' '}
                    {new Date(comment.timestamp).toLocaleString()} ({comment.Likes.length + " likes"})
                  </p>
  
                  {/* Like/Unlike button based on Likes count */}
                  {comment.userEmail !== useremail && (
                    <button
                      onClick={() => handleLikeComment(comment.commentId)}
                      className="mt-2 text-red-500 hover:text-red-600"
                    >
                      {comment.Likes.includes(useremail) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  )}
  
                  {/* Edit, Delete, Reply buttons */}
                  {comment.userEmail === useremail && (
                    <div className="mt-2">
                      <button
                        onClick={() => startEditing(comment.commentId)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit Comment
                      </button>
                      <button
                        onClick={() => deleteComment(comment.commentId)}
                        className="ml-4 text-sm text-red-600 hover:underline"
                      >
                        Delete Comment
                      </button>
                    </div>
                  )}
                  {comment.userEmail !== useremail && (
                    <button
                      onClick={() => startReplying(comment.commentId)}
                      className="mt-2 text-sm text-blue-600 hover:underline ml-4"
                    >
                      Reply Comment
                    </button>
                  )}
  
                  {replyingCommentId === comment.commentId && (
                    <div className="mt-2 ml-6">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        rows={2}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => postReply(comment.commentId)}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition duration-200"
                        >
                          Post Reply
                        </button>
                        <button
                          onClick={cancelReply}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
  
                  {/* Render replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 border-l border-gray-300 pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.commentId} className="mb-4">
                          {editingReplyId === reply.commentId ? (
                            <>
                              <textarea
                                value={editingReplyText}
                                onChange={(e) => setEditingReplyText(e.target.value)}
                                rows={2}
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => saveEditReply(comment.commentId, reply.commentId)}
                                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingReplyId(null)}
                                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center space-x-2 mb-2">
                                {reply.userEmail === useremail && userImage && (
                                  <img
                                    src={userImage}
                                    alt="User"
                                    className="w-6 h-6 rounded-full"
                                  />
                                )}
                                <p className="flex-1">{reply.commentText}</p>
                              </div>
  
                              <p className="text-sm text-gray-600">
                                <strong>By:</strong> {reply.userEmail} <strong>At:</strong>{' '}
                                {new Date(reply.timestamp).toLocaleString()}
                              </p>
  
                              {/* Reply Edit and Delete buttons */}
                              {reply.userEmail === useremail && (
                                <div className="mt-2">
                                  <button
                                    onClick={() => startEditingReply(comment.commentId, reply.commentId, reply.commentText)}
                                    className="text-sm text-blue-600 hover:underline"
                                  >
                                    Edit Reply
                                  </button>
                                  <button
                                    onClick={() => deleteReply(comment.commentId, reply.commentId)}
                                    className="ml-4 text-sm text-red-600 hover:underline"
                                  >
                                    Delete Reply
                                  </button>
                                </div>
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
          <p className="text-center text-gray-500">No comments yet.</p>
        )}
      </div>

      {/* Dividing Line */}
      <hr className="my-6 border-gray-300" />

      {/* Anonymous Comments */}
      <h3 className="text-lg font-bold mb-4">Anonymous Opinions</h3>
      {anonymousComments.length > 0 ? (
        anonymousComments.map((anon) => (
          <div
            key={anon.anonyTextId}
            className="border-b border-gray-200 pb-4 mb-4"
          >
            <p className="flex-1">{anon.anonyText}</p>
            <p className="text-sm text-gray-600">
              <strong>At:</strong>{' '}
              {new Date(anon.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No anonymous comments yet.</p>
      )}

      {/* ToastContainer for notifications */}
      <CustomToastContainer />

    </div>
  );
};

export default MyComments;


