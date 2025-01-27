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

  const handleToggleTodoStatus = async ( ) =>{
     
    try{
       const taskRequest:TodoRequest = {isDone: !todo.isDone}
      await fetch( `https://easydev.club/api/v1/todos/${todo.id}`, {
        method: 'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(taskRequest)
      });
      onUpdate();
    }catch{
      onError('Error status');
    }
  };

  const handleDeleteTask = async( )=>{

    try{
        await fetch(`https://easydev.club/api/v1/todos/${todo.id}`,{
        method:'DELETE',
      });

      onUpdate();
    } catch{
      alert('error delete');
    }
  };


  const handleCanselEdit = async() =>{
    setIsEditing(false)
    setEditTitle(todo.title)
  }

  const handleStartEdit = async() =>{
    setIsEditing(true)
  }


  const handleSaveTask = async()=>{
    const trimTask = editTitle.trim();
    if(trimTask.length  < 2 || trimTask.length  > 64){
      onError('error valid');
      return;
    }

    try{
      const trimTaskRequest:TodoRequest = {title: trimTask}
      await fetch(`https://easydev.club/api/v1/todos/${todo.id}`,{
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(trimTaskRequest)
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
        <div className={styles.edit}>
          <input type="text"
            value={editTitle}
            onChange={(e)=> setEditTitle(e.target.value)}
          />
          <button onClick={handleSaveTask}>Save</button>
          <button onClick={handleCanselEdit}>Cancel</button>
        </div>
      ) : (
        <div   style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>

          <div className={styles.title}>
            <div className={styles.div1}>
              <div>
                <input className={styles.input}   type="checkbox" checked={todo.isDone} onChange={handleToggleTodoStatus} />
              </div>

              <div className={styles.title1}>
                {todo.title}
              </div>

            </div>

            <div className={styles.div} >
              <i style={{    }} className="fas fa-edit" onClick={handleStartEdit}></i>
              <i  style={{marginLeft: '10px' }} className="fas fa-trash" onClick={handleDeleteTask}></i>
            </div>

          </div>

        </div>

      )}


    </li>
  );

};