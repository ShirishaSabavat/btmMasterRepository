import { FETCH_ALL_SCHEDULES, FETCH_SCHEDULES_BY_ID, GET_ALL_SCHEDULE_OPTIONS } from '../../types/courseSchedule'

const initialState = {
  courseSchedules: [],
  courseSchedule: {},
  courseScheuleOptions: []
}

const courseSchedule = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SCHEDULES:
      return {...state, courseSchedule: {}, courseSchedules: action.payload}
    
    case FETCH_SCHEDULES_BY_ID:
      return {...state, courseSchedule: action.payload}

    case GET_ALL_SCHEDULE_OPTIONS:
      return {...state, courseScheuleOptions: action.payload}

    default:
      return state
  }
}

export default courseSchedule
