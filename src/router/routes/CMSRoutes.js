import { lazy } from 'react'

// ** Merge Routes
const CMSRoutes = [
  {
    path: '/about-settings',
    component: lazy(() => import('../../views/CMS/AboutSettings'))
  },
  {
    path: '/mission-settings',
    component: lazy(() => import('../../views/CMS/MissionSettings'))
  },
  {
    path: '/vision-settings',
    component: lazy(() => import('../../views/CMS/VisionSettings'))
  },
  {
    path: '/contact-settings',
    component: lazy(() => import('../../views/CMS/ContactSettings'))
  },
  {
    path: '/gallery-page-images-settings',
    component: lazy(() => import('../../views/CMS/GalleryModules/Images'))
  },
  {
    path: '/gallery-videos-page-settings',
    component: lazy(() => import('../../views/CMS/GalleryModules/Videos'))
  }
]

export default CMSRoutes