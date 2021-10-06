import { lazy } from 'react'

// ** Merge Routes
const CourseScheduleRoute = [
  {
    path: '/course-schedule',
    component: lazy(() => import('../../views/CourseSchedule/CourseSchedule'))
  },
  {
    path: '/add-course-schedule',
    component: lazy(() => import('../../views/CourseSchedule/AddCourseSchedule'))
  },
  {
    path: '/edit-course-schedule',
    component: lazy(() => import('../../views/CourseSchedule/EditCourseSchedule'))
  },
  {
    path: '/view-course-schedule',
    component: lazy(() => import('../../views/CourseSchedule/ViewCourse'))
  }
]

export default CourseScheduleRoute