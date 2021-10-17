import { FETCH_ALL_USER_DATA, FETCH_USER_BY_ID, FETCH_ALL_CLIENTS, FETCH_MY_COMMISIONS, FETCH_MY_TRANSACTIONS, DASHBOARD_DATA } from '../../types/user'

const initialState = {
  users:[],
  user: {},
  commisions:[],
  transactions:[],
  dashboardData: {}
}

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USER_DATA:
      return {...state, users: action.payload}
    
    case FETCH_USER_BY_ID:
      return {...state, user: action.payload}
    
    case FETCH_ALL_CLIENTS:
      return {...state, users: action.payload}
    
    case FETCH_MY_COMMISIONS:
      return {...state, commisions: action.payload}
    
    case FETCH_MY_TRANSACTIONS:
      return {...state, transactions: action.payload}
    
    case DASHBOARD_DATA:
      return {...state, dashboardData: action.payload}

    default:
      return state
  }
}

export default mediaReducer
