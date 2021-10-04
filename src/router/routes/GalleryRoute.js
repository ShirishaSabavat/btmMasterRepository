import { lazy } from 'react'

// ** Merge Routes
const GalleryRoute = [
  {
    path: '/admin/gallery',
    component: lazy(() => import('../../views/Gallery/Gallery'))
  },
  {
    path: '/add-gallery',
    component: lazy(() => import('../../views/Gallery/AddGallery'))
  },
  {
    path: '/edit-gallery',
    component: lazy(() => import('../../views/Gallery/EditGallery'))
  }
]

export default GalleryRoute