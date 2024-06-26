import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String
    },
    dueDate:{
        type: Date, 
        default: Date.now,
    },
    isCompleted:{
        type: Boolean,
    },
},{
    timestamps:true,
});

const Task = mongoose.model("Task",taskSchema);
export default Task;
