import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,Route,RouterProvider
} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import SignIn from './Screens/LoginScreen';
import SignUp from './Screens/RegisterScreen';
import TaskList from './components/TaskList';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/tasklist' element={<TaskList/>}/>
    </Route>
  )
)




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* <Provider store={store}> */}
    <RouterProvider router={router}/>
  {/* </Provider> */}
  </React.StrictMode>
);




