import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

function Footer() {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <hr />
                <Link to='/' >
                    <Logo />
                </Link>
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2024 | Created by 'M.Rehan Amjad'

                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 gap-3 justify-center sm:justify-start">
                    <Link to="https://github.com/mrehanamjad/" target='_blank' ><FaGithub className='text-3xl cursor-pointer hover:text-blue-600' /></Link>
                    <Link to="https://www.linkedin.com/in/mrehanamjad/" target='_blank'> <FaLinkedin className='text-3xl cursor-pointer hover:text-blue-600' /></Link>
                </span>
            </div>
        </footer>
    )
}

export default Footer