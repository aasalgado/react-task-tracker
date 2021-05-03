import { useState, useEffect } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Meeting at School",
      "day": "Mar 27th at 3:00pm",
      "reminder": true
    },
    {
      "text": "Take Test",
      "day": "Friday",
      "reminder": false,
      "id": 3
    }
  ]);

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const tasksFromServer = await fetchTasks()
  //     setTasks(tasksFromServer);
  //   }

  //   getTasks()
  // }, [])

  // const fetchTasks = async () => {
  //   const res = await fetch('http://localhost:5000/tasks')
  //   const data = await res.json()

  //   return data;
  // }

  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/tasks/${id}`)
  //   const data = await res.json()

  //   return data;
  // }

  const deleteTask = async (id) => {
    // await fetch (`http://localhost:5000/tasks/${id}`, {
    //   method: 'DELETE'
    //   })

    setTasks(tasks.filter((task) => task.id !== id));
  }

  const onToggle = async (id) => {
    // const taskToToggle = await fetchTask(id)
    // const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-type' : 'application/json'
    //   },
    //   body: JSON.stringify(updateTask)
    // })

    // const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  const addTask = async (task) => {
    // const res = await fetch('http://localhost:5000/tasks', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type' : 'application/json'
    //   },
    //   body: JSON.stringify(task)
    // })

    // const data = await res.json();

    // setTasks([...tasks,data])
    setTasks([...tasks,{ id: Math.floor(Math.random() * 10000) + 1, day: task.day, reminder: task.reminder, text: task.text }]);
  }

  return (
    <Router>
    <div className="container">
      <Header onToggle={() => setshowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {/* {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={onToggle}/> 
      : 'No Tasks to Show'}  */}
      <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={onToggle}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )}
        />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
