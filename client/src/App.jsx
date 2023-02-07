import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './components/Dashboard'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'
import axios from './config/axiosConfig'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  const checkAuthenticated = async () => {
    try {
      const response = await axios.get('/auth/verify', {
        headers: { Authorization: localStorage.token },
      })
      const data = response?.data
      console.log(data)
      data === true ? setIsAuth(true) : setIsAuth(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    checkAuthenticated()
  }, [])

  return (
    <Router>
      <main className='App'>
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRoute isAuth={isAuth}>
                <Login setAuth={setIsAuth} />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute isAuth={isAuth}>
                <Register setAuth={setIsAuth} />
              </PublicRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute isAuth={isAuth}>
                <Dashboard setAuth={setIsAuth} />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  )
}

export default App
