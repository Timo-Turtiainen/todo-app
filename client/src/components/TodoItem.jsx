import { Checkbox, InputLabel, Button } from '@mui/material'
import { FaRegTrashAlt } from 'react-icons/fa'
import { format, formatDistance } from 'date-fns'
import { fi } from 'date-fns/locale'
import { useState } from 'react'

function TodoItem({
  todo,
  handleEditTask,
  handleDelete,
  handleMouseHover,
  handleCheckbox,
}) {
  const formatDate = 'dd MMM yyyy'
  return (
    <div
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
      key={todo.id}>
      <div
        onClick={() => handleEditTask(todo, todo.complete)}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
          key={todo.id}>
          {todo.task}
        </InputLabel>

        <InputLabel
          style={{
            marginRight: '20px',
            color: '#ffffff',
            textDecoration: todo.complete ? 'line-through' : 'none',
            alignItems: 'center',
          }}>
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
            }}>
            {todo.startTime ? format(todo.startTime, formatDate) : null}
          </InputLabel>
          <InputLabel
            style={{
              marginRight: '20px',
              color: 'rgb(255, 82, 82)',
              fontSize: '14px',
              // textDecoration: todo.complete ? 'line-through' : 'none',
              alignItems: 'center',
            }}>
            {todo.complete
              ? format(todo.endTime, formatDate, { locale: fi })
              : null}
          </InputLabel>
        </div>
        <InputLabel
          style={{
            alignItems: 'flex-start',
            marginRight: '20px',
            color: '#bafaff',
            fontSize: '14px',
          }}>
          {todo.complete
            ? formatDistance(todo.startTime, todo.endTime, {
                includeSeconds: true,
                numeric: 'always',
                locale: fi,
              })
            : null}
        </InputLabel>
      </div>
      {/* two blocks for styling task info <-> priority/trash icon */}
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <InputLabel
          style={{
            marginRight: '20px',
            color: '#ffffff',
            textDecoration: todo.complete ? 'line-through' : 'none',
            alignItems: 'center',
          }}>
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
            onMouseLeave={() => handleMouseHover(todo.id, false)}>
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
