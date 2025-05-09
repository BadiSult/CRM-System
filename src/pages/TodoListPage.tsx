 
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
 
import '@fortawesome/fontawesome-free/css/all.min.css';
 
import { AddTodo } from '../component/AddTodo/AddTodo';
import { Filter } from '../component/Filter/Filter';
import { TodoList } from '../component/TodoList/TodoList';
import { TodoInfo,   Todo} from '../component/types';
import { fetchTodos as apiFetchTodos } from '../api/todosApi';
import { FilterType } from '../component/types';
// Интерфейсы




 




export const TodoListPage : React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [error, setError] = useState<string>('');
 
  const [filter, setFilter] = useState<FilterType>(
   (localStorage.getItem('activeFilter') as FilterType) || 'all');



    


  const fetchTodos =  useCallback(async(currentFilter: FilterType ) =>{
 

    setError('');

    try{
 
       const result = await apiFetchTodos(currentFilter)
 
      setTodos(result.data);
      setInfo(result.info || { all: 0, completed: 0, inWork: 0 } );

    }catch(err){
      setError('Error data');

    }
 
  },[setTodos, setInfo]) ;


  const memoTodos  = useMemo(() =>todos, [todos])

const FilterRef = useRef(filter)

  

  const changeFilter =   useCallback((newFilter: FilterType) => {
    setFilter((prewFilter) => {
      if(newFilter !== prewFilter){
        setFilter(newFilter)
        localStorage.setItem('activeFilter', newFilter)
        FilterRef.current = newFilter
        fetchTodos(newFilter)
      }
      return newFilter
    })
    
    
  },[fetchTodos]) ;
 

  const handleError = (message: string) => setError(message);

  useEffect(()=>{
 
    fetchTodos(FilterRef.current);
    const interval = setInterval(()=>{
      fetchTodos(FilterRef.current);
    }, 5000)

    return () => clearInterval(interval)
     
  },[fetchTodos]);






 
  return (
    
    <div style={{marginLeft: '40%'}}  >
     <h1>Cписок Задач</h1>

 
      <AddTodo onAddSuccess={()=>fetchTodos(FilterRef.current)} onError={handleError}/>

      {error && <p style={{color:'red'}}>{error}</p>}
       <Filter info={info} filter={filter} onChangeFilter={changeFilter}/>
      <TodoList onError={handleError} onUpdate={()=>fetchTodos(FilterRef.current)} todos={memoTodos} />
   
    </div>
  );
};