 
import React, { useEffect }  from 'react';
import ErrorBoundary from './component/ErrorBoundary';
import { MainLayaut } from './Sidebar/MainLayaut';
import { Provider, useDispatch, useSelector  } from "react-redux";
import { AppDispatch, RootState, store } from "./store/store";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { fetchProfile } from './store/authSlice';
 
 
 

const App: React.FC = () => {
   
  return (
     
      <ErrorBoundary>
       
         <MainLayaut />
       
      </ErrorBoundary>
     
  );
};

export default App;