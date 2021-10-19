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
  },
  {
    path: '/add-banner',
    component: lazy(() => import('../../views/Settings/banner/AddBanner'))
  },
  {
    path: '/edit-banner',
    component: lazy(() => import('../../views/Settings/banner/EditBanner'))
  }
]

export default SettingsRoute
