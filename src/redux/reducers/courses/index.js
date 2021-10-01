import { GET_ALL_COURSES, GET_COURSE_BY_ID } from '../../types/courses'

const initialState = {
  courses: [],
  course: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COURSES:
      return {...state, courses: action.payload}
    
    case GET_COURSE_BY_ID:
      return {...state, course: action.payload}

    default:
      return state
  }
}

export default authReducer
