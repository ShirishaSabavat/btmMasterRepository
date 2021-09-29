import { lazy } from 'react'

// ** Merge Routes
const CMSRoutes = [
  {
    path: '/cms',
    component: lazy(() => import('../../views/CMS/CMS'))
  }
]

export default CMSRoutes