import { lazy } from 'react'

// ** Merge Routes
const SettingsRoute = [
  {
    path: '/general-settings',
    component: lazy(() => import('../../views/Settings/OrganizationSettings'))
  },
  {
    path: '/faculty-settings',
    component: lazy(() => import('../../views/Settings/FacultySettings'))
  }
]

export default SettingsRoute
