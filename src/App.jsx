import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import conf from './conf/conf'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'

function App() {
  // console.log(conf.appwriteProjectId);
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
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className="w-full block">
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
  
}

export default App
