'use client'

import Header from '@/app/components/Header'
import React, { useState, useEffect } from 'react';

import axios from 'axios'

import TodoView from './todolist';

interface Todo {
    title: string;
    description: string;
  }


const Final = () => {

    const [todolist, settodolist] = useState<Todo[]>([]); // Initialize with an empty array and define the type

    const [title, setTitle] = useState<string>(''); // Explicitly type state as a string
    const [desc, setDesc] = useState<string>('');   // Explicitly type state as a string

    // READ ALL TODOS
    useEffect(() => {
        axios.get('http://localhost:8000/api/todos')
            .then(res => {
                settodolist(res.data);
            })
            .catch(err => {
                console.error("Error fetching todos:", err);
            });
    }); 

    // Post all todos
    const addToDoHandler = () =>{
        axios.post('http://localhost:8000/api/todos', {'title':title , 'description': desc}).then( res => console.log(res))
    }; 

  return (
    <div>

        <Header/>

        <div className=' w-full bg-slate-300 p-8'>

            <div className='w-[80%]   mx-auto  text-white text-center flex flex-col gap-4 justify-start'>

                <div className='flex flex-col gap-4 mt-8'>
                    <h1 className='bg-blue-500 px-5 py-3 w-[60%] mx-auto mt-2  text-2xl rounded-md'>TASK MANAGER</h1>
                    <h2 className='bg-blue-500 px-5 py-1 w-[60%] mx-auto  text-sm rounded-md'>FASTAPI - NEXT - MONGODB</h2>
                </div>

                <div className='flex flex-col mt-8'>
                    <h3 className='bg-gray-800 px-5 py-3 w-[60%] mx-auto  text-xl rounded-md'>Add your Tasks</h3>
                    <input className='w-[60%] mx-auto my-3 px-4 py-2 rounded-md text-black' type="text" name="" id="" placeholder='Title' onChange={event => setTitle(event.target.value)}/>
                    <input className='w-[60%] mx-auto my-3 px-4 py-2 rounded-md text-black' type="text" name="" id="" placeholder='Description'  onChange={event => setDesc(event.target.value)}/>
                    <button className='bg-red-500 rounded-md px-6 py-2 w-[60%] mx-auto' onClick={addToDoHandler}>Add Task</button>
                </div>

                <div>
                    <h1 className='bg-gray-800 px-5 py-3 w-[60%] mx-auto  text-xl rounded-md'>Your Tasks</h1>
                    {/* Externalcomponent Todolist view here*/}
                    <TodoView todoList={todolist} />
                    <div>

                    </div>
                </div>

            </div>
            
        </div>
    </div>
  )
}

export default Final