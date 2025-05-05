import React from 'react'
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';  

function UserManu({className="",width="64"}) {
  const user = useSelector(state => state.auth.userData)
  return (
    <div className={`absolute right-0 mt-2 bg-white rounded-md shadow-lg z-50 overflow-hidden w-${width} min-w-64 ${className}`}>
    <div className="p-4 border-b border-gray-100">
      <p className="font-medium text-gray-900">{user.name}</p>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
    <div className="p-2">
      <LogoutBtn className={""} />
    </div>
  </div>
  )
}

export default UserManu