import { lazy } from 'react'

// ** Merge Routes
const SettingsRoute = [
  {
    path: '/admin/social-media',
    component: lazy(() => import('../../views/SocialMedia/SocialMedia'))
  }
]

export default SettingsRoute
