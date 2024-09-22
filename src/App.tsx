import { Link } from 'react-router-dom';
import './App.css'
import { useAuth } from './components/AuthProvider'

function App() {

const {authToken, handleLogin, handleLogout, currentUser} = useAuth();
  return (
      <div>
        <h1>Hello the token is {authToken} {currentUser?.email}</h1>
        <Link to="/protected">Protected Route</Link>
        {
          authToken ? (<button onClick={handleLogout}>Logout</button>) : (<button onClick={handleLogin}>Login</button>)
        }
      </div>
  )
}

export default App
