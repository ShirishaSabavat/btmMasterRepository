import { lazy } from 'react'

// ** Merge Routes
const MyMessageRoute = [
  {
    path: '/admin/my-messages',
    component: lazy(() => import('../../views/MyMessages/MyMessages'))
  }
]

export default MyMessageRoute