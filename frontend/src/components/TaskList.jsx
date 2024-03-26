import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TaskList = () => {
  const [tasks,setTasks]=useState([])  
  const [completedTask,setCompletedTask]=useState(0)
  const [isLoading,setIsLoading] = useState(false)
  const [isEdit,setIsEdit]=useState(false)
  const [taskID,setTaskID]=useState('')
  const [formData, setFormData] = useState({
        title:" ",
        completed:false
    })

    const {title} = formData

    const handleInputChange=(e)=>{
        const {title,value} = e.target
        setFormData({...formData,[title]:value})
    };

 //getTasks
    const getTasks = async()=>{
      setIsLoading(true)
      try {
        const {data} = await axios.get('http://localhost:4000/api/tasks')
        setTasks(data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error.message)
        console.log(error)
        setIsLoading(false)
      }
    }

    useEffect(()=>{
      getTasks()
    },[])


    const createTask = async(e)=>{
        e.preventDefault()
        if(title === ""){
          return toast.error("Input field can't be empty")
        }
        try {
         const response = await axios.post('http://localhost:4000/api/tasks',{
          title
         });
         const responseData = response.data;
        if(responseData){
          localStorage.setItem('formData', JSON.stringify(formData));
          toast.success("Task created successfully");
          setFormData({ ...formData, title: "" });
          getTasks();
        }else{
          toast.error("It will not stored. Try Again")
        }
        } catch (error) {
          toast.error(error.message)
        }
    };
//Delete Task
const deleteTask=async(id)=>{
  try {
    await axios.delete(`http://localhost:4000/api/tasks/${id}`)
    getTasks();
    toast.success("Task deleted successfully");
  } catch (error) {
    toast.error("Task not deleted successfully.Please Try again");
  }
}

useEffect(()=>{
  const completeTask=tasks.filter(task => task.completedTask);
  setCompletedTask(completeTask)
},[tasks])

const getSingleTask = async(task)=>{
  try {
    // const response = await axios.get(`http://localhost:4000/api/tasks/${id}`);
    // const taskData = response.data;
    setFormData({name: task.title,completed:false });
    setTaskID(task._id)
    console.log(task._id)
    setIsEdit(true)
  } catch (error) {
    toast.error("Failed to fetch task data for editing.");
    console.error("Error in getSingleTask:", error);
  }
    
}

const updateTask = async(e)=>{
  e.preventDefault()
  if(formData.title.trim() === " "){
    return toast.error("Input field cannot be empty.")
  }
  try {
    await axios.patch(`http://localhost:4000/api/tasks/${taskID}`,formData)
    setFormData({...formData, title:" "});
    setIsEdit(false);
    console.log(formData);
    console.log(formData.title)
    toast.success("Task edited successfully")
    getTasks();
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  }
}

const setToComplete = async (task) => {
  try {
    // Update task to mark it as completed
    await axios.patch(`http://localhost:4000/api/tasks/${task._id}`, { completed: true });
    
    // Notify user
    toast.success("Completed task successfully");

    // Refresh tasks
    getTasks();
  } catch (error) {
    // Handle error
    console.error("Error completing task:", error);
    toast.error("Error completing task. Please try again.");
  }
}


  return (
    <div>
      <h1 className=' p-2'><b>Task List</b></h1>  
     <TaskForm name={title} 
     handleInputChange={handleInputChange} 
     createTask={createTask}
     isEdit={isEdit}
     updateTask={updateTask}
     />
     {tasks.length>0 && (
         <div className='bg-sky-300 mt-4'>
         <p className='inline-block lg:text-sm p-2'><b >Total Tasks :</b> {tasks.length}</p>
         <p className='inline-block float-end lg:text-sm p-2'><b >Completed Tasks : </b>{completedTask.length} </p>
    </div>
  )}
    <hr />
    {
      isLoading && (
        <div className='flex-center h-screen'>
        </div>
      )}
      {
       !isLoading && tasks.length ===0 ? (
        <p className='p-2 m-10 bg-amber-400'>No Task added. Please add a task</p>
       ) : (
        <>
        {tasks.map((task,index)=>{
          return <Task key={task._id} task={task}
          index={index}
          deleteTask={deleteTask}
          getSingleTask={getSingleTask}
          setToComplete={setToComplete}
          />;   
        })}
        </>
       )
      }
    
    <ToastContainer/>
    </div>
 
    
  )
}

export default TaskList