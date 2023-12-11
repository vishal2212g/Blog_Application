
import { useState } from "react";



// using the "Data provider" for data use (user) for loging
import DataProvider from "./context/DataProvider";

//using "Browser Router" for url injection(call)
import {
  BrowserRouter,
  Routes,
  Route,   
  Navigate,
  Outlet
} from "react-router-dom";

// components

import Login from "./components/account/Login";

import Home from "./components/Home/Home";

import Header from "./components/header/Header";
import {Box } from "@mui/material";
import CreatePost from './components/create/CreatePost';
import Detailview from './components/details/DetailView';

// user not authenticated or not use this page

import Update from './components/create/Update';

import About from './components/about/About';

import Contact from "./components/contact/Contact";

 
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  
  
  return isAuthenticated ? 
    <>

       <Header/>
      <Outlet/>
   
   
      </>:<Navigate replace to= '/login'/>
  
};

function App() {
 

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
       
        
         <Box style={{
            marginTop: 64,
          }}>

          <Routes>
            <Route
              path="/login"
              element={<Login isUserAuthenticate={isUserAuthenticated}/>} />

           
               <Route
               path='/'
                element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
             <Route path='/' element={<Home />} /> 
            </Route>


            <Route
            path='/create'
             element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='/create' element={<CreatePost/>} /> 
         </Route>
     
         <Route
            path='/details/:id'
             element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path='/details/:id'element={<Detailview/>} /> 
         </Route>


         <Route
         path='/update/:id'
          element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
       <Route path='/update/:id'element={<Update/>} /> 
      </Route>
      

      <Route
      path='/about'
       element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
    <Route path='/about'element={<About />} /> 
   </Route>


   <Route
      path='/contact'
       element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
    <Route path='/contact'element={<Contact/>} /> 
   </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
