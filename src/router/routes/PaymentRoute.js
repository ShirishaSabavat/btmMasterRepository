import { lazy } from 'react'

// ** Merge Routes
const PaymentRoute = [
  {
    path: '/payment',
    component: lazy(() => import('../../views/Settings/payment/Payment'))
  }  
]

export default PaymentRoute