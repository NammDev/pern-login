import { Navigate } from 'react-router-dom'

function PublicRoute({ isAuthenticated, children }) {
  return !isAuthenticated ? children : <Navigate to='/dashboard' />
}

export default PublicRoute
