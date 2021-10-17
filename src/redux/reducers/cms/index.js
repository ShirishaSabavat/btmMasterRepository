import { GET_ABOUT, GET_MISSION, GET_VISSION, GET_SOCIAL_LINKS, GET_ALL_LANDING_CMS } from '../../types/cms'

const initialState = {
  about: "",
  mission: "",
  vission: "",
  socialLinks: "",
  landingCms: []
}

const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABOUT:
      return {...state, about: action.payload}
    
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
