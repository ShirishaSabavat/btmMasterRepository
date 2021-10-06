import { GET_ALL_COURSES, GET_COURSE_BY_ID, GET_ALL_COURSES_OPTIONS, FETCH_WORKSHOP } from '../../types/courses'

const initialState = {
  courses: [],
  course: {},
  courseOptions: [],
  workshops: []
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

    default:
      return state
  }
}

export default course
