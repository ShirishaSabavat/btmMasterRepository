import { lazy } from 'react'

// ** Merge Routes
const InquiryRoute = [
  {
    path: '/inquiry',
    component: lazy(() => import('../../views/Inquiry/Inquiry'))
  }
]

export default InquiryRoute