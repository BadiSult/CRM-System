import React, { useState } from 'react';
import { TodoRequest } from '../types';
import styles from '../AddTodo/AddTodo.module.css';
interface AddTodoProps {
    onAddSuccess: () => void
    onError: (message: string) => void;
  }


export const AddTodo:React.FC<AddTodoProps> = ({  onError, onAddSuccess }) => {
  const [newTask, setNewTask] = useState<string>('');


  const handleAddTask = async()=>{
    const trimTask = newTask.trim();
    if(trimTask.length  < 2 || trimTask.length  > 64){
      onError('error valid');
      return;
    }

    try{
      const newTaskRequest:TodoRequest = {title:newTask}
      await fetch('https://easydev.club/api/v1/todos',{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify( newTaskRequest)
      });


     await onAddSuccess( );

      setNewTask('');

    }catch{
      onError('Error new data');
    }
  };


  return (
    <form  >
      <input
        className={styles.input}
        type="text"
        placeholder="Add..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className={styles.button} onClick={handleAddTask}>ADD</button>
    </form>
  );
};