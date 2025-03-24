import axios from 'axios';
import tokenInstance, { apiInstance, getProfile, isTokenExpired } from '../api/todosApi';
import {  useAuth } from '../component/AuthContext/AuthContext';
import jwt_decode from "jwt-decode";
 

export const Profil:React.FC =() =>{
     const { user, logout  } = useAuth();

  
     
     return(
        <div>
        <h1> Данные профиля</h1>
         {user ?  <ul>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>{user.phoneNumber || "not phone"}</li>
     </ul>
     : <p>not date</p>
         }
          
          
        </div>
         
    )


}
