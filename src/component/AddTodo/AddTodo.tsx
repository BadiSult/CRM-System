import React, { useState } from 'react';
import { Input, Button, Form } from 'antd'; // Импортируем компоненты из antd
import { addTodo as addApi } from '../../api/todosApi';
import styles from '../AddTodo/AddTodo.module.css';

interface AddTodoProps {
  onAddSuccess: () => void;
  onError: (message: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onError, onAddSuccess }) => {
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = async () => {
    const trimTask = newTask.trim();
    if (trimTask.length < 2 || trimTask.length > 64) {
      onError('error valid');
      return;
    }

    try {
      await addApi(newTask);

      await onAddSuccess();

      setNewTask('');
    } catch {
      onError('Error new data');
    }
  };

  return (
    <Form onFinish={handleAddTask} style={{ display: 'flex', justifyContent: 'space-between' }}>
       
      <Form.Item style={{ flex: 1 }} >
        <Input
          className={styles.input}
          placeholder="Add task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </Form.Item>

       
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.button}>
          ADD
        </Button>
      </Form.Item>
    </Form>
  );
};