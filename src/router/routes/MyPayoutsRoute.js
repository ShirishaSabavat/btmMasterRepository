import { lazy } from 'react'

// ** Merge Routes
const MyPayoutsRoute = [
  {
    path: '/admin/my-payouts',
    component: lazy(() => import('../../views/MyPayouts/MyPayouts'))
  }
]

export default MyPayoutsRoute