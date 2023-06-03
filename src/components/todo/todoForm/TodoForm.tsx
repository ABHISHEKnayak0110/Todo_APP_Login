import React, { useState } from 'react'
import style from "./TodoForm.module.scss"

interface propsForm {
    addTodo : (value : string) => void
    isAddSubTask ?: boolean
    close ?:  any
}
const TodoForm = ({addTodo , isAddSubTask , close} : propsForm) => {
    const [value, setValue] = useState('');
    const handleSubmit = (e :any) => {
      // prevent default action
        e.preventDefault();
        if(value){
        if(isAddSubTask ){
           addTodo(value)
           setValue('');
           close()
          }
          else{
          // add todo
          addTodo(value);
          // clear form after submission
          setValue('');
        }
    }
      };
  return (
    <form onSubmit={handleSubmit} className= {style.todoForm}>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className= {style.todoinput} placeholder= {isAddSubTask ? "Add Sub Task" :'What is the task today?'} />
    <button type="submit" className={style.todobtn}>Add Task</button>
  </form>
  )
}

export default TodoForm