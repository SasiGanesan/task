import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();
    console.log("submit")

    try {
      const response = await axios.post("http://localhost:4000/api/users/login",{
          email,
          password
      });
      const responseData = response.data;
      if(responseData){
        localStorage.setItem('id', responseData._id);
        navigate('/tasklist');
      }else{
        console.error("Authentication failed: ",responseData.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };
  return (
    <div className='py-2 pl-72 pt-16 '>
        <form className='h-60 w-68 bg-sky-100 inline-block'>
          <h1 className='text-center pt-2 text-xl '>Sign In</h1>
        <div className=' px-8 flex-row content-around p-2' >
            <label htmlFor="email" className='flex-col inline'>Email</label>
            <input type='email' placeholder='Enter your E-mail' name='email' className='block outline-none' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="password" className='flex-col inline'>Password</label>
            <input type='password' placeholder='Enter Password' name='password' className='block outline-none' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <div className='pt-2'  >
          <button type='submit' className=' bg-orange-500'onClick={handleLogin} >Login</button>
          </div>
        </div>
        <div className='align-center pt-2'>
          Already haven't an account ? <Link to={"/register"}>Register</Link>
        </div>
        </form>
    </div>
  )
}

export default SignIn;


