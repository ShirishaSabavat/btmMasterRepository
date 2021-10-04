import {GET_ALL_VIDEOS, GET_VIDEO_BY_ID } from '../../types/videos'

const initialState = {
  videos: [],
  video: {}
}

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOS:
      return {...state, videos: action.payload}
    
    case GET_VIDEO_BY_ID:
      return {...state, video: action.payload}

    default:
      return state
  }
}

export default videoReducer
