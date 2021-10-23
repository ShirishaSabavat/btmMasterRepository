import { GET_ALL_FACULTY, GET_ALL_FACULTY_OPTIONS, GET_ALL_FACULTY_BY_ID } from '../../types/faculty'

const initialState = {
  faculty: [],
  facultyOptions: [],
  facultyData: {}
}

const faculty = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FACULTY:
      return {...state, faculty: action.payload}

    case GET_ALL_FACULTY_BY_ID:
      return {...state, facultyData: action.payload}
    
    case GET_ALL_FACULTY_OPTIONS:
      return {...state, facultyOptions: action.payload}
    
    default:
      return state
  }
}

export default faculty
