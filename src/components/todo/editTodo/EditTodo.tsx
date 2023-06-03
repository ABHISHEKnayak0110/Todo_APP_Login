import React, {useState} from 'react'
import style from "../todoForm/TodoForm.module.scss"

interface editProps {
    editTodo : (value :string , id :string , extraId ?:string) => void,
    task  : Record<string,any>
    close : () => void
}

export const EditTodoForm = ({editTodo, task ,close} : editProps) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e :any) => {
      // prevent default action
        e.preventDefault();
        // edit todo
        editTodo(value, task.id);
        close()
      };
  return (
    <form onSubmit={handleSubmit} className={style.todoForm}>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className={style.todoinput} placeholder='Update task' />
    <button type="submit" className={style.todobtn}>Add Task</button>
  </form>
  )
}