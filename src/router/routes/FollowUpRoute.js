import { lazy } from 'react'

// ** Merge Routes
const FollowUpRoute = [
  {
    path: '/follow-up',
    component: lazy(() => import('../../views/followUp/FollowUp'))
  },
  {
    path: '/add-admission-enquiry',
    component: lazy(() => import('../../views/followUp/components/AddForm'))
  }
]

export default FollowUpRoute