import { useState } from 'react'
import './App.css'
import ReadPosts from './pages/ReadPosts'

function App() {

  return (
    <div className="main-content">
      <div className="page-container">
        <h1 className="page-title">Welcome to Post & Solve — Share Problems, Find Answers</h1>
      </div>
      <div className="loading-container ">
        <ReadPosts />
      </div>
    </div>
  )
}

export default App
