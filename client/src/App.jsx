import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './components/Dashboard'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <Router>
      <div className='container'>
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
      </div>
    </Router>
  )
}

export default App
