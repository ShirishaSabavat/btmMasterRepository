import { FETCH_ALL_SALES_DATA } from '../../types/sales'

const initialState = {
  sales:[]
}

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SALES_DATA:
      return {...state, sales: action.payload}

    default:
      return state
  }
}

export default salesReducer
