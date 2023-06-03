import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { TodoWrapper } from '../todo/todoWrapper/TodoWrapper'
import style from "./Dashboard.module.scss"
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const authData = useAuth() 
    const navigation = useNavigate();

    const logout = () => {
        authData?.logout()
    }
    const moveToAbout =() => {
        navigation("/about")
    }
  return (
    <div className={style.dashboardWrapper}>   
       <div className={style.headerTodo} >
       <p className={style.paraAbout} onClick={moveToAbout}>About</p>
       <button className={style.logoutButton} onClick={logout}>logout</button>
       </div>
    
        <div className={style.title}>
            <p>Welcome, {authData?.user?.name}!</p>
            <p className={style.messagePara}>Here is your Todo List</p>
        </div>
    </div>
   
  )
}

export default Dashboard