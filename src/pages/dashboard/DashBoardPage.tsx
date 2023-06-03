import React from 'react'
import style from "./DashBoardPage.module.scss"
import Dashboard from '../../components/dashBoard/Dashboard'
import { TodoWrapper } from '../../components/todo/todoWrapper/TodoWrapper'


function DashBoardPage() {
  return (
    <div className={style.dashboardPageWrapper}>
         <div className={style.fixHeader}><Dashboard/></div>
      <div className={style.todoComponentWrapper } >
          <TodoWrapper/>
      </div>   

      <div className={style.noteDiv}>
          Note :- Green color card shows completed task.
    </div>      
    </div>
  )
}

export default DashBoardPage