import './Main.css'
import Todo from './Todo'
import TextField from '@mui/material/TextField';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { TodosContext } from '../contexts/todosContext.js'
export default function MainContent() {
  /******  fake data for trying *****
   
  const [todos, setTodos] = useState([
    {
      id: uuid(),
      title: 'read book',
      description: 'ayhafa hdjgud f',
      isComplete: false
    },
    {
      id: uuid(),
      title: 'read new',
      description: 'ayhafa hdjgud f',
      isComplete: false
    },
    {
      id: uuid(),
      title: 'read third',
      description: 'ayhafa hdjgud f',
      isComplete: false
    }
  ]) 
  
  ************/
  const [status, setStatus] = useState({
    all: true,
    completed: false,
    uncompleted: false
  })
  const [todos, setTodos] = useState(() => {
    const data = localStorage.getItem('todosList')
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  })
  const [newTodo, setNewTodo] = useState({
    title: '',
    desc: ''
  })
  const [isDisabled, setIsDisabled] = useState(true)

  /******* my first try before lazy initial state ******
   
  useEffect(() => {
    const todosData = JSON.parse(localStorage.getItem('todosList'));
    if (todosData) {
      setTodos(todosData);
    }
  }, []);
  
  ************/

  useEffect(() => {
    localStorage.setItem('todosList', JSON.stringify(todos));
  }, [todos]);

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
    if (newTodo.title.trim() || newTodo.desc.trim()) {
      setTodos([...todos, {
        id: uuid(),
        title: newTodo.title,
        description: newTodo.desc,
        isCompleted: false,
        date: new Date().toDateString()
      }])
      setNewTodo({ title: '', desc: '' })
      // localStorage.setItem('todosList', JSON.stringify(todos));
    }
    setIsDisabled(true)
  }

  const showTodos =
    todos.map((todo) => {
      return <Todo key={todo.id} todo={todo} />
    })

  return (
    <TodosContext.Provider value={
      { todos: todos, setTodos: setTodos }
    }>
      <main>
        <Stack direction="row" spacing={2} justifyContent="center" >
          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
          >

            <ToggleButton className='state' value="left" aria-label="left aligned">
              all
            </ToggleButton>
            <ToggleButton className='state' value="center" aria-label="centered">
              completed
            </ToggleButton>
            <ToggleButton className='state' value="right" aria-label="right aligned">
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
              width: '90%',
              height: '55px'
            }} id="outlined-basic" label="task title" />
          </div>

          <div style={{
            width: '100%'
          }} >
            <TextField value={newTodo.desc} onChange={handleDesc} sx={{
              marginBlock: '7px',
              width: '90%',
            }}
              id="outlined-multiline-static"
              label="task description"
              multiline
              rows={3}
            />
          </div>
        </div>

        <div className='addTodo__confirm'  >
          <Button className={`${isDisabled && 'disabled'} add`} onClick={handleAddTodo}
            sx={{
              backgroundColor: 'rgba(0,128,0,0.9)',
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