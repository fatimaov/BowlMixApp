import { createBrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import DashboardPage from '../pages/DashboardPage.jsx'
import IngredientsPage from '../pages/IngredientsPage.jsx'
import LandingPage from '../pages/LandingPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'
import SavedBowlsPage from '../pages/SavedBowlsPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'app',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'ingredients',
            element: <IngredientsPage />,
          },
          {
            path: 'saved-bowls',
            element: <SavedBowlsPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
