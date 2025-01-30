
import { Todo } from '../types';
import { TodoItem } from '../TodoItem/TodoItem';
 
import { List } from 'antd';

 interface TodoListProps {
    todos: Todo[]
    onError: (message:string) => void
    onUpdate: () => void
}



export const TodoList:React.FC<TodoListProps> = ({todos, onError, onUpdate}) =>(







  <List
  dataSource={todos}
  renderItem={(todo) => (
    <List.Item>
      <TodoItem key={todo.id} onError={onError} onUpdate={onUpdate} todo={todo} />
    </List.Item>
  )}
/>



);



