import React, { useState } from 'react';
import { Todo, TodoRequest } from '../types';
import styles from '../TodoItem/TodoItem.module.css';
interface TodoItemProps {
    todo: Todo
    onUpdate:()=>void
    onError:(message:string) => void
}


export const TodoItem:React.FC<TodoItemProps> = ({todo, onUpdate, onError }) =>{
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const toggleTodoStatus = async ( ) =>{

    try{
      await fetch( `https://easydev.club/api/v1/todos/${todo.id}`, {
        method: 'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({isDone: !todo.isDone} as TodoRequest)
      });
      onUpdate();
    }catch{
      onError('Error status');
    }
  };

  const deleteTask = async( )=>{

    try{
      const response = await fetch(`https://easydev.club/api/v1/todos/${todo.id}`,{
        method:'DELETE',
      });

      onUpdate();
    } catch{
      onError('error delete');
    }
  };



  const saveTask = async()=>{
    const trimTask = editTitle.trim();
    if(trimTask.length  < 2 || trimTask.length  > 64){
      onError('error valid');
      return;
    }

    try{
      await fetch(`https://easydev.club/api/v1/todos/${todo.id}`,{
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title: trimTask} as TodoRequest)
      });

      setIsEditing(false);
      onUpdate();

    }catch{
      onError('error save');
    }
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input type="text"
            value={editTitle}
            onChange={(e)=> setEditTitle(e.target.value)}
          />
          <button onClick={saveTask}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <span   style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>

          <div className={styles.title}>
            <div className={styles.div1}>
              <div>
                <input className={styles.input}   type="checkbox" checked={todo.isDone} onChange={toggleTodoStatus} />
              </div>

              <div className={styles.title1}>
                {todo.title}
              </div>

            </div>

            <div className={styles.div} >
              <i style={{    }} className="fas fa-edit" onClick={() => setIsEditing(true)}></i>
              <i  style={{marginLeft: '10px' }} className="fas fa-trash" onClick={deleteTask}></i>
            </div>

          </div>

        </span>

      )}


    </li>
  );

};