import Task from "../models/taskModel.js";

//@description create task
//@route       POST / api/task
//@access       protected
const createTask=async(req,res)=>{
    const {title,description}=req.body;
    // console.log(title,description)
try {
    const task=await Task.create({title,description})
    // console.log(task)
    return res.status(200).json(task)
} catch (error) {
    return res.status(400).json({Message: error.message})
}
}

const getSingleTask= async(req,res)=>{
    try {
        const task=await Task.findById(req.params.id)
        if(task){
            return res.status(200).json(task)
        }else{
            return res.status(404).json({
            message: "Task not found"
            })
        }
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const getTasks=async(req,res)=>{
    try {
        const tasks = await Task.find({})
    if(tasks){
        return res.status(200).json(tasks)
    }  
    else{
        return res.status(400).json({message: "Tasks not found"})
    }
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }    
}

const updateTask=async(req,res)=>{
    const {id}=req.params;
    const {title} = req.body;
    try {
        const task=await Task.findByIdAndUpdate(
            id, // Use id directly to find the task by its ID
            { title }, // Update the title with the new value from req.body
            { new: true } // Set { new: true } to return the updated document
        )
        if(task){
            return res.status(200).json(task)
        }else{
            return res.status(400).json({message: "Task Id not found"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
        console.log(error.message)
    }
}

const deleteTask=async(req,res)=>{
    const {id}=req.params
    // console.log(id)
    try {
        const task =await Task.findByIdAndDelete(id)

        if(task){
            return res.status(200).json({message: "Task deleted"})
        }else{
            return res.status(400).json({message: "Task Id not found"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
        console.log(error.message)
    }
}

// const completedTask = async(req,res)=>{
//     const {id}=req.params;
//     const {isCompleted} = req.body;
//     try {
//         const task = await Task.findByIdAndUpdate(
//             id, // Use id directly to find the task by its ID
//             { isCompleted }, // Update the title with the new value from req.body
//             { new: true } // Set { new: true } to return the updated document
//         )
//         if(task){
//             return res.status(200).json({message: "Task completed"})
//         }else{
//             return res.status(400).json({message: "Task not completed"})
//         }
//     } catch (error) {
//         return res.status(500).json({message: "Internal Server Error"})
//         console.log(error.message)
//     }
// }

export {createTask,getSingleTask,getTasks,updateTask,deleteTask};
