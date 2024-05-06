import React, { useState } from 'react'
import TodoItem from './TodoItem'
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'

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
    const formatDate = 'dd MMM yyyy'
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
            endTime: format(Date.now(), formatDate, { locale: fi }),
          }
        } else {
          return todo
        }
      })
    )

    if (!isComplete) {
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
      setTaskInputValue('')
      setPriority(initialPriority)
    }
  }

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          handleCheckbox={handleCheckbox}
          handleEditTask={handleEditTask}
          handleMouseHover={handleMouseHover}
          handleDelete={handleDelete}
          todo={todo}
        />
      ))}
    </div>
  )
}

export default TodoList
