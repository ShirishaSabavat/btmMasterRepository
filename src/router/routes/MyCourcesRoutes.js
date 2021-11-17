import { lazy } from 'react'

// ** Merge Routes
const MyCourcesRoutes = [
  {
    path: '/my-courses/watch-videos/:courseId',
    component: lazy(() => import('../../views/myCources/WatchVideos'))
  },
  {
    path: '/my-courses',
    component: lazy(() => import('../../views/myCources'))
  }
]

export default MyCourcesRoutes