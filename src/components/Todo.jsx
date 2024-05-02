import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/todosContext.js'
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
//DIALOG
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Todo({ todo }) {

  const { todos, setTodos } = useContext(TodosContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [edit, setEdit] = useState({
    title: todo.title,
    desc: todo.description
  })
  const [openWarning, setOpenWarning] = useState(false);

  function handleComplete() {
    const todosCheck = todos.map((task) => {
      if (todo.id === task.id) {
        task.isCompleted = !task.isCompleted
      }
      return task;
    })
    setTodos(todosCheck)
  }


  const handleEditOpen = () => {
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  function handleEditTitle(e) {
    setEdit({ ...edit, title: e.target.value })
  }
  function handleEditDesc(e) {
    setEdit({ ...edit, desc: e.target.value })
  }
  function handleEdit() {
    if (edit.title.trim() == '' && edit.desc.trim() == '') {
    } else {
      const editTask = todos.map((task) => {
        if (todo.id == task.id) {
          task.title = edit.title;
          task.description = edit.desc;
        }
        return task;
      })
      setTodos(editTask)
    }
    handleEditClose()
  }

  const handleWarningOpen = () => {
    setOpenWarning(true);
  };
  const handleWarningClose = () => {
    setOpenWarning(false);
  };
  function handleDelete() {
    const todosCheck = todos.filter((task) => {
      return !(todo.id === task.id)
    })
    setTodos(todosCheck);
    setOpenWarning(false)
  }

  return (
    <>
      {/* ####WARNING DIALOG ###*/}
      <Dialog
        open={openWarning}
        onClose={handleWarningClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: 'rgba(200,0,0,0.7)' }}
          id="alert-dialog-title">
          {"are you sure you want to delete this task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if you delete this task you wont be able to retrieve it again .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#4b4b4b' }} autoFocus
            onClick={handleWarningClose} >
            CANCLE
          </Button>
          <Button style={{ color: 'rgba(200,0,0,0.7)' }} onClick={handleDelete}>DELETE</Button>
        </DialogActions>
      </Dialog>
      {/* #### WARNIBG DIALOG #### */}


      {/* #### EDIT DIALOG #### */}
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: '#27374d' }}>task edit</DialogTitle>
        <DialogContent>
          <TextField
            value={edit.title}
            onChange={handleEditTitle}
            autoFocus
            margin="dense"
            label="Task title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={edit.desc}
            onChange={handleEditDesc}
            margin="dense"
            label="Task description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#4b4b4b' }} onClick={handleEditClose} >
            CANCLE
          </Button>
          <Button onClick={handleEdit}>EDIT</Button>
        </DialogActions>
      </Dialog >

      {/* #### EDIT DIALOG #### */}

      < div className='todo' >
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
                  padding: '3px',
                  fontSize: '1.4em',
                  borderRadius: '50%',
                  border: '2px solid rgba(0,128,0,0.9)'
                }} />
            </IconButton>

            <IconButton onClick={handleEditOpen} style={{
              padding: '1vw'
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

            <IconButton onClick={handleWarningOpen} style={{
              padding: '1vw'
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