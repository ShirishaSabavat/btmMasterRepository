import { lazy } from 'react'

// ** Merge Routes
const MyWorkshopsRoutes = [
  {
    path: '/my-workshops',
    component: lazy(() => import('../../views/myWorkshops'))
  }
]

export default MyWorkshopsRoutes