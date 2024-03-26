import React from 'react'

const TaskForm = ({createTask,title,handleInputChange,isEdit,updateTask}) => {
 

  return (
    <form onSubmit={isEdit ? updateTask : createTask} >
        <div className='border-2'> 
        <input className='border-spacing-px p-2 outline-none' type="text"
         placeholder='Add a Task' title='title'
         value={title}
        onChange={handleInputChange}
        />
         <button type='submit' className='bg-sky-300  p-2 float-right' >{isEdit ? "Edit" :"Add"}</button>  
        </div>
       
    </form>
  )
}

export default TaskForm




 // const [title, setTitle] = useState('');
    // const handleInputChange=(e)=>{
    //    setTitle(e.target.value);
    // };
    
    // const handleSubmit=(e)=>{
    //   e.preventDefault();
    //   createTask(title);
    //   setTitle('');
    //   localStorage.setItem("TaskTitle", title);
    // };