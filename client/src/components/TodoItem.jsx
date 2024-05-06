import { Checkbox, InputLabel, Button } from '@mui/material'
import { FaRegTrashAlt } from 'react-icons/fa'
import { formatDistance, differenceInDays } from 'date-fns'
import { useEffect } from 'react'
function TodoItem({
  todo,
  handleEditTask,
  handleDelete,
  handleMouseHover,
  handleCheckbox,
}) {
  return (
    <div
      onClick={() => handleEditTask(todo, todo.complete)}
      className='todo-item'
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px',
        borderRadius: '10px',
        backgroundColor: '#1976d2',
      }}
      key={todo.id}
    >
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Checkbox
          checked={todo.complete}
          onChange={() => handleCheckbox(todo.id, todo.complete)}
          inputProps={{
            'aria-label': 'controlled',
          }}
          sx={{
            '& .MuiSvgIcon-root': {
              fill: todo.complete ? '#ffffff' : '#ffffff', // Change the fill color based on checkbox state
            },
            '& .MuiCheckbox-root': {
              color: '#1976d2', // Custom color for the checkbox itself
            },
            '& .Mui-checked': {
              color: '#1976d2', // Color when checkbox is checked
            },
          }}
        />

        <InputLabel
          style={{
            marginRight: '20px',
            color: '#ffffff',
            textDecoration: todo.complete ? 'line-through' : 'none',
            alignItems: 'center',
          }}
          key={todo.id}
        >
          {todo.task}
        </InputLabel>

        <InputLabel
          style={{
            marginRight: '20px',
            color: '#ffffff',
            textDecoration: todo.complete ? 'line-through' : 'none',
            alignItems: 'center',
          }}
        >
          {todo.description}
        </InputLabel>
        <div>
          <InputLabel
            style={{
              marginRight: '20px',
              color: 'rgb(102, 255, 82)',
              fontSize: '14px',
              // textDecoration: todo.complete ? 'line-through' : 'none',
              alignItems: 'center',
            }}
          >
            {todo.startTime}
          </InputLabel>
          <InputLabel
            style={{
              marginRight: '20px',
              color: 'rgb(255, 82, 82)',
              fontSize: '14px',
              // textDecoration: todo.complete ? 'line-through' : 'none',
              alignItems: 'center',
            }}
          >
            {todo.complete ? todo.endTime : null}
          </InputLabel>
        </div>
      </div>
      {/* two blocks for styling task info <-> priority/trash icon */}
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <InputLabel
          style={{
            marginRight: '20px',
            color: '#ffffff',
            textDecoration: todo.complete ? 'line-through' : 'none',
            alignItems: 'center',
          }}
        >
          {todo.priority}
        </InputLabel>
        {todo.hoverered ? (
          <Button
            style={{
              height: '100%',
              borderRadius: '0 10px 10px 0',
              backgroundColor: '#ff3737',
              transition: 'color 0.3s ease',
            }}
            variant='contained'
            onClick={() => handleDelete(todo.id)}
            onMouseLeave={() => handleMouseHover(todo.id, false)}
          >
            Delete
          </Button>
        ) : (
          <FaRegTrashAlt
            size={21}
            onMouseEnter={() => handleMouseHover(todo.id, true)}
            style={{
              paddingRight: '20px',
              color: '#ffffff',
              transition: 'all 0.3s ease',
            }}
          />
        )}
      </div>
    </div>
  )
}

export default TodoItem
