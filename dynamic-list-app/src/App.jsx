import { useState } from 'react'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [input, setInput] = useState("")

    function addTask() {
        if (input.trim() === "") return

        const newTask = {
            id: Date.now(),
            text: input.trim()
        }
        setTasks([...tasks, newTask])
        setInput("")
    }

    function deleteTask(id) {
        const updated = tasks.filter(function (task) {
            return task.id !== id
        })
        setTasks(updated)
    }

    return (
        <div className="container">
            <h1>Dynamic List App</h1>
            <p className="subtitle">Add and delete tasks using hooks</p>

            <div className="input-row">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={input}
                    onChange={function (e) { setInput(e.target.value) }}
                />
                <button className="add-btn" onClick={addTask}>Add</button>
            </div>

            <div className="task-list">
                {tasks.length === 0 ? (
                    <p className="empty-msg">No tasks yet. Add one above!</p>
                ) : (
                    tasks.map(function (task) {
                        return (
                            <div className="task-item" key={task.id}>
                                <span className="task-text">{task.text}</span>
                                <button className="delete-btn" onClick={function () { deleteTask(task.id) }}>Delete</button>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default App
