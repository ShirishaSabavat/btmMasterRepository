import { GET_GALLERY, SAVE_GALLERY, UPDATE_GALLERY, DELETE_GALLERY } from '../../types/gallery'

const initialState = {
  galleryImages:[],
  gallery: {}
}

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY:
      return {...state, galleryImages: action.payload}
    
    default:
      return state
  }
}

export default galleryReducer
