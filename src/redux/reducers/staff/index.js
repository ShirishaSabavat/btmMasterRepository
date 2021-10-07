import { FETCH_ALL_STAFF } from '../../types/staff'

const initialState = {
  staff:[]
}

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_STAFF:
      return {...state, staff: action.payload}

    default:
      return state
  }
}

export default staffReducer
