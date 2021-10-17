import { lazy } from 'react'

// ** Merge Routes
const KYCRoute = [
  {
    path: '/kyc',
    component: lazy(() => import('../../views/KYC/KYC'))
  }
]

export default KYCRoute