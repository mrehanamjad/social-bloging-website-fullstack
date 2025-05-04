import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { FaSignOutAlt } from 'react-icons/fa'


function LogoutBtn({className}) {

  const dispach = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispach(logout()).then((ifAnyReturn)=>alert(ifAnyReturn))
    })
      .catch((error) => {
        console, log('Logout failed', error)
      })
  }


  return (
    <button
    className={`inline-bock px-5 mx-2 py-2 duration-200 flex  justify-center items-center gap-2 bg-red-500 rounded-3xl text-white ${className}`}
      onClick={logoutHandler}
    >
      <FaSignOutAlt size={18} />
      Logout
      </button>
   
  )
}

export default LogoutBtn