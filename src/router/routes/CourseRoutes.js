import { lazy } from 'react'

// ** Merge Routes
const CourseRoutes = [
  {
    path: '/add-course',
    component: lazy(() => import('../../views/Courses/AddCourse'))
  },
  {
    path: '/courses',
    component: lazy(() => import('../../views/Courses/CoursesTable'))
  },
  {
    path: '/schedule',
    component: lazy(() => import('../../views/Courses/Schedule'))
  },
  {
    path: '/edit-course',
    component: lazy(() => import('../../views/Courses/EditCourse'))
  }
]

export default CourseRoutes