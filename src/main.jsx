import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import App from './App.jsx'
import { JWT_TOKEN_PREFIX } from './utils/Constants.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Login from './pages/Login.jsx'
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Register from './pages/Register.jsx'
import { getDataFromLocalStorage } from './utils/storage.js'
import { routeList } from "./utils/global.js"
import CarDetailsPage from './pages/CarDetailsPage.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

const AppContainer = () => {
  const token = getDataFromLocalStorage(JWT_TOKEN_PREFIX);

  if (token) {
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
        path: "/home",
        element: (
          <HomePage />
        )
      },
      {
        path: "/",
        element: <Navigate to={routeList?.length > 0 ? routeList[0]?.path : "/unauthorized"} />
      },
      {
        path: "/carDetails",
        element: <CarDetailsPage />
      }
    ]
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
  }, {
    path: "*",
    element: <PageNotFound />
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
