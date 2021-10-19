import { lazy } from 'react'

// ** Merge Routes
const SettingsRoute = [
  {
    path: '/general-settings',
    component: lazy(() => import('../../views/Settings/OrganizationSettings'))
  },
  {
    path: '/faculty',
    component: lazy(() => import('../../views/Settings/faculty/Faculty'))
  },
  {
    path: '/add-faculty',
    component: lazy(() => import('../../views/Settings/faculty/AddFaculty'))
  },
  {
    path: '/banner',
    component: lazy(() => import('../../views/Settings/banner/Banner'))
  }
]

export default SettingsRoute
