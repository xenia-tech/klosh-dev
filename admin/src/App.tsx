import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PostEditor from './pages/PostEditor'
import Login from './pages/Login'

function App() {
  return (
    <ChakraProvider>
      <Router basename="/admin">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-post" element={<PostEditor />} />
          <Route path="/edit-post/:id" element={<PostEditor />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
