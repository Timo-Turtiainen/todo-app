import './App.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import todoService from './service/todoService'

function App() {
  const initialPriority = 'Normaali'
  const [todos, setTodos] = useState([])
  const [existingTodo, setExistingTodo] = useState('')
  const [taskInputValue, setTaskInputValue] = useState('')
  const [descriptionInputValue, setDescriptionInputValue] = useState('')
  const [priority, setPriority] = useState(initialPriority)
  const [buttonLabel, setButtonLabel] = useState('Lisää')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTodos = await todoService.getAllTodos()
        setTodos(fetchedTodos)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    sortTodosByCompleteAndPriority()
  }, [todos]) // Sort todos whenever todos state changes

  // Function to sort todos by completion status and priority
  const sortTodosByCompleteAndPriority = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      // Compare completion status first
      if (a.complete && !b.complete) {
        return 1 // a (completed) should come after b (not completed)
      }
      if (!a.complete && b.complete) {
        return -1 // a (not completed) should come before b (completed)
      }

      // If both have the same completion status, compare by priority
      const priorityOrder = { Korkea: 1, Normaali: 2, Matala: 3 }
      const priorityA = priorityOrder[a.priority]
      const priorityB = priorityOrder[b.priority]

      return priorityA - priorityB // Compare priorities based on order
    })

    setTodos(sortedTodos)
  }

  return (
    <div className='background'>
      <Header />
      <TodoForm
        taskInputValue={taskInputValue}
        setTaskInputValue={setTaskInputValue}
        descriptionInputValue={descriptionInputValue}
        setDescriptionInputValue={setDescriptionInputValue}
        todos={todos}
        setTodos={setTodos}
        existingTodo={existingTodo}
        setExistingTodo={setExistingTodo}
        initialPriority={initialPriority}
        priority={priority}
        setPriority={setPriority}
        buttonLabel={buttonLabel}
        setButtonLabel={setButtonLabel}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        taskInputValue={taskInputValue}
        setTaskInputValue={setTaskInputValue}
        descriptionInputValue={descriptionInputValue}
        setDescriptionInputValue={setDescriptionInputValue}
        setExistingTodo={setExistingTodo}
        priority={priority}
        setPriority={setPriority}
        initialPriority={initialPriority}
        setButtonLabel={setButtonLabel}
      />
    </div>
  )
}

export default App
