import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from "../Navbar"
import TodoItem from "../TodoItem";
import Cookies from 'js-cookie';

import './index.css';

const apiConstrains = {
  onSuccess:"SUCCESS",
  onFailure:"FAILURE",
  onLoading:"LOADING",
  noData:"NODATA"
}

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const [apiStatus,setApiStatus] = useState(apiConstrains.onLoading)


  // Fetch todos from the backend when the component mounts

  const fetchTodos = async () => {
    const userId = Cookies.get('user_id');
    try {
      const response = await fetch('https://todo-application-backend-rk3h.onrender.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setTodos(data); // Set todos from response
        data.length === 0 ? setApiStatus(apiConstrains.noData) : setApiStatus(apiConstrains.onSuccess);
      } else {
        console.error('Failed to fetch todos');
        setApiStatus(apiConstrains.onFailure)
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      setApiStatus(apiConstrains.onFailure)
    }
  };


  useEffect(() => {
    setApiStatus(apiConstrains.onLoading)
    fetchTodos();
  }, []);


  const onChangeStatus = async (id,status) => {
      const new_todos = todos.map((todo) => {
        if(todo.id === id)
        {
          return {
            ...todo,
            is_completed: !status
          }
        }

        return todo
      })

      setTodos(new_todos)

      

      const response = await fetch('https://todo-application-backend-rk3h.onrender.com/change-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "todo_id" : id,
          "status" : !status
        }),
      });


      if(response.ok)
      {
        console.log("updated")
      }

  }

  // Event handler for updating the todoText state when the input changes
  const onChangeTodo = (event) => {
    setTodoText(event.target.value);
  };

  // Event handler for adding a new todo
  const onClickAddBtn = async () => {
    if (todoText.trim() !== '') {
      const userId = Cookies.get('user_id');
      const newTodo = {
        user_id: userId,
        todo: todoText,
        is_completed: false,
      };

      try {
        const response = await fetch('https://todo-application-backend-rk3h.onrender.com/add-todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        });

        if (response.ok) {
          // Update todos state with the newly added todo
          fetchTodos()
          setTodoText(''); // Clear input field after adding the todo
        } else {
          console.error('Failed to add todo');
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };


  const onClickDeleteBtn = async (id) => {
      const new_todos = todos.filter((todo) => todo.id !== id)

      setTodos(new_todos)

      new_todos.length === 0 && setApiStatus(apiConstrains.noData)

      const response = await fetch('https://todo-application-backend-rk3h.onrender.com/delete-todo ', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "todo_id" : id
        })
      });


      if(response.ok)
      {
        console.log("deleted")
      }
  }

  console.log(todos)



  const renderTodos = () => {
    switch (apiStatus) {
      case apiConstrains.onSuccess:
        
        return (<>
          <h1 className="todo-items-heading">
          My <span className="todo-items-heading-subpart">Tasks</span>
          </h1>
          <ul className="todo-items-container" style={{ padding: "0px" }}>
          {/* Mapping over the todos array and rendering a TodoItem for each todo */}
          {todos.map((todo) => (
            <TodoItem key={todo.id} item={todo} onChangeStatus = {onChangeStatus} onClickDeleteBtn = {onClickDeleteBtn} />
          ))}
        </ul>
      </>)
    
    case apiConstrains.onLoading:
      return (
        <div style={{display:"flex",justifyContent:"center"}}>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )

    case apiConstrains.noData:
      return (
        <p style={{fontWeight:"500",textAlign:"center",lineHeight:"40px"}}>You have no tasks yet! <br/> Start adding your <span style={{color:"#FABC3F",fontSize:"20px"}}>to-dos</span> and stay on track.</p>
      )

    
    default:
      return <p>something went wrong please try again later</p>
    }
    
  }


  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='home'>
      <Navbar/>
      <div className="todos-bg-container">
        <div className="main-card">
          <h1 className="create-task-heading">
            Create <span className="create-task-heading-subpart">Task</span>
          </h1>
          <input
            type="text"
            value={todoText}
            id="todoUserInput"
            className="todo-user-input"
            placeholder="What needs to be done?"
            onChange={onChangeTodo} // Update todoText on input change
          />
          <button className="button" onClick={onClickAddBtn}>
            Add
          </button>
          
          {renderTodos()}
        </div>
      </div>
    </div>
  );
};

export default Home;
