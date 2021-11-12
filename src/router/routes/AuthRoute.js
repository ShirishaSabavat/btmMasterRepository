import { lazy } from 'react'

// ** Merge Routes
const AuthRoute = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/dashboard/dashboard'))
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/auth/profile'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/auth/login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/auth/forgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/not-authorized',
    component: lazy(() => import('../../views/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  }
  
]

export default AuthRoute