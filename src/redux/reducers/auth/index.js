import { DO_LOGIN, UPDATE_ROLE, UPDATE_KYC, LOGOUT } from '../../types/auth'

const initialState = {
  token: '',
  userData: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return {...state, userData: action.payload}
    
    case UPDATE_ROLE:
      return {...state, userData: {...state.userData, user: {...state.userData.user, role: action.payload}}}
      
    case UPDATE_KYC:
      return {...state, userData: {...state.userData, user: {...state.userData.user, kycStatus: action.payload}}}

    case LOGOUT:
      return {...state, userData: {}}

    default:
      return state
  }
}

export default authReducer
