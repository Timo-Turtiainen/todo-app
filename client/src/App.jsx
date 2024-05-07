import './App.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'

function App() {
  const initialPriority = 'Normaali'
  const [todos, setTodos] = useState([])
  const [existingTodo, setExistingTodo] = useState('')
  const [taskInputValue, setTaskInputValue] = useState('')
  const [descriptionInputValue, setDescriptionInputValue] = useState('')
  const [priority, setPriority] = useState(initialPriority)
  const [buttonLabel, setButtonLabel] = useState('Lisää')

  function generateRandomDate() {
    const dummyDate = Math.random() * new Date()
    return dummyDate
  }

  useEffect(() => {
    // Simulating async data loading (replace with actual data fetching)
    const fetchData = async () => {
      // Fetch todos data (e.g., from an API)
      const fetchedTodos = await fetchTodosFromAPI()
      setTodos(fetchedTodos) // Set todos state after fetching data
    }

    fetchData() // Fetch data when component mounts
  }, [])

  useEffect(() => {
    sortTodosByCompleteAndPriority()
  }, [todos]) // Sort todos whenever todos state changes

  // Function to fetch todos data (simulated async operation)
  const fetchTodosFromAPI = async () => {
    // Simulated API response (replace with actual API call)
    return [
      {
        id: uuidv4(),
        task: 'Task 1',
        description: 'description 1',
        priority: 'Normaali',
        startTime: generateRandomDate(),
        endTime: null,
        complete: false,
        hoverered: false,
      },
      {
        id: uuidv4(),
        task: 'Task 2',
        description: 'description 2',
        priority: 'Korkea',
        startTime: generateRandomDate(),
        endTime: null,
        complete: false,
        hoverered: false,
      },
      {
        id: uuidv4(),
        task: 'Task 3',
        description: 'description 3',
        priority: 'Matala',
        startTime: generateRandomDate(),
        endTime: null,
        complete: false,
        hoverered: false,
      },
      {
        id: uuidv4(),
        task: 'Task 4',
        description: 'description 4',
        priority: 'Normaali',
        startTime: generateRandomDate(),
        endTime: null,
        complete: false,
        hoverered: false,
      },
      {
        id: uuidv4(),
        task: 'Task 5',
        description: 'description 5',
        priority: 'Korkea',
        startTime: generateRandomDate(),
        endTime: null,
        complete: false,
        hoverered: false,
      },
    ]
  }

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
        setTaskInputValue={setTaskInputValue}
        descriptionInputValue={descriptionInputValue}
        setDescriptionInputValue={setDescriptionInputValue}
        setExistingTodo={setExistingTodo}
        setPriority={setPriority}
        initialPriority={initialPriority}
        setButtonLabel={setButtonLabel}
      />
    </div>
  )
}

export default App
