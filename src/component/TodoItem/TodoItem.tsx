import React, { useState } from 'react';
import { Todo, TodoRequest } from '../types';
import styles from '../TodoItem/TodoItem.module.css';
 import { toggleTodos } from '../../api/todosApi';
 import {  deleteTask } from '../../api/todosApi';
 import {  saveTask } from '../../api/todosApi';
 import {Form, Input, Button,  Card, Space } from 'antd';
 import { Typography } from 'antd';
 import { EditOutlined, DeleteOutlined, CloseOutlined, SaveOutlined  } from '@ant-design/icons';

interface TodoItemProps {
    todo: Todo
    onUpdate:()=>void
    onError:(message:string) => void
}


export const TodoItem:React.FC<TodoItemProps> = ({todo, onUpdate, onError }) =>{
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [form] = Form.useForm(); 

  
  const handleToggleTodoStatus = async ( ) =>{
     
    try{
       
      await toggleTodos(todo.id, todo) 

      onUpdate();
    }catch{
      onError('Error status');
    }
  };

  const handleDeleteTask = async( )=>{

    try{
      await deleteTask(todo.id)

      onUpdate();
    } catch{
      onError('error delete');
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  }

const handleCanselEdit = () =>{
  setIsEditing(false);
}

  const handleSaveTask = async()=>{
    const trimTask = editTitle.trim();
     

    try{
      await form.validateFields();
      const trimTaskRequest:TodoRequest = {title: trimTask}
     await saveTask(todo.id, trimTaskRequest)

      setIsEditing(false);
      onUpdate();

    }catch{
      onError('error save');
    }
  };

  return (
    <Card>
      {isEditing ? (
        <Form form={form} layout="inline">
          <Form.Item
            name="title"
            initialValue={editTitle}
            rules={[
              { required: true, message: 'Введите название задачи!' },
              { min: 2, message: 'Название должно содержать минимум 2 символа!' },
              { max: 64, message: 'Название не может превышать 64 символа!' },
            ]}
          >
            <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          </Form.Item>

          <Button icon={<SaveOutlined />} type="primary" onClick={handleSaveTask}>
            Сохранить
          </Button>
          <Button icon={<CloseOutlined />} onClick={handleCanselEdit}>
            Отмена
          </Button>
        </Form>
      )  : (
        <Space    >

          <Space className={styles.title}>
            <Space className={styles.div1}>
              <Space>
                <Input className={styles.input}   type="checkbox" checked={todo.isDone} onChange={handleToggleTodoStatus} />
              </Space>

               
              <Typography.Text ellipsis={{ tooltip: todo.title }} style={{ maxWidth: '180px', textDecoration: todo.isDone ? 'line-through' : 'none'  }} >
                 {todo.title}
              </Typography.Text>
               

            </Space>

            <Space className={styles.div} >
            <Button icon={<EditOutlined />} onClick={handleStartEdit} />
            <Button icon={<DeleteOutlined />} danger onClick={handleDeleteTask} />
            </Space>

          </Space>

        </Space>

      )}


    </Card>
  );

};