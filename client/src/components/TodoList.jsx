import TodoItem from './TodoItem'
import todoService from '../service/todoService'
import { Box } from '@mui/material'

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
      console.error('Error creating todo:', error.message)
    }

    if (!isComplete) {
      setExistingTodo(null)
      setButtonLabel('Lisää')
      setTaskInputValue('')
      setDescriptionInputValue('')
      setPriority(initialPriority)
    }
  }

  async function handleEditTask(todo, complete) {
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
    <Box display={'flex'} flexDirection={'column'} my={4} px={5}>
      {todos.map(todo => {
        // console.log(todo)
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleCheckbox={handleCheckbox}
            handleEditTask={handleEditTask}
            handleDelete={handleDelete}
          />
        )
      })}
    </Box>
  )
}

export default TodoList
