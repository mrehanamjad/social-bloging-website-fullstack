import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Signup, AllPosts, AddPost, EditPost, Post, CategorizedPosts } from './pages'
import { AuthLayout } from './components/index.js'
import SearchPage from './pages/SearchPage.jsx'
import MyPosts from './pages/MyPosts.jsx'
import UserSettings from './pages/UserSettings.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/edit-user',
        element: (
          <AuthLayout authentication>
            {" "}
            <UserSettings />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: <AllPosts type={'all'} />

      },
      {
        path: '/my-posts',
        element: (
          <AuthLayout authentication >
            <MyPosts />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts/category/:slug',
        element: <CategorizedPosts />
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: <Post />
      },
      {
        path: '/search',
        element: <SearchPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
)
