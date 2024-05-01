import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { useContext } from 'react';
import { TodosContext } from '../contexts/todosContext.js'
export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  function handleComplete() {
    const todosCheck = todos.map((task) => {
      if (todo.id === task.id) {
        task.isCompleted = !task.isCompleted
      }
      return task;
    })
    setTodos(todosCheck)
  }
  function handleDelete() {
    const todosCheck = todos.filter((task) => {
      return !(todo.id === task.id)
    })
    setTodos(todosCheck)
  }
  return (
    <>
      <div className='todo'>
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
                padding: '1vw'
              }}
              aria-label="completed">
              <DoneIcon
                className='icon' style={{
                  color: todo.isCompleted ? 'white' : 'rgba(0,128,0,0.9)',
                  backgroundColor: todo.isCompleted ? 'rgba(0,128,0,0.9)' : 'white',
                  padding: '2px',
                  fontSize: '1.4em',
                  borderRadius: '50%',
                  border: '2px solid rgba(0,128,0,0.9)'
                }} />
            </IconButton>

            <IconButton style={{
              padding: '1vw'
            }}
              id='edit' aria-label="edit">
              <EditIcon className='icon edit' style={{
                color: 'rgba(0,0,255,0.557)',
                padding: '2px',
                fontSize: '1.4em',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid rgba(0,0,255,0.557)'
              }} />
            </IconButton>

            <IconButton onClick={handleDelete} style={{
              padding: '1vw'
            }}
              aria-label="delete">
              <DeleteIcon className='icon dlt' style={{
                color: 'rgba(255,0,0,0.7)',
                padding: '2px',
                fontSize: '1.4em',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid rgba(255,0,0,0.7)'
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