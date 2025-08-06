import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout'
import CreatePost from './pages/CreatePost.jsx'
import PostDetail from './pages/PostDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
