import { FETCH_ALL_USER_DATA, FETCH_USER_BY_ID } from '../../types/user'

const initialState = {
  users:[],
  user: {}
}

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USER_DATA:
      return {...state, users: action.payload}
    
    case FETCH_USER_BY_ID:
      return {...state, user: action.payload}

    default:
      return state
  }
}

export default mediaReducer
