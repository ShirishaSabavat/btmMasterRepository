import { lazy } from 'react'

// ** Merge Routes
const SettingsRoute = [
  {
    path: '/general-settings',
    component: lazy(() => import('../../views/Settings/GeneralSettings'))
  }
]

export default SettingsRoute
