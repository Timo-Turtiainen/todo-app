import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { isSameDay } from 'date-fns'

/**
 * TaskCounter component displays the count of completed tasks out of total tasks.
 * The color of the displayed count changes based on completion status.
 *
 * @returns {JSX.Element} The rendered TaskCounter component.
 */
function TaskCounter({ day }) {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todo.todos)

  // Filter the tasks of the day
  const daysTasks = todos.filter((todo) => isSameDay(todo.startTime, day))

  // Task count per day
  const taskCount = daysTasks.length

  return <Typography fontSize={12}>{taskCount}</Typography>
}

export default TaskCounter

//   // OLD VERSION
//   // get Array of todos
//   const todos = useSelector((state) => state.todo.todos)
//   // all completed tasks
//   const completedTasks = todos.filter((todo) => todo.complete)
//   // Count completed tasks
//   const completedTasksCount = completedTasks.length
//   // Count all tasks
//   const totalTaskCount = todos.length

//   const taskColor = completedTasksCount === totalTaskCount ? '#0bbd02' : '#fff'

//   return (
//     <Typography
//       height={2}
//       mx={5}
//       py={0}
//       my={0}
//       sx={{ color: taskColor }}
//       paragraph
//     >{`${completedTasksCount}/${totalTaskCount}`}</Typography>
//   )
// }

// export default TaskCounter
