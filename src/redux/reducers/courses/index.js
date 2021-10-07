import { GET_ALL_COURSES, GET_COURSE_BY_ID, GET_ALL_COURSES_OPTIONS, FETCH_WORKSHOP, FETCH_MY_WORKSHOPS, FETCH_MY_COURSES } from '../../types/courses'

const initialState = {
  courses: [],
  course: {},
  courseOptions: [],
  workshops: [],
  myCourses: [],
  myWorkshops: []
}

const course = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COURSES:
      return {...state, courses: action.payload}
    
    case GET_COURSE_BY_ID:
      return {...state, course: action.payload}

    case GET_ALL_COURSES_OPTIONS:
      return {...state, courseOptions: action.payload}
    case FETCH_WORKSHOP:
      return {...state, workshops: action.payload}
    case FETCH_MY_COURSES:
      return {...state, myCourses: action.payload}
    case FETCH_MY_WORKSHOPS:
      return {...state, myWorkshops: action.payload}

    default:
      return state
  }
}

export default course
