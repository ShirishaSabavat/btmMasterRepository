import { GET_ALL_INQURIES, GET_INQURIE_BY_ID } from '../../types/inquery'

const initialState = {
  inquries: [],
  inquiry: {}
}

const inquiry = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INQURIES:
      return {...state, inquries: action.payload}

    case GET_INQURIE_BY_ID:
      return {...state, inquiry: action.payload}
    
    default:
      return state
  }
}

export default inquiry
