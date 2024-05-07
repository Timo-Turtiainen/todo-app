import TodoItem from './TodoItem'
import todoService from '../service/todoService'

function TodoList({
  todos,
  setTodos,
  setDescriptionInputValue,
  setTaskInputValue,
  setExistingTodo,
  setPriority,
  initialPriority,
  setButtonLabel,
}) {
  async function handleCheckbox(id, isComplete) {
    /* find the todo object for updating */
    const todo = todos.find(element => element.id === id)
    const updateTodoObject = {
      ...todo,
      complete: !todo.complete,
      endTime: Date.now(),
    }

    try {
      const updatedTodo = await todoService.updateTodo(updateTodoObject)
      setTodos(
        todos.map(todo => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo
          } else {
            return todo
          }
        })
      )
    } catch (error) {
      console.error('Error creating todo:', error)
    }

    if (!isComplete) {
      setExistingTodo(null)
      setButtonLabel('Lisää')
      setTaskInputValue('')
      setDescriptionInputValue('')
      setPriority(initialPriority)
    }
  }

  function handleMouseHover(id, isHovered) {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, hoverered: isHovered } : todo
      )
    )
  }

  function handleEditTask(todo, complete) {
    if (!complete) {
      setExistingTodo(todo)
      setTaskInputValue(todo.task)
      setDescriptionInputValue(todo.description)
      setPriority(todo.priority)
      setButtonLabel('Päivitä')
    }
  }

  async function handleDelete(id) {
    const todo = todos.find(todo => todo.id === id)

    if (window.confirm(`Haluatko todella poistaa ${todo.task} tehtävän?`)) {
      setTodos(todos.filter(todo => todo.id !== id))
      await todoService.deleteTodoByID(id)
    }

    setButtonLabel('Lisää')
    setTaskInputValue('')
    setDescriptionInputValue('')
    setPriority(initialPriority)
  }

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleCheckbox={handleCheckbox}
          handleEditTask={handleEditTask}
          handleMouseHover={handleMouseHover}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default TodoList
