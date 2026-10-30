import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { createContext } from "react";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);


export default function App() {

  const [theme, setTheme] = useState("light")
  
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark": "light"))
  }

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  }) //both of these rerender the app
  //can use useState to get info from local storage by passing it a function
  //hooks need to be called at the top of the function

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])
  //every time our todos change, we want to run this to save the values

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id){
          return {...todo, completed}
        }
        return todo
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
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div id={theme}>
    <h1 className="header">ToDo List</h1>
    <NewTodoForm onSubmit={addTodo} />
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
    <div class="switch">
    <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
    </div>
    </ThemeContext.Provider>
  )
}