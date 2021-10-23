import { lazy } from 'react'

// ** Merge Routes
const MyPayoutsRoute = [
  {
    path: '/admin/payouts',
    component: lazy(() => import('../../views/payout/Payout'))
  }
]

export default MyPayoutsRoute