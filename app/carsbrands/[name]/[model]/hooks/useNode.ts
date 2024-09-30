// pages/comments/hooks/useNode.ts
import { useState } from 'react';
import { CommentNode } from './types'; // Adjust path as necessary



const useNode = () => {
  const insertNode = (tree: CommentNode, commentId: number, item: string): CommentNode => {
    if (tree.id === commentId) {
      const newItem = {
        id: new Date().getTime(),
        name: item,
        items: [],
      };

      // Initialize items if undefined
      tree.items = tree.items ? [...tree.items, newItem] : [newItem];
      return tree;
    }

    // Ensure items is defined when mapping
    const latestNode = tree.items?.map((ob) => insertNode(ob, commentId, item)) || [];

    return { ...tree, items: latestNode };
  };

  const editNode = (tree: CommentNode, commentId: number, value: string): CommentNode => {
    if (tree.id === commentId) {
      tree.name = value;
      return tree;
    }

    // Ensure items is defined when iterating
    tree.items?.forEach((ob) => {
      editNode(ob, commentId, value);
    });

    return { ...tree };
  };

  const deleteNode = (tree: CommentNode, id: number): CommentNode => {
    if (tree.items) {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
    }
    return tree;
  };

  return { insertNode, editNode, deleteNode };
};

export default useNode;
