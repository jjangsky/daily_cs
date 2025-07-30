import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { Challenge } from './pages/Challenge'
import { Profile } from './pages/Profile'
import { History } from './pages/History'
import { AuthCallback } from './pages/AuthCallback'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MVP Routes - 6 core features */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        
        {/* OAuth callback route */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App