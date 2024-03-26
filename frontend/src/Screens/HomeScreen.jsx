import React from 'react'
// import TaskForm from '../components/TaskForm'
// import Task from '../components/Task'
import TaskList from '../components/TaskList'
// import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeScreen = () => {
  return (
    <>
    <div className='h-screen sm'>
     <TaskList/>
    </div>
    </>
  )
}

export default HomeScreen