import { GET_ALL_FOLLOWUP, GET_ALL_FOLLOWUP_BY_ID } from '../../types/followup'

const initialState = {
  followup: [],
  followupData: {}
}

const followup = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FOLLOWUP:
      return {...state, followup: action.payload}

    case GET_ALL_FOLLOWUP_BY_ID:
      return {...state, followupData: action.payload}

    default:
      return state
  }
}

export default followup
