import React from 'react'
import { FaCheckDouble, FaEdit, FaTrashAlt } from "react-icons/fa";

const Task = ({task,index,deleteTask,getSingleTask,setToComplete}) => {
  return (
    <div className='mt-10 bg-amber-300 sm:flex-wrap bg-amber-400'>
             <div className='items-start'>
             <p className='inline-block '>
             <b className='' >{index + 1}. </b>
             {task.title}
             </p>
             <div className='flex justify-evenly inline-block items-start '>
             <button onClick={() => setToComplete(task)}>
                  <FaCheckDouble color="purple" />
             </button>
             <button onClick={()=>getSingleTask(task)}>
                 <FaEdit color='green'/>
             </button>
             <button onClick={() => deleteTask(task._id)}>
                 <FaTrashAlt color="red" />
             </button>
             </div>
             </div>
     </div>

  )
}

export default Task

// const Task = ({
//     id,name,title,complete,editTask,deleteTask,completeTask,
// }) => {
//   return (
//     <>
//      <div className='mt-4'>
//            <b className=''>Total Tasks : 0</b> 
//             <b className='float-right'>Completed Tasks : 0</b>
//         </div>
    
//     <div className='flex justify-evenly bg-amber-200 mt-4'>
//             <p className='inline-block'>
//                 <b>Name</b>{name}
//             </p>
//             <p className='inline-block'>
//                 <b>Title</b>{title}
//             </p>
//             <button onClick={() => completeTask(id)}>
//                  <FaCheckDouble color="purple" />
//             </button>
//             <button onClick={()=>editTask(id)}>
//                 <FaEdit color='green'/>
//             </button>
//             <button onClick={() => deleteTask(id)}>
//                 <FaTrashAlt color="red" />
//             </button>
//     </div>
//     </>
//   )
// }

// export default Task


