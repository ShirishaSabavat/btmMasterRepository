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
    path: '/schedule-table',
    component: lazy(() => import('../../views/Courses/ScheduleTable'))
  },
  {
    path: '/edit-schedule',
    component: lazy(() => import('../../views/Courses/EditSchedule'))
  },
  {
    path: '/edit-course',
    component: lazy(() => import('../../views/Courses/EditCourse'))
  }
]

export default CourseRoutes