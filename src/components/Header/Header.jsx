import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaBars } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'


function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  const [showNavBar, setShowNavBar] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: authStatus
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'My Posts',
      slug: '/my-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    },
  ]

  return (
    <header className='py-3 bg-white sticky top-0 z-50'>
      <Container>
        <nav className='hidden md:flex relative justify-between'>
          <div>
            <Link to='/' >
              <Logo />
            </Link>
          </div>
          <ul className="flex">
            {navItems.map((item) => item.active ? (
              <li key={item.name} >
                <button
                  onClick={() => navigate(item.slug)}  // same as Link
                  className={`inline-bock px-4 mx-2 py-2 ${item.name === 'Login' && 'bg-slate-300'} ${item.name === 'Signup' && 'bg-blue-600 text-white'} rounded duration-200 hover:text-blue-700 `}
                >
                  {item.name}
                </button>
              </li>
            ) : null)}
          </ul>

          {authStatus && (
            <LogoutBtn className={'max-md:hidden'} />
          )}
        </nav>

        {/* NavBar for mobile :  */}
        <nav className="flex md:hidden flex-wrap items-center justify-between px-3">
          <div>
            <Link to='/' >
              <Logo />
            </Link>
          </div>
          <div className="flex md:hidden">
            <button id="hamburger">
              <FaBars onClick={() => setShowNavBar(true)} className={`p-1 text-4xl border-2 border-slate-400 rounded cursor-pointer ${showNavBar ? "hidden" : ""}`} />
              <IoClose onClick={() => setShowNavBar(false)} className={`text-4xl border-2 border-slate-400 rounded cursor-pointer ${showNavBar ? "" : "hidden"}`} />
            </button>
          </div>
          <ul
            className={`toggle ${showNavBar ? "" : "hidden"}  w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-teal-900 md:border-none`}>
            {navItems.map((item) => item.active ? (
              <li key={item.name} >
                <button
                  onClick={() => { navigate(item.slug); setShowNavBar(false) }}
                  className={`block w-full md:inline-block text-blue-800 hover:text-blue-500 py-3 border-b-2 border-blue-800 md:border-none  text-start px-4 `}
                >
                  {item.name}
                </button>
              </li>
            ) : null)}
            {authStatus && (
              <li>
                <LogoutBtn className={'mt-4 mx-4'} />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header