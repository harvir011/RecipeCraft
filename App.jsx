import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Page imports
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Generator from './pages/Generator'
import Dashboard from './pages/Dashboard'

/**
 * Main App Component
 * Configures React Router with all application routes
 *
 * Routes:
 * - / : Landing page / Recipe generator (home)
 * - /login : User login
 * - /register : User registration
 * - /generate : Protected recipe generator
 * - /recipes : Protected recipe dashboard
 * - /recipe/:id : Protected individual recipe detail
 * - * : Catch-all 404 redirect to home
 */
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/generate"
              element={
                <ProtectedRoute>
                  <Generator />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all 404 - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  )
}
