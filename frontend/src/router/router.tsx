import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import GeneratorDashboardPage from '../pages/GeneratorDashboard'
import LandingPage from '../pages/Landing'
import LoginPage from '../pages/Login'
import MyIngredientsPage from '../pages/MyIngredients'
import NotFoundPage from '../pages/NotFound'
import ProfilePage from '../pages/Profile'
import PublicDemoPage from '../pages/PublicDemo'
import SavedBowlsPage from '../pages/SavedBowls'
import SignupPage from '../pages/Signup'
import ProtectedRoute from './ProtectedRoute'

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
        path: 'demo',
        element: <PublicDemoPage />,
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
            path: 'generator-dashboard',
            element: <GeneratorDashboardPage />,
          },
          {
            path: 'my-ingredients',
            element: <MyIngredientsPage />,
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
