const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

export const getComments = async (brandName: string, modelName: string) => {
  const res = await fetch(`${BASE_URL}/get-comments/${brandName}/${modelName}`);
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }
  return res.json();
};

export const postComment = async (brandName: string, modelName: string, commentText: string) => {
  const res = await fetch(`${BASE_URL}/post-comment/${brandName}/${modelName}`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commentText }),
  });
  
  if (!res.ok) {
    throw new Error('Failed to post comment');
  }
  return res.json();
};

export const deleteComment = async (brandName: string, modelName: string, commentId: string) => {
  const res = await fetch(`${BASE_URL}/delete-comment/${brandName}/${modelName}/${commentId}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    throw new Error('Failed to delete comment');
  }
  return res.json();
};

export const editComment = async (brandName: string, modelName: string, commentId: string, newText: string) => {
  const res = await fetch(`${BASE_URL}/edit-comment/${brandName}/${modelName}/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commentText: newText }),
  });
  
  if (!res.ok) {
    throw new Error('Failed to edit comment');
  }
  return res.json();
};

export const postReply = async (brandName: string, modelName: string, commentId: string, replyText: string) => {
  const res = await fetch(`${BASE_URL}/post-reply/${brandName}/${modelName}/${commentId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commentText: replyText }),
  });
  
  if (!res.ok) {
    throw new Error('Failed to post reply');
  }
  return res.json();
};

export const likeComment = async (brandName: string, modelName: string, commentId: string) => {
  const res = await fetch(`${BASE_URL}/like-comment/${brandName}/${modelName}/${commentId}`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to like comment');
  }
  return res.json();
};
  