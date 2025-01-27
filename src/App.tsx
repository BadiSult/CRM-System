import React, { useEffect, useState, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
 
import { AddTodo } from './component/AddTodo/AddTodo';
import { Filter } from './component/Filter/Filter';
import { TodoList } from './component/TodoList/TodoList';
import { TodoInfo,   Todo, MetaResponse } from './component/types';
// Интерфейсы




type FilterType = 'all' | 'completed' | 'inWork'




export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('all');






  const fetchTodos = async( ) =>{

    setError('');

    try{
      const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`);
      const result: MetaResponse<Todo, TodoInfo> = await response.json();
      setTodos(result.data);
      setInfo(result.info || { all: 0, completed: 0, inWork: 0 } );

    }catch(err){
      setError('Error data');

    }
  };

  const changeFilter =  (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const handleError = (message: string) => setError(message);

  useEffect(()=>{
    fetchTodos();
  },[filter]);






  return (
    <div style={{marginLeft: '40%'}}  >
     <h1>Cписок Задач</h1>

      <AddTodo onAddSuccess={fetchTodos} onError={handleError}/>

      {error && <p style={{color:'red'}}>{error}</p>}
       <Filter info={info} filter={filter} onChangeFilter={changeFilter}/>
      <TodoList onError={handleError} onUpdate={fetchTodos} todos={todos} />
    </div>
  );
};







