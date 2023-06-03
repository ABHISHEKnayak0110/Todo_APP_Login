import React, { useEffect, useState } from 'react'
import LogIn from '../components/logIn/LogIn'
import { useAuth } from '../contexts/AuthContext'
import {
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

import NoData from '../components/noData/NoData';
import DashBoardPage from '../pages/dashboard/DashBoardPage';
import About from '../pages/about/About';


function Routers() {
    const authData = useAuth() 
    console.log("bhaiya" , authData)

    if(!authData?.user){
     return(
         <Routes>
         <Route path="/logIn" element={<LogIn/>}/>
         <Route path="*" element={<Navigate to="/logIn" />}></Route>
        </Routes>
     )      
    }
  return (
    <Routes>
    <Route path="*" element={<Navigate to="/dashboard" />}/>
    <Route path="/dashboard" element={<DashBoardPage/>}/>
    <Route path="/about" element={<About/>}/>
    {/* <Route path="*" element={<NoData/>}></Route> */}
   </Routes>
  )
}

export default Routers