import {useState} from 'react'
import Task from './Task'

//props from app.js
const Tasks = ({tasks, onDelete, onToggle}) => {



    return (
        <>
            {/* parent of the list should have a key prop */}
            {tasks.map((task)=>(
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Tasks
