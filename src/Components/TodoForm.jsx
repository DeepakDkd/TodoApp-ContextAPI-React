import React ,{useState} from 'react'
import { useTodo } from '../Context/TodoContext'

function TodoForm() {

    const [todo , setTodo] = useState('')
    const {addTodo} = useTodo()

    const add = (e)=>{
        e.preventDefault();

        if(!todo) return
        addTodo({todo:todo , completed:false})
        setTodo('')
    }

  return (
    <form className='todo-input' onSubmit={add}>
    <input type='text' 
    placeholder='Add Todo ✒️'
            value={todo} 
            onChange={(e) => setTodo(e.target.value)} />
    <button type='submit'>Add</button>
  </form>
  )
}

export default TodoForm