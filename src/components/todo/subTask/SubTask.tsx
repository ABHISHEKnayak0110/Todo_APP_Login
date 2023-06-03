import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { faTrash,faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import style from "./SubTask.module.scss"
import { Tooltip as ReactTooltip } from "react-tooltip";


interface propsTodo {
    task :Record <string , any>, 
    deleteTodo : (id :string) => void, 
    editTodo : (id :string) => void, 
    toggleComplete : (id :string) => void
}

function SubTask({task, deleteTodo, editTodo, toggleComplete} :propsTodo) {

    console.log("hello" )
   
  return (
      <>
     <div className={`${style.todoCard } ${task?.completed ? style.completedCard : ""}`}>
        <p className={`${task.completed ? 'completed' : ""}`}>{task.task}</p>
        <div className={style.iconDiv}>
        <FontAwesomeIcon  id={`mark_${task?.id}` }icon={faCheckCircle} onClick={() => toggleComplete(task?.id)} />
        { !task?.completed &&  <FontAwesomeIcon id={`editsubTask_${task.id}`} icon={faPenToSquare} onClick={() => editTodo(task.id)} /> }
        <FontAwesomeIcon id={`deletesubTask_${task.id}`} icon={faTrash} onClick={() => deleteTodo(task.id)} />
        </div>
        <ReactTooltip
        anchorId={`mark_${task?.id}`}
        place="bottom"
        content="Press for Mark as complete/uncomplete sub task"
        variant="info"
        />
        <ReactTooltip
        anchorId={`editsubTask_${task.id}`}
        place="bottom"
        content="Press for edit sub task"
        variant="info"
        />
         <ReactTooltip
        anchorId={`deletesubTask_${task.id}`}
        place="bottom"
        content="Press for delete sub task"
        variant="info"
        />
    </div>
    
    </>
  
  )
}

export default SubTask