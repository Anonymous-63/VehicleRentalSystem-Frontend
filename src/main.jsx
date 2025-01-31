import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import App from './App.jsx'
import { getTokenFromLocalStorage, routeList } from './utils/global.js'
import { JWT_TOKEN_PREFIX } from './utils/Constants.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Login from './pages/Login.jsx'
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Register from './pages/Register.jsx'

const AppContainer = () => {

  const token = getTokenFromLocalStorage(JWT_TOKEN_PREFIX);
  localStorage.setItem("user", JSON.stringify({ id: 1, name: "Admin User", role: "admin" }));

  if (!token) {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  } else {
    return <Navigate to={"/login"} />
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer />,
    children: [
      ...routeList,
      {
        path: "/",
        element: <Navigate to={routeList.length > 0 ? routeList[0].path : "/unauthorized"} />
      }
    ]
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/login",
    element: (
      <Provider store={store}>
        <Login />
      </Provider>
    )
  },
  {
    path: "/register",
    element: (
      <Provider store={store}>
        <Register />
      </Provider>
    )
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
