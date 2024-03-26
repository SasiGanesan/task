import express from 'express';
import dotenv from 'dotenv';
import connectDB from './backend/config/db.js';
dotenv.config();
import taskRoutes from './backend/Routes/taskRoutes.js'
import userRoutes from './backend/Routes/userRoutes.js'
import cors from 'cors';

connectDB();

const port = process.env.PORT || 5000

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app=express();
app.use(cors(corsOptions));
app.use(express.json()),
app.use(express.urlencoded({extended:false}))

//api creation
app.use('/api/tasks',taskRoutes)
app.use('/api/users',userRoutes)

app.listen(port,()=>{
    console.log('Server running on the port '+port)
})

// app.get('/',(req,res)=>{
//     res.send("API is running")
// })
