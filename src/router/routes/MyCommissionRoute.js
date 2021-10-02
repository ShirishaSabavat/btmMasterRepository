import { lazy } from 'react'

// ** Merge Routes
const MyCommissionRoute = [
  {
    path: '/admin/my-commission',
    component: lazy(() => import('../../views/MyCommission/MyCommission'))
  }
]

export default MyCommissionRoute