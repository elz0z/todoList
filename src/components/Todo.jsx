import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/todosContext.js'
import { useToast } from '../contexts/toastContext'
/*********MUI*******/
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//ICONS
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
/*********MUI*******/

export default function Todo({ todo, handleWarningOpen, handleEditOpen }) {

  const { todos, setTodos } = useContext(TodosContext);
  const showHideToast = useToast();

  function handleComplete() {
    const todosCheck = todos.map((task) => {
      if (todo.id === task.id) {
        task.isCompleted = !task.isCompleted
        if (task.isCompleted) {
          showHideToast('task has been added to completed')
        } else {
          showHideToast('task has been deleted from completed')
        }
      }

      return task;
    })
    setTodos(todosCheck)
  }
  function handleEditShow() {
    handleEditOpen(todo)
  }

  function handleDeleteOpen() {
    handleWarningOpen(todo)
  }

  return (
    <>
      < div className='todo' dir="auto" >
        <Card className='todo__card' sx={{
          minWidth: 275,
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          <CardContent sx={{
            textAlign: 'left',
            width: '63%',
          }}>
            <Typography variant='h6'
              style={{ textDecoration: todo.isCompleted && 'line-through' }}>
              {todo.title}
            </Typography>
          </CardContent>
          <Stack width='37%' direction="row" >

            <IconButton onClick={handleComplete}
              style={{
                padding: '.5vw'
              }}
              aria-label="completed">
              <DoneIcon
                className='icon' style={{
                  color: todo.isCompleted ? 'white' : 'rgba(0,128,0,0.9)',
                  backgroundColor: todo.isCompleted ? 'rgba(0,128,0,0.9)' : 'white',
                  padding: '3px',
                  fontSize: '1.4em',
                  borderRadius: '50%',
                  border: '2px solid rgba(0,128,0,0.9)'
                }} />
            </IconButton>

            <IconButton onClick={handleEditShow} style={{
              padding: '.5vw'
            }}
              id='edit' aria-label="edit">
              <EditIcon className='icon edit' style={{
                color: 'rgba(0,0,200,0.557)',
                padding: '3px',
                fontSize: '1.4em',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid rgba(0,0,200,0.557)'
              }} />
            </IconButton>

            <IconButton onClick={handleDeleteOpen} style={{
              padding: '.5vw'
            }}
              aria-label="delete">
              <DeleteIcon className='icon dlt' style={{
                color: 'rgba(200,0,0,0.7)',
                padding: '3px',
                fontSize: '1.4em',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid rgba(200,0,0,0.7)'
              }} />
            </IconButton>
          </Stack>
          <Typography style={{
            textDecoration: todo.isCompleted && 'line-through',
            textAlign: 'left',
            paddingInline: '1em',
            lineHeight: '1.4',
            wordBreak: 'break-word',
          }}
            variant='p'
            color='rgba(39,55,77,.8)'>
            {todo.description}
          </Typography>
          <p style={{
            textAlign: 'right',
            flexBasis: "100%",
            padding: '0 1em .5em 0',
            color: 'rgba(0,0,0,0.5)',
            fontSize: '.7em'
          }}>{todo.date}</p>
        </Card>
      </div >
    </>
  )
}