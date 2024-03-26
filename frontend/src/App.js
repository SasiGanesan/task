// import SignUp from "./Screens/RegisterScreen";
// import SignIn from "./Screens/LoginScreen";
// import HomeScreen from "./Screens/HomeScreen";
// import Footer from "./components/Footer";
import Header from "./components/Header";
// import Task from './components/Task';
import { Outlet } from 'react-router-dom';
import {Container} from "@mui/material"


function App() {
  return (
    <>
    <Header/>
    <main className='py-3'>
      <Container>
        <Outlet />
      </Container>
    </main>
   {/* <Footer/> */}
    </>
  );
}

export default App;
