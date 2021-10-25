import { GET_ALL_BANNERS, GET_BANNERS_BY_ID } from '../../types/banner'

const initialState = {
  banners: [],
  banner:{}
}

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BANNERS:
      return {...state, banners: action.payload}
    
    case GET_BANNERS_BY_ID:
      return {...state, banner: action.payload}
    
    default:
      return state
  }
}

export default bannerReducer
