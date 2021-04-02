import React from 'react'
import {FaTimes} from 'react-icons/fa'

// parent is tasks 
//destructure task from props
//destructure onDelete from props from app.js
const Task = ({task,onDelete,onToggle}) => {
    return (
        // ontoggle for this task, if it is doubleclicked pass the id for the ask to the ontoggle function located in app.js
        // must be on the div
        // ternary for classname to determine the styling based on the onToggle that is triggered by the double click
        <div className={`task ${task.reminder?'reminder':''}`} onDoubleClick={()=>onToggle(task.id)}>
        {/* mapped in task from the tasks component */}
        {/* ondelete passed from app to tasks to this component and fired with onclick */}
        {/* pass the id to the function via task.id through an anonymous function */}
            <h3 >{task.text} <FaTimes style={{color:'red', cursor: 'pointer'}} onClick={()=>onDelete(task.id)}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
