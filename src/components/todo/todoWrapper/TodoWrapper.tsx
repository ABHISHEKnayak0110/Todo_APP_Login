import React, {useState, useEffect} from 'react'
import style from "./TodoWrapper.module.scss"
import { v4 as uuidv4 } from 'uuid';
import TodoForm from '../todoForm/TodoForm';
import TodoCard from '../todoCard/TodoCard';
import PopUp from '../../popUp/PopUp';
import { EditTodoForm } from '../editTodo/EditTodo';
import { toast } from "react-toastify";


uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState<any>([])
    const [showEditPopUp , setEditPopUp] = useState(false)
    const [editData , setEditData] = useState({})
    const [editSubTodos , seteditSubTodos] = useState(false)
    const [mainTaskId , setMainTaskId] = useState("")
    const [showaddSubTaskPopUp , setShowAddSubTaskPopUp] = useState(false)
    const [mainIdAddTodo , setMainIdAddTodo] = useState("")

  

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('todos') || "false")
        console.log("bhiya" , data)
        const savedTodos:any = JSON.parse(localStorage.getItem('todos') || "false") || [ {
            id : 1,
            task : "Read Newspaper",
            completed: false,
             isEditing: false,
             subTask : [
                 {
                     id : 2,
                     task : "Read Sports News",
                     completed: false,
                      isEditing: false,
                 }
             ]
        }];
        setTodos(savedTodos);
    }, []);

    const addTodo = (todo :string) => {
        const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, subTask : []}];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        toast.success("Task Added Successfully!")
    }

    const toggleComplete = (id :string) => {
        let type = false
        const newTodos = todos?.map(
            (todo:any) => {
                if(todo.id === id ){
                    type = !todo.completed
                    return {...todo, completed: !todo.completed}
                }else{
                    return todo
                }
            }
        )
        // const newTodos = todos.map((todo :any) => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        toast.success(`Task Marked As ${type ?  "Completed" : "Not Completed"} Successfully!`)
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = (id :string) => {
        const newTodos = todos.filter((todo :any) => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        toast.success("Task Deleted Successfully!")
    }

    const editTodo = (id:string)=> {
        setEditPopUp(true)
        todos.map((todo:any) => {
            if(todo.id === id){
                setEditData(todo)
            }
        })
 
    }

    const editTask = (task :string, id:string) => {
        const newTodos = todos.map((todo :any) => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);   
      localStorage.setItem('todos', JSON.stringify(newTodos));
      toast.success("Task Edited Successfully!")
    }
    const closeEdit = () => {
        setEditPopUp(false)
    }
    const closeAdd = () => {
      setShowAddSubTaskPopUp(false)
    }
    
    /** for subTask**/
    const deleteSubTodo = (id :string , subTaskId : string) => {
          const newTodos = todos?.map((data:any) => {
              if(data.id === id){
                  const newSubTask =  data?.subTask?.filter(
                     (todo:any) => {
                         return  todo.id !== subTaskId
                     }
                 )
                 data["subTask"] = newSubTask
                 return data
              }
              else{
                  return data
              }
          })
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        toast.success(" Sub Task Deleted Successfully!")
    }

    const editSubTodo = (id:string , subTaskId : string)=> {
        setEditPopUp(true)
        seteditSubTodos(true)
        todos.map((todo:any) => {
            if(todo.id === id){
                setMainTaskId(id)
                 todo?.subTask?.map(
                     (data:any) => {
                         if(data?.id === subTaskId ){
                            setEditData(data)
                         }
                     }
                 )
               
            }
        })
    }

    const editSubTask = (task :string, id:string) => {
        const newTodos = todos?.map(
            (todo:any) => {
                if(todo.id === mainTaskId){
                    const updateData= todo?.subTask?.map(
                        (data:any) => {
                            if(data?.id === id ){
                               return {...data, task, isEditing: !todo.isEditing} 
                            }else{
                                return data
                            }
                        }
                    )
                    todo["subTask"] = updateData
                    return todo
                    
                }
                else{
                    return todo
                }

            }
        )

        setTodos(newTodos);
        seteditSubTodos(false)  
        toast.success(" Sub Task Edited Successfully!") 
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const showaddSubTask =(id :string) => {
        setShowAddSubTaskPopUp(true)
        setMainIdAddTodo(id)
          
    }
    const addSubTodoTask = (value :string) => {
        const newTodos = todos?.map(
            (todo:any) => {
                if(todo?.id === mainIdAddTodo){
                    todo["subTask"] = [...todo.subTask, {id: uuidv4(), task: value, completed: false, isEditing: false}];
                }
                return todo
            }
        )
        setTodos(newTodos);
        toast.success(" Sub Task Added Successfully!")
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleCompletesubTask = (id:string , subTaskId : string) => {
        let type = false
        const newTodos = todos?.map(
            (todo:any) => {
                if(todo.id ===id ){
                    const updateData = todo?.subTask?.map((data:any) => {
                        if(data?.id === subTaskId){
                            type = !data.completed
                            data["completed"] = !data.completed
                            return data
                        }else{
                            return data
                        }
                    })
                    todo["subTask"] = updateData
                    return todo
                }
                else{
                    return todo
                }
            }
        )
      
        setTodos(newTodos);
        toast.success(`Sub Task Marked As ${type ?  "Completed" : "Not Completed"} Successfully!`)
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    /****/


  return (
    <div className= {style.todoWrapper}>
        <p className={style.paraHead}>Get Things Done!</p>
        <div className={style.form}><TodoForm addTodo={addTodo} /> </div> 
         {todos.map((todo :any, index :number) => (
           (
                <TodoCard task={todo}
                     key={index}
                     toggleComplete={toggleComplete}
                     deleteTodo={deleteTodo}
                     editTodo={editTodo} 
                     deleteSubTask = {deleteSubTodo}
                     editSubTodo = {editSubTodo}
                     addSubTask ={showaddSubTask}
                    toggleCompletesubTask ={toggleCompletesubTask}
                     />
            )
            
         ))}
          
        {
           showEditPopUp ? <PopUp>
               <div className={style.popUpOuterDiv}>
                   <div className={style.close} onClick ={closeEdit}>X</div>
                   <div className={style.formContainer}>
                   <p>Edit Task</p>
                 <EditTodoForm editTodo={editSubTodos ? editSubTask : editTask} task={editData} close ={closeEdit}/>
                 </div>
               </div>
             </PopUp> : ""
       }
       {
         showaddSubTaskPopUp ? <PopUp>
         <div className={style.popUpOuterDiv}>
             <div className={style.close} onClick ={closeAdd}>X</div>
             <div className={style.formContainer}>
             <p>Add sub Task</p>
             <TodoForm addTodo={addSubTodoTask} isAddSubTask ={true} close ={closeAdd} /> 
             </div>
         </div>
       </PopUp> : ""
       }
    </div>
  )
}