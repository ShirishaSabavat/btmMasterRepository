import { lazy } from 'react'

// ** Merge Routes
const MyReportsRoute = [
  {
    path: '/admin/my-reports',
    component: lazy(() => import('../../views/MyReports/MyReports'))
  }
]

export default MyReportsRoute