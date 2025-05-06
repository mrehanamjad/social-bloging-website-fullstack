import React from 'react'
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';  
import NavButton from './NavButton';
import { useNavigate } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';

function UserManu({ className = "", width = "64",onClick = ()=>{} }) {
  
  const navigate = useNavigate()

  const user = useSelector(state => state.auth.userData);

  const handleClick = () => {
    navigate("/edit-user")
    if (onClick) onClick();
  }

  if (!user) return null; // prevent error if user is not loaded yet

  return (
    <div className={`absolute right-0 mt-2 bg-white rounded-md shadow-lg z-50 overflow-hidden w-${width} min-w-52 ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <p className="font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <div className="p-2 pb-3 flex gap-2">
        <NavButton item={{name:"Settings",icon:IoMdSettings}} onClick={handleClick} />
        <LogoutBtn />
      </div>
    </div>
  );
}

export default UserManu;
