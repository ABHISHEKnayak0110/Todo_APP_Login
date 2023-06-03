import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash,faPlus,faCodeBranch ,faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import style from "./TodoCard.module.scss"
import SubTask from '../subTask/SubTask'
import { Tooltip as ReactTooltip } from "react-tooltip";

interface propsTodo {
    task :Record <string , any>, 
    deleteTodo : (id :string) => void, 
    editTodo : (id :string) => void, 
    toggleComplete : (id :string) => void
    deleteSubTask : (id :string , subTaskId :string) => void
    editSubTodo :(id :string , subTaskId :string) => void
    addSubTask : (id :string) => void, 
    toggleCompletesubTask : (id :string , subTaskId :string) => void,
}  

function TodoCard({task, deleteTodo, editTodo, toggleComplete ,deleteSubTask , editSubTodo,  addSubTask, toggleCompletesubTask  } :propsTodo) {
    const [expanded, setExpanded] = useState(false);
    console.log("hello" )
    const toggler =() => {
        
        const data = expanded
        setExpanded(!data)
    }
 
    /** for sub Task**/
    const deleteSubTodo = (id :string ) => {
        deleteSubTask(task.id, id)
    }

    const editSubTak = (id:string)=> {
        editSubTodo(task.id , id)
    }
    const toggleCompletesubtask =(id:string)=> {
        toggleCompletesubTask(task.id , id)
    }
    /****/


  return (
      <>
     <div className= {`${style.todoCard } ${task?.completed ? style.completedCard : ""}`}>
        <p className={`${task?.completed ? 'completed' : ""}`} >{task?.task}</p>
        <div className={style.iconDiv}>
        
        <FontAwesomeIcon  id={`mark_${task?.id}` }icon={faCheckCircle} onClick={() => toggleComplete(task?.id)} />
        { !task?.completed &&  <FontAwesomeIcon  id={`edit_${task?.id}` }icon={faPenToSquare} onClick={() => editTodo(task?.id)} /> }
        <FontAwesomeIcon  id = {`delete_${task?.id}`}icon={faTrash} onClick={() => deleteTodo(task?.id)} />
        { !task?.completed &&  <FontAwesomeIcon  id = {`add_${task?.id}`}icon={faPlus} onClick={() => addSubTask(task?.id)} /> }
        {  task?.subTask?.length >0  && <div className={style.subTaskOpenButton} onClick={() => toggler()}> <FontAwesomeIcon  id ={`open_${task?.id}`} style ={{rotate: "180deg"}}icon={faCodeBranch}  /> {task?.subTask?.length}</div>}
        </div>
        <ReactTooltip
        anchorId={`mark_${task?.id}`}
        place="bottom"
        content="Press for Mark as complete/uncomplete task"
        variant="info"
        />
        <ReactTooltip
        anchorId={`edit_${task?.id}`}
        place="bottom"
        content="Press for edit task"
        variant="info"
        />
         <ReactTooltip
        anchorId={`delete_${task?.id}`}
        place="bottom"
        content="Press for delete task"
        variant="info"
        />
         <ReactTooltip
        anchorId={`add_${task?.id}`}
        place="bottom"
        content="Press for add  sub task"
        variant="info"
        />
         <ReactTooltip
        anchorId={`open_${task?.id}`}
        place="bottom"
        content="Press for open/close sub task list"
        variant="info"
        />
    </div>
     {
         expanded ? 
         task?.subTask?.map(
              (data:any , index :any) => {
                 return  <SubTask task={data} key={index} toggleComplete={toggleCompletesubtask} deleteTodo={deleteSubTodo} editTodo={editSubTak} /> 
             }
         )
         : ""
     }
    </>
  
  )
}

export default TodoCard