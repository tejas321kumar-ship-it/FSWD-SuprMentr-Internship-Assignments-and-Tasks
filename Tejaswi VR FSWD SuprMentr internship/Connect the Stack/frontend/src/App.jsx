import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3020/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(function () {
    loadTasks()
  }, [])

  async function loadTasks() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_BASE_URL + '/tasks')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load tasks')
      }

      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function addTask(event) {
    event.preventDefault()

    if (!newTaskTitle.trim()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_BASE_URL + '/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add task')
      }

      setTasks(function (prev) {
        return prev.concat(data)
      })
      setNewTaskTitle('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function toggleTaskStatus(task) {
    const nextStatus = task.status === 'done' ? 'pending' : 'done'

    try {
      const response = await fetch(API_BASE_URL + '/tasks/' + task.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task')
      }

      setTasks(function (prev) {
        const updated = []

        for (let i = 0; i < prev.length; i = i + 1) {
          if (prev[i].id === task.id) {
            updated.push(data)
          } else {
            updated.push(prev[i])
          }
        }

        return updated
      })
    } catch (err) {
      setError(err.message)
    }
  }

  async function deleteTask(taskId) {
    try {
      const response = await fetch(API_BASE_URL + '/tasks/' + taskId, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete task')
      }

      setTasks(function (prev) {
        const next = []

        for (let i = 0; i < prev.length; i = i + 1) {
          if (prev[i].id !== taskId) {
            next.push(prev[i])
          }
        }

        return next
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="page">
      <header className="header">
        <h1>Connect the Stack</h1>
        <p>React frontend connected to Express backend APIs.</p>
      </header>

      <section className="panel">
        <form className="form" onSubmit={addTask}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={function (event) {
              setNewTaskTitle(event.target.value)
            }}
            placeholder="Enter task title"
          />
          <button type="submit" disabled={loading}>
            Add Task
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="listWrap">
          {tasks.length === 0 && <p className="empty">No tasks found.</p>}

          {tasks.map(function (task) {
            return (
              <div key={task.id} className="taskItem">
                <div>
                  <h3>{task.title}</h3>
                  <p>Status: {task.status}</p>
                </div>

                <div className="actions">
                  <button onClick={function () { toggleTaskStatus(task) }}>
                    Mark {task.status === 'done' ? 'Pending' : 'Done'}
                  </button>
                  <button
                    className="danger"
                    onClick={function () {
                      deleteTask(task.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App
