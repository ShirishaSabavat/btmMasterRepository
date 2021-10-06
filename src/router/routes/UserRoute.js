import { lazy } from 'react'

// ** Merge Routes
const UserRoute = [
  {
    path: '/users',
    component: lazy(() => import('../../views/Users/Users'))
  },
  {
    path: '/view-user-data',
    component: lazy(() => import('../../views/Users/UserData'))
  }
]

export default UserRoute