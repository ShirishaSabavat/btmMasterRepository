import {FETCH_ALL_ORGANIZATION_SETTINGS} from "../../types/settings/index"

const initialState = {
    organization:[]
  }
  
  const organization = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_ORGANIZATION_SETTINGS:
        return {...state, organization: action.payload}
      
      default:
        return state
    }
  }
  
  export default organization