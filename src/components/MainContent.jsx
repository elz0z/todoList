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
    setNewTodo({ ...newTodo, title: e.target.value })
  }
  function handleDesc(e) {
    setNewTodo({ ...newTodo, desc: e.target.value })
  }
  function handleAddTodo(e) {
    e.preventDefault();
    if (newTodo.title.trim() && newTodo.desc.trim()) {
      setTodos([...todos, {
        id: uuid(),
        title: newTodo.title,
        description: newTodo.desc,
        isCompleted: false
      }])
      setNewTodo({ title: '', desc: '' })
      // localStorage.setItem('todosList', JSON.stringify(todos));
    }
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

        {showTodos}

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
          <Button onClick={handleAddTodo}
            sx={{
              backgroundColor: 'rgba(0,128,0,0.9)',
              width: '75%',
              height: '55px'
            }} variant="contained" endIcon={<NoteAddIcon />}>
            add to tasks
          </Button>
        </div>
      </main>
    </TodosContext.Provider>

  )
}