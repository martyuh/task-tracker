import {useState} from 'react'

//prop onAdd is a function passed in from app parent component
const AddTask = ({onAdd}) => {

    const [text,setText] = useState('')
    const [day,setDay] =useState('')
    const [reminder,setReminder] =useState(false)

    const onSubmit = (e) =>{
        e.preventDefault()

        if(!text){
            alert('Please add a Task')
            return
        }
        // calling function from the parent component
        onAdd({text,day,reminder})

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
     <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input 
            type='text' 
            placeholder='Add Task'
            value={text}
            onChange={(e)=>setText(e.target.value)}    
            />
        </div>
        <div className='form-control'>
            <label>Day & Time</label>
            <input 
            type='text' 
            placeholder='Add Day & Time'
            value={day}
            onChange={(e)=>setDay(e.target.value)}    
            />
        </div>
        <div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input 
            type='checkbox'
            // checkboxes can take in a checked value which can be true or false
            checked={reminder}
            value={reminder}
            // e.currentTarget.Checked will give you a true or false value depending on whether or not it is checked.
            onChange={(e)=>setReminder(e.currentTarget.checked)}    
            />
        </div>
        <input className='btn btn-block' type='submit' value='Save Task'/>

     </form>
    )
}

export default AddTask
