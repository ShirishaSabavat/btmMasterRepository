import { lazy } from 'react'

// ** Merge Routes
const UserRoute = [
  {
    path: '/users',
    component: lazy(() => import('../../views/Users/Users'))
  },
  {
    path: '/wallet',
    component: lazy(() => import('../../views/wallet'))
  },
  {
    path: '/users-tree',
    component: lazy(() => import('../../views/Users/tree/index'))
  },
  {
    path: '/view-user-data/:userId',
    component: lazy(() => import('../../views/Users/UserData'))
  }
]

export default UserRoute