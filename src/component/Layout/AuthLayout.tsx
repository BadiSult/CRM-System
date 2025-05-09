import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import skelet from '../../assets/skelet.png'
const { Content } = Layout;

export const AuthLayout: React.FC = () => {
  return (
     <div style={{display:"flex"}}>
        <div
        style={{
          flex: 1,
           backgroundColor:"#FFFFFF",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img  style={{width:"1240px", height:"1080px"}} src={skelet} alt="" />
      </div>

      
      <Content
      
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
           
          background: '#FFFFFF',
        }}
      >
        <Outlet />
      </Content>
     </div>
       
       
     
  );
};