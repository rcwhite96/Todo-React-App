import { useState } from "react"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([]) //both of these rerender the app

  function handleSubmit(e) {
    e.preventDefault() //prevents page from refreshing

    setTodos((currentTodos) => {
      return [
        ...currentTodos, {id: crypto.randomUUID(), title: newItem, completed:false}
      ] //spread out, gives new array, brackets are new value
    })
    setNewItem("")
  }

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

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  //Use keys if you need to edit or delete an item, react needs to know which one to change
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
            <label htmlFor="item">New Item</label>
            <input 
              value={newItem} onChange={e => setNewItem(e.target.value)} 
              type="text" 
              id="item"
            />
        </div>
      <button className="btn">Add</button>
    </form>
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