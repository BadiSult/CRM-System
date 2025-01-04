import React from 'react';
 import {useEffect, useState} from 'react'
import './App.css';

 
 
 
interface Todo { 
	id: number;
	title: string;
	created: string; // ISO date string 
	isDone: boolean; 
}
 
export const App =() =>{
	 
	 
const [data, setData] = useState<Todo[]>([])

 useEffect(()=>{
	fetch('https://easydev.club/api/v1/todos')
	.then((response)=>{
		if(!response.ok){
			throw new Error('Ошибка при загрузке данных')
		}
		return response.json()
	})
	.then((fetchedData) => {
		setData(fetchedData.data)
	})
	.catch((error)=>{
		console.log('Ошибка:', error);
		
	})
 },[])

  
  return (
    <div className="App">
      <h2>Задачник</h2>
       <ul>
		 {data.map((items)=>(
			<li key={items.id} >{items.title}</li>
		))}
	   </ul>
    </div>
  );
}

 














 
