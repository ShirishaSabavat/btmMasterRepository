import { FETCH_ALL_SALES_DATA, FETCH_SALE_DATA } from '../../types/sales'

const initialState = {
  sales:[],
  sale: {}
}

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SALES_DATA:
      return {...state, sales: action.payload}
    case FETCH_SALE_DATA:
      return {...state, sale: action.payload}

    default:
      return state
  }
}

export default salesReducer
