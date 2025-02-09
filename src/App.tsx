 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { TodoListPage } from './pages/TodoListPage';
import { Profil } from './pages/Profil';
import 'antd/dist/reset.css';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="todo">Список задач</Link></li>
          <li><Link to="profill">Профиль</Link></li>
           
        </ul>
      </nav>
      
       <Routes>
       <Route path="todo" element={<TodoListPage />} />
       <Route path="profill" element={< Profil />} />
       </Routes>
         
         
       
    </Router>
  );
};

export default App;