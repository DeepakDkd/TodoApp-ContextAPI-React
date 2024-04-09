import { useEffect, useState } from "react";
import { TodoForm, TodoItem } from "./Components/index";
import { TodoProvider } from "./Context/TodoContext";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([{ id: Date.now(), ...todo }, ...todos]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id == id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <h1 class="title">Todo Space 📝</h1>
      <div className="App">
        <TodoForm />

        <div className="todo-items">
          {todos.map((todo) => (
            <div key={todo.id}>
              <TodoItem todo={todo} />
            </div>
          ))}
         { !todos?.length > 0 &&
          <h2>
            “Learning to write programs stretches your mind, and helps you think
            better, creates a way of thinking about things that I think is
            helpful in all domains.”
          </h2>}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
