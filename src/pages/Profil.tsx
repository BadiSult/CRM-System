import {  useAuth } from '../component/AuthContext/AuthContext';




export const Profil:React.FC =() =>{
     const { user  } = useAuth();
     
     
     console.log("Проверяем доступ, текущий user:", user);
     
     return(
        <div>
        <h1> Данные профиля</h1>
         {user ?  <ul>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>{user.phone ? user.phone : "not phone"}</li>
     </ul>
     : <p>not date</p>
         }
        </div>
         
    )


}