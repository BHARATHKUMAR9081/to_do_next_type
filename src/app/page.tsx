import React from 'react';
import AddTaskBar from '@/components/AddTaskBar';
import Search from '@/components/Search';
import TaskManager from '@/components/TaskManager';

const Homepage = () => {
  return (
    <div className='flex flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20  rounded-lg p-10 overflow-y-auto scrollbar-hide border-[1px] border-gray-700 justify-center h-screen'>
      <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold '>Ongoing Tasks</h1>
        <p className='text-gray-400 mt-2'>Tasks that are currently in progress</p>
      </div>
      <div className='flex flex-1  flex-col items-center justify-center mt-10 border-[1px] border-gray-700 rounded-lg p-4 w-[800px]'>
        <p className='text-gray-400'>Add Task</p>
        <div className='flex flex-row items-center mt-4 justify-between gap-4 w-full'>
          <AddTaskBar />
        </div>
        <p className='text-gray-400 mt-2'>Search</p> 
        <div className='flex flex-row items-center mt-1 justify-between gap-4 w-full'>
          <Search/>
        </div>
      </div>
          <div className='flex flex-1  flex-col items-center justify-center mt-10 border-[1px] border-gray-700 rounded-lg p-4 w-[800px]'>
        <p className='text-gray-400'>Your Task</p>
        <div className='flex flex-row items-center mt-4 justify-between gap-4 w-full'>
          <TaskManager />
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default Homepage