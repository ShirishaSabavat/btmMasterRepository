import { lazy } from 'react'

// ** Merge Routes
const Videos = [
  {
    path: '/videos',
    component: lazy(() => import('../../views/Videos/Videos'))
  },
  {
    path: '/add-video',
    component: lazy(() => import('../../views/Videos/AddVideo'))
  },
  {
    path: '/edit-video',
    component: lazy(() => import('../../views/Videos/EditVideo'))
  }
]

export default Videos