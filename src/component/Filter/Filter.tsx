import React from 'react';
import { TodoInfo } from '../types';
import styles from '../Filter/Filter.module.css';
import { FilterType } from '../types';
interface FilterProps {
    info: TodoInfo
    filter: FilterType
    onChangeFilter: (filter: FilterType) => void
}
const translatedTodoFilter = {
  all : 'все',
  inWork: 'В работе',
  completed: 'выполнено'
  
  }

export const Filter: React.FC<FilterProps> = ({info, filter, onChangeFilter}) =>(
  <div style={{display:'flex'}}>
    {(['all', 'completed', 'inWork'] as const).map(filt=>
      <p className={styles.p}
        key={filt}
        onClick={()=>onChangeFilter(filt)}
        style={{
          marginRight: '10px',
          color: filter === filt ? 'blue' : 'black',
          cursor: 'pointer',
        }}
      >
        {`${translatedTodoFilter[filt]} (${info[filt]})`}
      </p>
    )}

  </div>
); 