import React, { useEffect, useState, useRef } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css"
// Интерфейсы
interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

 
export const App: React.FC = () => {
 
  const [todos, setTodos] = useState<Todo[]>([])
  const [info, setInfo]  = useState<TodoInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string|null>(null) 
  const [newTask, setNewTask] = useState<string>('')

   

  const fetchTodos = async() =>{
    setLoading(true)
    setError(null)

    try{
      const response = await fetch('https://easydev.club/api/v1/todos')
      const result: MetaResponse<Todo, TodoInfo> = await response.json()
      setTodos(result.data)
      setInfo(result.info || null)
      setLoading(false)
       


    }catch(err){
      setError('Error data')
    }
  }

  const toggleTodoStatus = async (id:Todo['id'], isDone: boolean) =>{
    const request: TodoRequest ={isDone};
    try{
    await fetch( `https://easydev.club/api/v1/todos/${id}`, {
      method: 'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(request)
    }) 
    setTodos((prevTodos)=>
    prevTodos.map(todos=>
      todos.id === id ? {...todos, isDone} : todos
    ))
    }catch{
      setError('Error status')
    }
  }

   

const addTask = async()=>{
  if (!newTask.trim()) return
  const request: TodoRequest = {title:newTask}
  try{
    const response = await fetch('https://easydev.club/api/v1/todos',{
      method:'POST',
      headers:{'Content-Type' : 'application/json'},
      body: JSON.stringify(request)
    })
    const newTodo: Todo = await response.json()
    console.log(newTodo);
    
    setTodos(prevTodos => [...prevTodos, newTodo])
    setNewTask('')
  }catch{
    setError('Error new data')
  }
}


  const deleteTask = async(id:Todo['id'])=>{
       
    try{
      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method:'DELETE',
        headers:{'Content-Type': 'application/json'},
         
      })
      
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch{
      setError('error delete')
    }
  }



  useEffect(()=>{
    fetchTodos()
  },[info])

  

   
  
  return (
     <div>
      <h1>Список Задач</h1>
       <div>
        <input 
        type="text"
        placeholder='Add...' 
        value={newTask}
        onChange={(e)=>setNewTask(e.target.value)}
        />
        <button onClick={addTask}>ADD</button>
       </div>
       
      {error && <p style={{color:'red'}}>{error}</p>}
      {info && (
      <p>Всего: {info.all} Выполнено: {info.completed} В работе: {info.inWork}</p> 
      )}
      <ul  style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map(todo=>
        <li key={todo.id}>
          <span
          style={{textDecoration: todo.isDone ? 'line-through' : 'none'

          }}
          >
             <input type="checkbox" checked={todo.isDone} onClick={()=>toggleTodoStatus(todo.id, !todo.isDone)}/>
            {todo.title} ( {new Date(todo.created).toLocaleDateString()})
             
          </span>
          <i
            className="fas fa-trash"
            style={{  cursor: 'pointer', marginLeft: '10px' }}  
            onClick={()=>deleteTask(todo.id)}   
        ></i>

        </li>
      )}
      </ul>
      
     </div>
  );
};


 










 
