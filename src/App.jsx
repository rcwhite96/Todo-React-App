import { useState } from "react"
import { NewTodoForm } from "./NewTodoForm"

export default function App() {
  const [todos, setTodos] = useState([]) //both of these rerender the app

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id){
          return {...todo, completed}
        }
        return todo(id)
      })
    })
  }
  //Make sure when changing state, make sure you don't mutate it, but create a new state object

  function addTodo(title){
    setTodos((currentTodos) => {
          return [
            ...currentTodos, 
            {id: crypto.randomUUID(), title, completed:false}
          ] //spread out, gives new array, brackets are new value
            })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  //Use keys if you need to edit or delete an item, react needs to know which one to change
  //onSubmit={addTodo} is a prop
  return (
    <>
    <NewTodoForm onSubmit={addTodo} />
    <h1 className="header">ToDo List</h1>
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {todos.map(todo => {
        return (
        <li key={todo.id}>
        <label>
          <input type="checkbox" checked={todo.completed} 
          onChange={e => toggleTodo(todo.id, e.target.checked)} />
          {todo.title}
        </label>
        <button 
          onClick={() => deleteTodo(todo.id)} 
          className="btn btn-danger">
            Delete
          </button>
      </li>
        )
      })} 
    </ul>
  </>
  )
}