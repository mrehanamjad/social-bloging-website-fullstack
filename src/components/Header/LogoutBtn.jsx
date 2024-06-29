import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


function LogoutBtn() {

  const dispach = useDispatch()

  const logoutHandler = () => {
    // these reducers i.e login, logout etc  are promises, most of the methods in appwrite are promises.
    authService.logout().then(() => {
      dispach(logout())
    })
      .catch((error) => {
        console, log('Logout failed', error)
      })
  }


  return (
    <button
    className='inline-bock px-4 mx-2 py-2 duration-200 hover:text-blue-700 border-y-2 border-transparent hover:border-blue-700 '
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn