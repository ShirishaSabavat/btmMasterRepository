
import { GET_ALL_MEDIA, GET_MEDIA_BY_ID } from '../../types/media'

const initialState = {
  medias:[],
  media: {}
}

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MEDIA:
      return {...state, medias: action.payload}
    
    case GET_MEDIA_BY_ID:
      return {...state, media: action.payload}

    default:
      return state
  }
}

export default mediaReducer
