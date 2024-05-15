import { Typography } from '@mui/material'

/**
 * TaskCounter component displays the count of completed tasks out of total tasks.
 * The color of the displayed count changes based on completion status.
 *
 * @param {Array<Object>} props.todos - An array of todo objects representing tasks.
 * @returns {JSX.Element} The rendered TaskCounter component.
 */
const TaskCounter = ({ todos }) => {
  const completedTasks = todos.filter((todo) => todo.complete)
  const completedTasksCount = completedTasks.length
  const totalTaskCount = todos.length

  const taskColor = completedTasksCount === totalTaskCount ? '#0bbd02' : '#fff'

  return (
    <Typography
      height={2}
      mx={5}
      py={0}
      my={0}
      sx={{ color: taskColor }}
      paragraph
    >{`${completedTasksCount}/${totalTaskCount}`}</Typography>
  )
}

export default TaskCounter
