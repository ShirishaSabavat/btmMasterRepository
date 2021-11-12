import { GET_USER_KYC_DATA } from '../../types/kyc'

const initialState = {
  kycData:{}
}

const kyc = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_KYC_DATA:
      return {...state, kycData: action.payload}

    default:
      return state
  }
}

export default kyc
