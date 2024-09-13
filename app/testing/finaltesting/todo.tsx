import axios from 'axios';
import React from 'react';

interface TodoItemProps {
  todo: {
    title: string;
    description: string;
  };
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const deleteTodoHandler = (title: string) => {
    axios
      .delete(`http://localhost:8000/api/todos/${title}`)
      .then((res) => console.log(res.data));
  };

  return (
    <div className="p-4">
      <p>
        <span className="font-bold underline">{props.todo.title} :</span>
        {props.todo.description}
        <button onClick={() => deleteTodoHandler(props.todo.title)} className="bg-red-500 text-white px-3 py-1 rounded-full ml-4 hover:bg-red-600">
          X
        </button>
      </p>
      <hr className="my-4 border-gray-300" />
    </div>
  );
};

export default TodoItem;
