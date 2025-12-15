import React, { useEffect } from 'react'
import type { Task } from '../types'

interface TaskListProps{
    tasks:Task[];
    onToggle:(id:number)=>void;
    onDelete:(id:number)=>void;
}

function TaskList({tasks,onToggle,onDelete}:TaskListProps) {

  return (
    <div>
        {tasks.map((task:Task)=>(
            <div key={task.id} style={{display:'flex', flexDirection:'row',gap:'10px',marginBottom:'10px',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
                <input type='checkbox' checked={task.completed} onChange={()=>onToggle(task.id)}/>
                <span style={{
                    textDecoration:task.completed?'line-through wavy red':'none',
                    opacity:task.completed?"0.5":"1"}}>{task.text}</span>
                <button onClick={()=>onDelete(task.id)}
                  style={{
                    padding:'5px',
                    borderRadius:'5px',
                    backgroundColor:'rgba(214, 36, 36, 1)',
                    color:'white',
                    cursor:'pointer'
                  }}>Delete</button></div>
                
        ))}
    </div>
  )
}

export default TaskList