import { FETCH_ALL_STAFF, FETCH_STAFF_BY_ID } from '../../types/staff'

const initialState = {
  staff:[],
  staffId:[]
}

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_STAFF:
      return {...state, staff: action.payload}
    case FETCH_STAFF_BY_ID:
      return {...state, staffId: action.payload}

    default:
      return state
  }
}

export default staffReducer
