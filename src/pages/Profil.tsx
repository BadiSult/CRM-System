  
import {  useSelector } from 'react-redux';
 
import {   RootState } from '../store/store';
 
 

export const Profil:React.FC =() =>{
      

     
     const { user } = useSelector((state: RootState) => state.auth);
     
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
