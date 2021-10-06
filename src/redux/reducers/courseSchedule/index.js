import { FETCH_ALL_SCHEDULES, FETCH_SCHEDULES_BY_ID } from '../../types/courseSchedule'

const initialState = {
  courseSchedules: [],
  courseSchedule: ""
}

const courseSchedule = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SCHEDULES:
      return {...state, courseSchedules: action.payload}
    
    case FETCH_SCHEDULES_BY_ID:
      return {...state, courseSchedule: action.payload}

    default:
      return state
  }
}

export default courseSchedule
