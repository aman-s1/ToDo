"use client"
import React, { useState } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")

  const [mainTask, setMainTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault();

    setMainTask([...mainTask, { title, desc, completed: false }]);

    settitle("");
    setdesc("");
  }

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i,1);
    setMainTask(copyTask);
  }

  const toggleCompletion = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setMainTask(updatedTasks);
  };

  let renderTask = <h2 className='text-center italic font-bold'>No Task Available</h2>;

  const filteredTasks = mainTask.filter((task) => !task.completed);

  if (filteredTasks.length > 0) {
    renderTask = filteredTasks.map((task, index) => {
      return (
        <li key={index} className='flex items-center justify-between mb-5'>
          <div className='flex items-center justify-between mb-5 w-2/3'>
            <h5 className={task.completed ? 'line-through text-2xl font-semibold' : 'text-2xl font-semibold'}>
              {task.title}
            </h5>
            <h6 className={task.completed ? 'line-through text-xl font-semibold' : 'text-xl font-semibold'}>
              {task.desc}
            </h6>
          </div>
          <div>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => toggleCompletion(index)}
              className='mr-2'
            />
            <button
              onClick={() => deleteHandler(index)}
              className='bg-red-400 text-white px-4 py-2 ml-10 rounded font-bold'
            >
              Delete
            </button>
          </div>
        </li>
      );
    });
  }
  return (
    <>
    <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>ToDo List</h1>
    <form onSubmit={submitHandler} className='text-center'>
      <input 
      type='text' 
      className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2' 
      placeholder='Enter Task Here' 
      value={title} 
      onChange={(e) => {
        settitle(e.target.value);
      }}/>

      <input 
      type='text' 
      className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2' 
      placeholder='Enter Description Here' 
      value={desc}
      onChange={(e) => {
        setdesc(e.target.value);
      }}/>

      <button className='bg-black text-white px-4 py-3 text-2xl m-5 font-bold rounded'>Add Task</button>
    </form>
    <hr/>
    <div className='p-8 bg-slate-200'>
      <ul>
        {renderTask}
      </ul>
    </div>
    </>
  )
}

export default page