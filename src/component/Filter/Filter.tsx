import React from 'react';
import { TodoInfo } from '../types';
import styles from '../Filter/Filter.module.css';
import { Radio } from 'antd';
interface FilterProps {
    info: TodoInfo
    filter: 'all' | 'completed' | 'inWork'
    onChangeFilter: (filter: 'all' | 'completed' | 'inWork') => void
}
 
export const Filter: React.FC<FilterProps> = ({info, filter, onChangeFilter}) =>(
  
   <Radio.Group className={styles.radio} value={filter} onChange={(e) => onChangeFilter(e.target.value)}>
  <Radio value="all">Все: {info.all}</Radio>
  <Radio value="completed">Выполненные: {info.completed}</Radio>
  <Radio value="inWork">В работе: {info.inWork}</Radio>
</Radio.Group>

   
); 