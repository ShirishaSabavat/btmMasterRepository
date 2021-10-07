import { lazy } from 'react'

// ** Merge Routes
const RoleRoute = [
  {
    path: '/role',
    component: lazy(() => import('../../views/Settings/role/Role'))
  },
  {
    path: '/edit-role',
    component: lazy(() => import('../../views/Settings/role/EditRole'))
  }
]

export default RoleRoute