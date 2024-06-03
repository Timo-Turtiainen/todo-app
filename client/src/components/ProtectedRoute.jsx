import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const user = useSelector(state => state.users.currentUser)

  return user ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute
