import { GET_ALL_MEDIA, GET_MEDIA_BY_ID } from '../../types/media'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchAllMedia = () => dispatch => {
  ServerApi().get('/media')
  .then(res => {
    dispatch({
      type: GET_ALL_MEDIA,
      payload: res
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

