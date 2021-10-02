import { lazy } from 'react'

// ** Merge Routes
const MyCustomerRoute = [
  {
    path: '/admin/my-customers',
    component: lazy(() => import('../../views/MyCustomer/MyCustomer'))
  }
]

export default MyCustomerRoute