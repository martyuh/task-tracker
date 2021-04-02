import {useState,useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'
import Footer from './components/Footer';
import About from './components/About'

function App() {
  const[showAddTask,setShowAddTask] = useState(false)
  const[tasks,setTasks]=useState([])

  // fetch from the db.json 'backend' server
  //use the fetch api with async await
  useEffect(()=>{
    // create a function that will call fetchtasks, which will return a promise
    const getTasks = async()=>{
      // because it has to frab it from the server it must be set to await
      const tasksFromServer = await fetchTasks()
      // set it to state
      setTasks(tasksFromServer)
    }

    //in order for gettasks to run it must be called
    getTasks()
    

  },[])

  // fetch tasks
      // create a function to use async await
      const fetchTasks = async()=>{
        // fetch will return a promise, so you want to await that promise
        // we are fetching from our own server
        const res = await fetch('http://localhost:5000/tasks')
        // then we want to grab the data from the response which is also a promis
        const data = await res.json()
        // the app waits and once the data is returned the data is returned properly 
        return data
  
      }
        // function to grab a single task from the server
            // create a function to use async await
      const fetchTask = async(id)=>{
        // fetch will return a promise, so you want to await that promise
        // we are fetching from our own server
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        // then we want to grab the data from the response which is also a promis
        const data = await res.json()
        // the app waits and once the data is returned the data is returned properly 
        return data
  
      }

//add task, this function is passed to addTask component
// async await when interacting with server and trying to persist data server side
const addTask = async (task) =>{
// assign promise response to res
//fetch is interacting with db.json
//it's a post request so set an object with method to POST
const res = await fetch('http://localhost:5000/tasks',{
  method:'POST',
  // because data is being added you need to add headers to specify content type
  headers:{
    'Content-type': 'application/json'
  },
  // you have to specify the data, which the task that is passed in when you click submit in the AddTask component, that you're sending with body which you will wrap in json.stringify to convert it back to json
  body: JSON.stringify(task)
})
// you must await data that is returned as promise is the new task that is added, which you will update setTasks to reflect in the state on the app
const data = await res.json()
// once the promise is returned then setTasks sets the task properly
setTasks([...tasks,data])

  // const id = Math.floor(Math.random()*10000)+1
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])

  
}

//delete task
// to delete a task from the server this function must be made into an async await one
const deleteTask = async (id) =>{
  // do not need to set the fetch to a variable because we are not getting anything back. it's all being done on the server side only.
  //fetch is interacting with db.json
  // await a promise from the fetch request to the server. call the object by it's id, then set the instructions on what to do to the selected object with the proper method which is 'delete
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })
  // if the taskid is not equal to id filter it out and show the remaining tasks in the list of tasks
  setTasks(tasks.filter((task)=>task.id!==id))
}

// toggle reminder
// fetching data from server means this function must be async await
const toggleReminder = async (id)=>{
//grab the task from the server
//the id is passed in from the task component when a task is double clicked
const taskToToggle= await fetchTask(id)
// put the newly grabbed task into updTask variable
// spread so that all the properties are entered 
const updTask = {...taskToToggle, 
//reminder will be flipped to the opposite of what it is
reminder: !taskToToggle.reminder
}
//update it in the server
//await the promise from the fetch call
const res = await fetch(`http://localhost:5000/tasks/${id}`,
// add method of action that is taking place, which is PUT
{
method: 'PUT',
// headers must be added because we are submitting data
headers: {
  'Content-type':'application/json'
},
// body is the data that is being sent
body: JSON.stringify(updTask),
})
//a promise is then sent back with the updated task
const data=await res.json()

  // ternary if task.id equals id then that task is the one that was doubleclicked on and the reminder will be toggled
  // spread the task and then flip the reminder
  setTasks(tasks.map((task)=>
  // update the ui with the double click that toggles the task server side, when it returns the promise the ui will be updated with data.reminder that is sent back
  task.id===id?{...task,reminder:data.reminder}:task))
}

  return (
    <Router>
    <div className="container">
    {/* pass an inline function as a prop that will fire when the add button in the header component is clicked */}
    <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
    
    {/* to render all the components task,addtasks other than about you can use render and provide the xml within an arrow function with props that then points to parantheses and fragment tags to contain the xml that you'd like to render*/}
    <Route  path='/' exact render={(props)=>(
      <>
      {/*ternary without an else, if showAddtask is true it will display the form otherwise it will not */}
    {showAddTask&&<AddTask onAdd={addTask}/>}
    {/* ternary to determine what to display */}
    {tasks.length>0?<Tasks tasks={tasks} onDelete={deleteTask}
      onToggle={toggleReminder}
    />:'No tasks to show'}
      </>
    )}/>
    <Route  path='/about' exact component={About}/>
    
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
