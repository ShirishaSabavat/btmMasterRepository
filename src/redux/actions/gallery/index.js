import { GET_GALLERY, SAVE_GALLERY, UPDATE_GALLERY, DELETE_GALLERY } from '../../types/gallery'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchAllGallery = () => dispatch => {
  ServerApi().get('/gallery')
  .then(res => {
    dispatch({
      type: GET_GALLERY,
      payload: res.data.reverse()
    })
  })
  .catch(e => {
    console.log(e)
  })
}

export const saveGallery = (payload) => (dispatch) => {
  ServerApi().post("/gallery", payload).then(res => {
    toast.success("Image added to gallery", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(fetchAllGallery())
  }).catch(e => {
    toast.error("Error in Uploading Image", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const deleteGallery = (payload) => (dispatch) => {
    ServerApi().delete(`/gallery/${payload}`).then(res => {
        toast.success("Image removed from gallery", {
        position: toast.POSITION.BOTTOM_CENTER
        })
        dispatch(fetchAllGallery())
    }).catch(e => {
        console.log(e)
    })
}

