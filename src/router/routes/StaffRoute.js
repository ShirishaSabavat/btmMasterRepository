import { lazy } from 'react'

// ** Merge Routes
const StaffRoute = [
  {
    path: '/staff',
    component: lazy(() => import('../../views/Staff/Staff'))
  },
  {
    path: '/add-staff',
    component: lazy(() => import('../../views/Staff/AddStaff'))
  },
  {
    path: '/edit-staff',
    component: lazy(() => import('../../views/Staff/EditStaff'))
  }
]

export default StaffRoute