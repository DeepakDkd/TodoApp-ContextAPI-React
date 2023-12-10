import React,{useState} from 'react'
import { useTodo } from '../Context/TodoContext'

function TodoItem({todo}) {

    const [todoMsg , setodoMsg] = useState(todo.todo)
    const[isTodoEditable , setIsTodoEditable] = useState(false)
    const {updateTodo , deleteTodo , toggleComplete} = useTodo()


    const edit = ()=>{
        updateTodo(todo.id , {...todo , todo:todoMsg})
        setIsTodoEditable(false)
    }
    const toggleCompleted = ()=>{
        toggleComplete(todo.id)
    }

  return (
    <div className={isTodoEditable? 'input-active todo-item':'todo-item'} key={todo.id}>
      <input type="checkbox" 
                onClick={toggleCompleted}
                checked={todo.completed}
                disabled={isTodoEditable}/>
      <input type="text" 
                className={todo.completed? 'todoDel':''}
                value={todoMsg}
                onChange={(e) => setodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                autoFocus={isTodoEditable? true:true}
                />
      <button disabled={todo.completed}
                onClick={()=>{
                if(todo.completed) return
                if(isTodoEditable){
                    edit()
                }
                else{
                    setIsTodoEditable(prev => !prev)
                }
      }}>{isTodoEditable?"🗃️":"✏️"}</button>
      <button onClick={()=>deleteTodo(todo.id)}>❎</button>
    </div>
  )
}

export default TodoItem