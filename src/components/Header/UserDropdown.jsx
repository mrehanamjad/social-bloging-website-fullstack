import React from 'react'
import { BiUser } from 'react-icons/bi';
import UserManu from './UserManu'

function UserDropdown() {
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center  justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
            >
                <BiUser size={20} />
            </button>

            {isUserMenuOpen && (
                <UserManu onClick={() => setIsUserMenuOpen(false)} />
            )}
        </div>
    )
}

export default UserDropdown