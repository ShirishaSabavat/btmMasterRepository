import { GET_ABOUT, GET_MISSION, GET_VISSION, GET_SOCIAL_LINKS, GET_ALL_LANDING_CMS, GET_PRIVACY_POLICY, GET_TERMS_AND_CONDITIONS, GET_REFUND_POLICY } from '../../types/cms'

const initialState = {
  about: "",
  mission: "",
  vission: "",
  socialLinks: "",
  landingCms: [],
  privacyPolicy: "",
  termsAndConditions: "",
  refundPolicy: ""
}

const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABOUT:
      return {...state, about: action.payload}

    case GET_PRIVACY_POLICY:
      return {...state, privacyPolicy: action.payload}

    case GET_TERMS_AND_CONDITIONS:
      return {...state, termsAndConditions: action.payload}

    case GET_REFUND_POLICY:
      return {...state, refundPolicy: action.payload}
    
    case GET_MISSION:
      return {...state, mission: action.payload}

    case GET_VISSION:
      return {...state, vission: action.payload}
    
    case GET_SOCIAL_LINKS:
      return {...state, socialLinks: action.payload}
    
    case GET_ALL_LANDING_CMS:
      return {...state, landingCms: action.payload}

    default:
      return state
  }
}

export default cmsReducer
