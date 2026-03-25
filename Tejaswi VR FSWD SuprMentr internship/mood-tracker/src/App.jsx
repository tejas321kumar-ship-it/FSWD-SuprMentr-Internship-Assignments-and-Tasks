import { useState } from 'react'
import './App.css'

const moods = [
    { name: "Happy", emoji: "😊", message: "Glad you're feeling great!" },
    { name: "Sad", emoji: "😢", message: "It's okay, tomorrow will be better." },
    { name: "Excited", emoji: "🤩", message: "That energy is awesome!" },
    { name: "Angry", emoji: "😠", message: "Take a deep breath, you got this." },
    { name: "Tired", emoji: "😴", message: "Maybe take a short break." },
    { name: "Calm", emoji: "😌", message: "Peace of mind is the best feeling." }
]

function App() {
    const [currentMood, setCurrentMood] = useState(null)

    function handleMoodClick(mood) {
        setCurrentMood(mood)
    }

    return (
        <div className="container">
            <h1>Mood Tracker</h1>
            <p className="subtitle">How are you feeling right now?</p>

            <div className="mood-grid">
                {moods.map(function (mood, index) {
                    return (
                        <div
                            key={index}
                            className={"mood-btn" + (currentMood && currentMood.name === mood.name ? " active" : "")}
                            onClick={function () { handleMoodClick(mood) }}
                        >
                            <span className="emoji">{mood.emoji}</span>
                            <span className="label">{mood.name}</span>
                        </div>
                    )
                })}
            </div>

            {currentMood && (
                <div className="mood-display">
                    <div className="big-emoji">{currentMood.emoji}</div>
                    <h2>You're feeling {currentMood.name}</h2>
                    <p>{currentMood.message}</p>
                </div>
            )}
        </div>
    )
}

export default App
