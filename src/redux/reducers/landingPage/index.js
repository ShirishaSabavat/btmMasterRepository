import { GET_ALL_SETTINGS } from "../../types/landingPage/landingPage"

const initialState = {
    landingPage:[]
  }
  
  const landingPage = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_SETTINGS:
        return {...state, landingPage: action.payload}
      
      default:
        return state
    }
  }
  
  export default landingPage