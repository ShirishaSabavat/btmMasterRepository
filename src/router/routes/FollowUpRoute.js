import { lazy } from 'react'

// ** Merge Routes
const FollowUpRoute = [
  {
    path: '/follow-up',
    component: lazy(() => import('../../views/followUp/FollowUp'))
  }
]

export default FollowUpRoute