import React, { useEffect, useState, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Header } from './component/Header/Header';
import { AddTodo } from './component/AddTodo/AddTodo';
import { Filter } from './component/Filter/Filter';
import { TodoList } from './component/TodoList/TodoList';
import { TodoInfo,   Todo, MetaResponse } from './component/types';
// Интерфейсы









export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo]  = useState<TodoInfo | null>(null);
  const [error, setError] = useState<string|null>(null);
  const [filter, setFilter] = useState<string>('all');






  const fetchTodos = async( ) =>{

    setError(null);

    try{
      const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`);
      const result: MetaResponse<Todo, TodoInfo> = await response.json();
      setTodos(result.data);
      setInfo(result.info || null);

    }catch(err){
      setError('Error data');

    }
  };

  const changeFilter =  (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleError = (message: string) => setError(message);

  useEffect(()=>{
    fetchTodos();
  },[filter]);






  return (
    <div style={{marginLeft: '40%'}}  >
      <Header title='Список Задач'/>

      <AddTodo onAddSuccess={fetchTodos} onError={handleError}/>

      {error && <p style={{color:'red'}}>{error}</p>}
      {info &&  <Filter info={info} filter={filter} onChangeFilter={changeFilter}/>}
      <TodoList onError={handleError} onUpdate={fetchTodos} todos={todos} />
    </div>
  );
};







