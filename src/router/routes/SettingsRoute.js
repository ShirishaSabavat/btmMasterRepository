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
    path: '/edit-faculty/:id',
    component: lazy(() => import('../../views/Settings/faculty/EditFaculty'))
  },
  {
    path: '/default-bac',
    component: lazy(() => import('../../views/Settings/defaultBac/DefaultBac'))
  }
]

export default SettingsRoute
