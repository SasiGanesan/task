import express from 'express';
import {createTask,getSingleTask,getTasks,updateTask,deleteTask} from '../Controllers/taskController.js';

const router = express.Router();

router.post('/',createTask)
router.get('/:id',getSingleTask)
router.get('/',getTasks)
router.patch('/:id',updateTask)
router.delete('/:id',deleteTask)
// router.delete('/:id',completedTask)

export default router;

