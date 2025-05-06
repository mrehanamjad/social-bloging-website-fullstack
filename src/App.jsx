import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header, Logo } from './components'

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
  ) : (
    <div className="w-full h-screen gap-4 flex flex-col justify-center items-center bg-gray-200">
      <div className="relative w-64 h-64">

        <div className="absolute inset-0 border-4 border-l-blue-500 rounded-full animate-spin"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center gap-2">
          <Logo colorClass="text-blue-500" />
          <div className="flex gap-2">
            <div className="rounded-full bg-blue-500 h-4 w-4 animate-pulse"></div>
            <div className="rounded-full bg-blue-500 h-4 w-4 animate-pulse"></div>
            <div className="rounded-full bg-blue-500 h-4 w-4 animate-pulse"></div>
            <div className="rounded-full bg-blue-500 h-4 w-4 animate-pulse"></div>
            <div className="rounded-full bg-blue-500 h-4 w-4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

  )

}

export default App
