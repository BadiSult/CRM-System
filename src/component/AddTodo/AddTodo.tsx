import React, { useState } from 'react';
import { Input, Button, Form } from 'antd'; // Импортируем компоненты из antd
import { addTodo as addApi } from '../../api/todosApi';
import styles from '../AddTodo/AddTodo.module.css';

interface AddTodoProps {
  onAddSuccess: () => void;
  onError: (message: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onError, onAddSuccess }) => {
   
  const [form] = Form.useForm();

  const handleAddTask = async (values: { task: string }) => {
    
     

    try {
      await addApi(values.task.trim());

      await onAddSuccess();

      form.resetFields();
    } catch {
      onError('Error new data');
    }
  };

  return (
    <Form form={form} onFinish={handleAddTask} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '325px' }}>
       
      <Form.Item style={{ flex: 1 }}
       name="task"
       rules={[
        { required: true, message: 'Task cannot be empty' },
        { min: 2, message: 'Task must be at least 2 characters' },
        { max: 64, message: 'Task must be at most 64 characters' },
      ]}
      >
        <Input
          className={styles.input}
          placeholder="Add task..."
           
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