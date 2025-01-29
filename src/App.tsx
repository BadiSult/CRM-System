 
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { TodoListPage } from './pages/TodoListPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
           
        </ul>
      </nav>
      
       <Routes>
       <Route path="/" element={<TodoListPage />} />
       </Routes>
         
         
       
    </Router>
  );
};

export default App;