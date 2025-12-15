import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { Task } from './types'
import TaskList from './components/TaskList'

function App() {
  type Filter='all'|'completed'|'pending';
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name,setName]=useState<string>("");
  const [filter,setFilter]=useState<Filter>('all');
  
  const filteredTasks=tasks.filter(task=>{
    if(filter=='completed') return task.completed;
    else if(filter=='pending') return !task.completed
    else return true
  })
  useEffect(()=>{
    const saved=localStorage.getItem("tasks");
    if(saved){
      setTasks(JSON.parse(saved));
        }
    },[])
  useEffect(()=>{
    if (tasks.length>0)
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks])
  const addTask=()=>{
    if (name.trim()==''){
      alert("Add a task name")
      return
    }
    setTasks(prev=>[...prev,{id:Date.now(),text:name,completed:false}]);
    setName("")
  }

  const toggleTask=(id:number)=>{
    setTasks(prev=>
      prev.map((task:Task)=>
        task.id===id?{...task,completed:!task.completed}:task
      )
    )
  }
  const deleteTask=(id:number)=>{
    setTasks(prev=>prev.filter(task=>task.id!==id))
  }
  return (
    <>
      <div style={{
        display:'flex',
        justifyContent:"center",
        alignItems:'flex-start',
        minHeight:'100vh',width:'100%',padding:'20px',margin:'auto',
        }}>
        <div style={{width:'100%',
          maxWidth:'480px',
          padding:'20px',
          borderRadius:'12px',
          boxShadow:'0px 4px 12px rgba(0,0,0,1)'
        }}>
        <h2>Task Manager</h2>
        <div style={{display:'flex',}}>
        <input placeholder='Enter task name' value={name} onChange={(e)=>setName(e.target.value)}
        style={{'padding':'10px','borderRadius':'10px 0 0 10px',width:'80%'}}/>
        <button style={{'background':'rgba(55, 191, 237, 1)',padding:'10px', borderRadius:'0 10px 10px 0',width:'15%'}} onClick={addTask}>Add</button>
        </div>
        <div style={{display:'flex',margin:'10px',gap:'10px'}}>
          <button className={`filter-btn ${filter=='all'?'active':''}`} onClick={()=>setFilter('all')}>All</button>
          <button className={`filter-btn ${filter=='completed'?'completed':''}`} onClick={()=>setFilter('completed')}>Completed</button>
          <button className={`filter-btn ${filter=='pending'?'pending':''}`} onClick={()=>setFilter('pending')}>Pending</button>

        </div>
        <h3>Task List</h3>
        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask}/>
       </div>
       </div>
    </>
  )
}

export default App
