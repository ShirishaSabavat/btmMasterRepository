import { GET_ABOUT, GET_MISSION, GET_VISSION } from '../../types/cms'

const initialState = {
  about: "",
  mission: "",
  vission: ""
}

const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABOUT:
      return {...state, about: action.payload}
    
    case GET_MISSION:
      return {...state, mission: action.payload}

    case GET_VISSION:
      return {...state, vission: action.payload}

    default:
      return state
  }
}

export default cmsReducer
