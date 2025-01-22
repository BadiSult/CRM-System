
import { Todo } from '../types';
import { TodoItem } from '../TodoItem/TodoItem';
import { useState } from 'react';
import styles from '../TodoList/TodoList.module.css';

 interface TodoListProps {
    todos: Todo[]
    onError: (message:string) => void
    onUpdate: () => void
}



export const TodoList:React.FC<TodoListProps> = ({todos, onError, onUpdate}) =>(







  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
    {todos.map(todo =>
      <TodoItem key={todo.id}  onError={onError} onUpdate={onUpdate} todo={todo}/>
    )}



  </ul>



);



