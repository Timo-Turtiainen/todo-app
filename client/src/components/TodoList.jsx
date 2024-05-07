import TodoItem from './TodoItem'
import { format, formatDistance } from 'date-fns'
import { fi } from 'date-fns/locale'
import { useState } from 'react'

function TodoList({
  todos,
  setTodos,
  descriptionInputValue,
  setDescriptionInputValue,
  setTaskInputValue,
  setExistingTodo,
  setPriority,
  initialPriority,
  setButtonLabel,
}) {
  function handleCheckbox(id, isComplete) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
            endTime: Date.now(),
          }
        } else {
          return todo
        }
      })
    )

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

  function handleDelete(id) {
    const todo = todos.find(todo => todo.id === id)

    if (window.confirm(`Haluatko todella poistaa ${todo.task} tehtävän?`)) {
      setTodos(todos.filter(todo => todo.id !== id))
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
