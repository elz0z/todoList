import './Main.css'
import Todo from './Todo'
import { useToast } from '../contexts/toastContext'
import todosReducer from '../reducers/todosReducer'
import { useState, useEffect, useReducer, useMemo } from 'react'
import { TodosContext } from '../contexts/todosContext.js'
import { v4 as uuid } from 'uuid';
/*********MUI*******/
import TextField from '@mui/material/TextField';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
//DIALOG
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
/*********MUI*******/

export default function MainContent({ }) {

  const [todos2, setTodos] = useState(() => {
    const data = localStorage.getItem('todosList')
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  })
  const [todos, todosDispatch] = useReducer(todosReducer, (() => {
    const data = localStorage.getItem('todosList')
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  })())

  const [newTodo, setNewTodo] = useState({
    title: '',
    desc: ''
  })
  const [todo, setTodo] = useState({ title: '', description: '' })
  const [openEdit, setOpenEdit] = useState(false);

  const [openWarning, setOpenWarning] = useState(false);
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [isDisabled, setIsDisabled] = useState(true)
  const { showHideToast } = useToast()
  /**********FILTERING**********/
  const completed = useMemo(() => {
    return todos.filter((todo) => {
      return todo.isCompleted;
    })
  }, [todos])

  const unCompleted = useMemo(() => {
    return todos.filter((todo) => {
      return !todo.isCompleted;
    })
  }, [todos])

  let todosToRender = todos;
  switch (displayedTodosType) {
    case 'completed':
      todosToRender = completed;
      break;
    case 'uncompleted':
      todosToRender = unCompleted;
      break;
    default:
      todosToRender = todos;
  }
  /**********FILTERING**********/
  useEffect(() => {
    localStorage.setItem('todosList', JSON.stringify(todos));
  }, [todos]);

  //HANDLERS
  function handleTitle(e) {
    if (e.target.value.trim() == '' && newTodo.desc.trim() == '') {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
    setNewTodo({ ...newTodo, title: e.target.value })
  }
  function handleDesc(e) {
    if (e.target.value.trim() == '' && newTodo.title.trim() == '') {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
    setNewTodo({ ...newTodo, desc: e.target.value })
  }

  function handleAddTodo(e) {
    e.preventDefault();
    todosDispatch({
      type: "added", payload: {
        newTodo,
      }
    })
    setNewTodo({ title: '', desc: '' })
    setIsDisabled(true)
    showHideToast('task has been added successfully')
  }
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value)
  }

  function handleEditOpen(todo) {
    setOpenEdit(true);
    setTodo(todo)
  };
  function handleEditClose() {
    setOpenEdit(false);
  };
  function handleEditTitle(e) {
    setTodo({ ...todo, title: e.target.value })
  }
  function handleEditDesc(e) {
    setTodo({ ...todo, description: e.target.value })
  }
  function handleEdit() {
    todosDispatch({
      type: "edited", payload: { todo }
    })
    if (!(todo.title.trim() == '' && todo.description.trim() == '')) {
      showHideToast('task has been updated successfully')
    }
    handleEditClose()
  }
  function handleWarningOpen(todo) {
    setOpenWarning(true);
    setTodo(todo)
  };
  function handleWarningClose() {
    setOpenWarning(false);
  };
  function handleDelete() {
    todosDispatch({
      type: "deleted", payload: { todo }
    })
    setOpenWarning(false)
    showHideToast('task has been deleted successfully')
  }

  const showTodos =
    todosToRender.map((todo) => {
      return <Todo key={todo.id} todo={todo}
        handleEditOpen={handleEditOpen}
        handleWarningOpen={handleWarningOpen} />
    })
  return (
    <TodosContext.Provider value={
      { todos, setTodos }
    }>
      <main style={{
        maxHeight: '70vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        width: '98%',
        marginInline: 'auto'
      }}>
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
              value={todo.title}
              onChange={handleEditTitle}
              autoFocus
              margin="dense"
              label="Task title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={todo.description}
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

        <Stack direction="row" spacing={2} justifyContent="center" >
          <ToggleButtonGroup
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            value={displayedTodosType}
            color="primary"
          >
            <ToggleButton value="all" aria-label="left aligned">
              all
            </ToggleButton>
            <ToggleButton value="completed" aria-label="centered">
              completed
            </ToggleButton>
            <ToggleButton value="uncompleted" aria-label="right aligned">
              Uncompleted
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {todos.length > 0 ? showTodos :
          <p style={{
            paddingTop: '1em',
            color: '#d52e0a',
            fontSize: '1rem'
          }}>no tasks yet!
          </p>
        }

        <div className='addTodo'>
          <h4>add new task</h4>
          <div className='addTodo__newTodo'>
            <TextField value={newTodo.title} onChange={handleTitle} sx={{
              width: '95%',
              height: '55px'
            }} id="outlined-basic" label="task title" />
          </div>

          <div style={{
            width: '100%'
          }} >
            <TextField value={newTodo.desc} onChange={handleDesc} sx={{
              marginBlock: '7px',
              width: '95%',
            }}
              id="outlined-multiline-static"
              label="task description"
              multiline
              rows={3}
            />
          </div>
        </div>

        <div className='addTodo__confirm'  >
          <Button className={`${isDisabled && 'disabled'}`} onClick={handleAddTodo}
            sx={{
              width: '90%',
              height: '55px'
            }} variant="contained" endIcon={<NoteAddIcon />}>
            add to tasks
          </Button>
        </div>
      </main>
    </TodosContext.Provider >

  )
}