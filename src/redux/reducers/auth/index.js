import { DO_LOGIN, LOGOUT } from '../../types/auth'

const initialState = {
  token: '',
  userData: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return {...state, userData: action.payload}
    
    case LOGOUT:
      return {...state, userData: {}}

    default:
      return state
  }
}

export default authReducer
