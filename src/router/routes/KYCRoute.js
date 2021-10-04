import { lazy } from 'react'

// ** Merge Routes
const KYCRoute = [
  {
    path: '/admin/kyc',
    component: lazy(() => import('../../views/KYC/KYC'))
  }
]

export default KYCRoute