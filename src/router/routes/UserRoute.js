import { lazy } from 'react'

// ** Merge Routes
const UserRoute = [
  {
    path: '/users',
    component: lazy(() => import('../../views/Users/Users'))
  },
  {
    path: '/view-user-data/:userId',
    component: lazy(() => import('../../views/Users/UserData'))
  },
  {
    path: '/wallet',
    component: lazy(() => import('../../views/wallet'))
  }
]

export default UserRoute