import { lazy } from 'react'

// ** Merge Routes
const MyCustomerRoute = [
  {
    path: '/my-customers',
    component: lazy(() => import('../../views/MyCustomer/MyCustomer'))
  },
  {
    path: '/admin/edit-customer',
    component: lazy(() => import('../../views/MyCustomer/EditCustomer'))
  }
]

export default MyCustomerRoute