import React from 'react';
import { TodoInfo } from '../types';
import styles from '../Filter/Filter.module.css';
interface FilterProps {
    info: TodoInfo
    filter: string
    onChangeFilter: (filter: string) => void
}


export const Filter: React.FC<FilterProps> = ({info, filter, onChangeFilter}) =>(
  <div style={{display:'flex'}}>
    {['all', 'completed', 'inWork'].map(f=>
      <p className={styles.p}
        key={f}
        onClick={()=>onChangeFilter(f)}
        style={{
          marginRight: '10px',
          color: filter === f ? 'blue' : 'black',
          cursor: 'pointer',
        }}
      >
        {f === 'all' && `Всего: ${info.all}`}
        {f === 'completed' && `Выполнено: ${info.completed}`}
        {f === 'inWork' && `В работе: ${info.inWork}`}
      </p>
    )}

  </div>
);