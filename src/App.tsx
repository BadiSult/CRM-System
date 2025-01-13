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
  const [editNewId, setEditNewId] = useState<number | null>(null)
  const [editNewTitle, setEditNewTitle] = useState<string>('')
  const [filter, setFilter] = useState<string>('all');
  const [giveId, setGiveId] = useState<number>(0)
  const [idStart, setIdStart] = useState<boolean>(false)

  const fetchTodos = async() =>{
    setLoading(true)
    setError(null)

    try{
      const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`)
      const result: MetaResponse<Todo, TodoInfo> = await response.json()
      setTodos(result.data)
      setInfo(result.info || null)
      setLoading(false)
       


    }catch(err){
      setError('Error data')
    }
  }

  const changeFilter = (newFilter: string) => {
    setFilter(newFilter);
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
       
         
      })
      
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch{
      setError('error delete')
    }
  }

  const startSave = async(id:Todo['id'], current:string )=>{ 
    setEditNewId(id)
    setEditNewTitle(current)
  }
  
  const saveTask = async()=>{
    if(!editNewTitle.trim()) return
    const request: TodoRequest = {title:editNewTitle} 
    try{
        await fetch(`https://easydev.club/api/v1/todos/${editNewId}`,{
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(request)
      })
       
      setTodos(prev => prev.map(todo=> todo.id === editNewId ? {...todo, title:editNewTitle } : todo))

      setEditNewId(null)
      setEditNewTitle('')
    }catch{
      setError('error save')
    }
  }

  const cancelEdit = async() =>{
    setEditNewId(null)
    setEditNewTitle('')
  }
  
  const startGiveId = async()=>{
    setIdStart(!idStart)
  }
  
  const giveTaskId = async(id:Todo['id']) =>{
     try{
      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`,{
        method: 'GET',
      })
      const result:Todo  = await response.json()
      console.log('Task fetched:', result);
      setTodos(prev => 
        prev.map(todo=> todo.id === id ?   result : todo))
      setError(null)
      setGiveId(0)
     }catch{
      setError('error id')
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
        <div style={{display:'flex'}}>
           <p  
            onClick={() => changeFilter('all')}
        style={{
          marginRight: '10px',
          backgroundColor: filter === 'all' ? 'lightblue' : 'white',
        }}>Всего:{info.all}  </p> 
           <p  
           onClick={() => changeFilter('completed')}
        style={{
          marginRight: '10px',
          backgroundColor: filter === 'completed' ? 'lightblue' : 'white',
        }}> Выполнено:{info.completed}  </p>
           <p  onClick={() => changeFilter('inWork')}
           style={{
          marginRight: '10px',
          backgroundColor: filter === 'inWork' ? 'lightblue' : 'white',
        }}> В работе:{info.inWork}  </p>
        </div>
      
      )}
      <div>
        <button onClick={startGiveId}>id</button>
        {idStart && <div>
            <input type="text"
              value={giveId}
             onChange={e=> setGiveId(Number(e.target.value))}
             />
             <button onClick={() => giveTaskId(giveId) }>check</button>
             
             </div>  }
      </div>
      <ul  style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map(todo=>
        <li key={todo.id}>
          {todo.id === editNewId ? (
            <div>
            <input type="text"
             value={editNewTitle}
             onChange={e=>setEditNewTitle(e.target.value)}
             />
             <button onClick={saveTask}>save</button>
             <button onClick={cancelEdit}>cancel</button>
             </div>   
          ) : (
            <span
            style={{textDecoration: todo.isDone ? 'line-through' : 'none'
  
            }}
            >
               <input type="checkbox" checked={todo.isDone} onClick={()=>toggleTodoStatus(todo.id, !todo.isDone)}/>
              {todo.title} ( {new Date(todo.created).toLocaleDateString()})
               
            </span>
          )}
            
          <i
            className="fas fa-edit"
            style={{ cursor: 'pointer', marginLeft: '10px' }}
            onClick={()=>startSave(todo.id, todo.title)}
          ></i>
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


 
 




 
