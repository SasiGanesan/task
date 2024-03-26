import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast,ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleError = (err) => {
    toast.error(err.response?.data?.message || err.message, {
      position: 'top-right'
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: 'top-right'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', {
        name,
        email,
        password
      });
      const responseData = response.data;
      if (responseData) {
        localStorage.setItem('userInfo', responseData.email);
        handleSuccess(responseData.message);
        navigate('/tasklist'); // Redirect to appropriate page after registration
      } else {
        handleError({ message: responseData.message });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="py-2 pl-72 pt-16">
      <form className="h-64 w-64 bg-sky-100 inline-block" onSubmit={handleSubmit}>
        <h1 className="text-center pt-2 text-xl">Sign Up</h1>
        <div className="px-8 flex-row content-around p-2">
          <label htmlFor="name" className="flex-col inline">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            className="block outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className="flex-col inline">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your E-mail"
            name="email"
            className="block outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="flex-col inline">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="block outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="pt-2 text-center">
            Register
          </button>
        </div>
        <ToastContainer />
        <span className="align-center pt-4">
          Already have an account? <Link to={'/login'}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
