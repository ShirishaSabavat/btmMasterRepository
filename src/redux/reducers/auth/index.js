import { DO_LOGIN, UPDATE_ROLE, UPDATE_KYC, LOGOUT, VERIFY_OTP_TAB, CREATE_PASSWORD_TAB } from '../../types/auth'

const initialState = {
  token: '',
  userData: {},
  verifyOtp: '',
  changePassword: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return {...state, userData: action.payload}
    case VERIFY_OTP_TAB:
      return {...state, verifyOtp: action.payload}
      
    case CREATE_PASSWORD_TAB:
      return {...state, changePassword: action.payload}

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
