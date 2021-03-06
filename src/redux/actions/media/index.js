import { GET_ALL_MEDIA, GET_MEDIA_BY_ID } from '../../types/media'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const fetchAllMedia = () => dispatch => {
  ServerApi().get('/media')
  .then(res => {
    // const data = res.data.map(values => values) 
    dispatch({
      type: GET_ALL_MEDIA,
      payload: res.data
    })
  })
  .catch(e => {
    toast.error("Error in Fetching Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

// export const fetchMediaById = (id) => dispatch => {
//   ServerApi().get(`/media/${id}`)
//   .then(res => {
//     dispatch({
//       type: GET_MEDIA_BY_ID,
//       payload: res
//     })
//   })
//   .catch(e => {
//     toast.error("Error in Fetching Data", {
//       position: toast.POSITION.BOTTOM_CENTER
//     })
//     console.log(e)
//   })
// }

export const postMedia = (formdata) => (dispatch) => {
  ServerApi().post("/media", formdata).then(res => {
    toast.success("Successfully Uploaded Image", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(fetchAllMedia())
  }).catch(e => {
    toast.error("Error in Uploading Image", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

