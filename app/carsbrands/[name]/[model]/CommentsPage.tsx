// pages/comments/CommentsPage.tsx
import React, { useState } from 'react';
import Comment from './components/Comment';
import useNode from './hooks/useNode';
import styles from './styles.module.css';
import { CommentNode } from './hooks/types'; // Adjust path as necessary



const initialComments: CommentNode = {
  id: 1,
  items: [],
};

const CommentsPage: React.FC = () => {
  const [commentsData, setCommentsData] = useState<CommentNode>(initialComments);
  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId: number, item: string) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure); // This should trigger a re-render
  };

  const handleEditNode = (folderId: number, value: string) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId: number) => {
    const finalStructure = deleteNode(commentsData, folderId);
    setCommentsData(finalStructure);
  };

  return (
    <div className={styles.App}>
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
    </div>
  );
};

export default CommentsPage;
