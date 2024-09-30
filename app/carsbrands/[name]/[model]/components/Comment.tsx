// pages/comments/components/Comment.tsx
import React, { useState, useRef, useEffect } from 'react';
import Action from './Action';

import DownArrow from '../assets/down-arrow.svg';
import UpArrow from '../assets/up-arrow.svg';

interface CommentNode {
  id: number;
  name: string;
  items?: CommentNode[]; // Recursive type for nested comments
}

interface CommentProps {
  handleInsertNode: (folderId: number, item: string) => void;
  handleEditNode: (folderId: number, value: string) => void;
  handleDeleteNode: (folderId: number) => void;
  comment: CommentNode; // Use the imported type here
}

const Comment: React.FC<CommentProps> = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef.current?.innerText || '');
      setEditMode(false);
    } else {
      console.log('Adding comment:', input); // Debugging line
      if (input.trim()) { // Ensure input is not just whitespace
        handleInsertNode(comment.id, input);
        setInput('');
        setShowInput(false);
      }
    }
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div>
      <div className={comment.id === 1 ? 'inputContainer' : 'commentContainer'}>
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a comment..."
            />
            <Action
              className="reply comment"
              type="COMMENT"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: 'break-word' }}
            >
              {comment.name}
            </span>
            <div style={{ display: 'flex', marginTop: '5px' }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current) {
                        inputRef.current.innerText = comment.name || ''; // Use an empty string if undefined
                      }
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={expand ? (
                      <img src={UpArrow} alt="Collapse" />
                    ) : (
                      <img src={DownArrow} alt="Expand" />
                    )}
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => setEditMode(true)}
                  />
                  <Action
                    className="reply"
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      {expand && (
        <div style={{ paddingLeft: 25 }}>
          {showInput && (
            <div className="inputContainer">
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onChange={(e) => setInput(e.target.value)}
              />
              <Action className="reply" type="REPLY" handleClick={onAddComment} />
              <Action
                className="reply"
                type="CANCEL"
                handleClick={() => {
                  setShowInput(false);
                  if (!comment?.items?.length) setExpand(false);
                }}
              />
            </div>
          )}
          {comment.items?.map((cmnt) => (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
