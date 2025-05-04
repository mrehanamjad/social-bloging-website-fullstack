import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispach = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispach(login({ userData }))
        } else {
          dispach(logout())
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => { setLoading(false) })
  }, [])



  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-200 scroll-smooth'>
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App
