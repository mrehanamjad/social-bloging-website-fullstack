import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { PiSignOutBold } from "react-icons/pi";
import NavButton from './NavButton'
import { resetAll } from '../../store/postsSlice';

function LogoutBtn() {

  const dispach = useDispatch()

  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispach(logout()).then((ifAnyReturn) => {
          alert(ifAnyReturn);
          dispach(resetAll());
        });
      })
      .catch((error) => {
        console.log('Logout failed', error);
      });
  };
  

  return <NavButton item={{name:"Logout",slug:"/",icon:PiSignOutBold}} onClick={logoutHandler}/>
}

export default LogoutBtn