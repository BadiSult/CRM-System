 
import React  from 'react';
import ErrorBoundary from './component/ErrorBoundary';
import { MainLayaut } from './Sidebar/MainLayaut';
import { Provider  } from "react-redux";
import { store } from "./store/store";
 
 
 

const App: React.FC = () => {
   
  return (
    <Provider store={store}  >
      <ErrorBoundary>
        <MainLayaut/>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;