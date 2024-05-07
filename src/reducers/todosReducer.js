import { v4 as uuid } from 'uuid';

export default function reducer(currentTodo, action) {
  switch (action.type) {
    case "added": {
      return ([...currentTodo, {
        id: uuid(),
        title: action.payload.newTodo.title,
        description: action.payload.newTodo.desc,
        isCompleted: false,
        date: new Date().toDateString()
      }])
    }
    case "edited": {
      let editTask = [...currentTodo]
      if (!(action.payload.todo.title.trim() == '' && action.payload.todo.description.trim() == '')) {
        editTask = currentTodo.map((task) => {
          if (action.payload.todo.id === task.id) {
            return {
              ...task,
              title: action.payload.todo.title,
              description: action.payload.todo.description,
            }
          } else {
            return task;
          }
        })
      }
      return editTask;
    }
    case "deleted": {
      const todosCheck = currentTodo.filter((task) => {
        return !(action.payload.todo.id === task.id)
      })
      return (todosCheck);
    }

    case "isCompleted": {
      const todosCheck = currentTodo.map((task) => {
        if (action.payload.todo.id === task.id) {
          task.isCompleted = !task.isCompleted
        }
        return task;
      })
      return (todosCheck);

    }

    default: {
      alert("erroe" + action.type)
    }

  }
}