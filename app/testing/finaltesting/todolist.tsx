import TodoItem from './todo';
import React from 'react';

interface TodoViewProps {
  todoList: {
    title: string;
    description: string;
  }[];
}

const TodoView: React.FC<TodoViewProps> = (props) => {
  return (
    <div className="p-6 bg-gray-100 text-black rounded-lg">
      <ul className="space-y-4">
        {props.todoList.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoView;