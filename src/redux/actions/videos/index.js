import { GET_ALL_VIDEOS, GET_VIDEO_BY_ID } from '../../types/videos'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchAllVideos = () => dispatch => {
  ServerApi().get('/videos')
  .then(res => {
    const data = res.data.map(values => values)
    dispatch({
      type: GET_ALL_VIDEOS,
      payload: data
    })
  })
  .catch(e => {
    toast.error("Error in Fetching Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchVideoById = (id) => dispatch => {
  ServerApi().get(`/videos/${id}`)
  .then(res => {
    dispatch({
      type: GET_VIDEO_BY_ID,
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

export const deleteVideoById = (id) => dispatch => {
  ServerApi().delete(`/videos/${id}`)
  .then(res => {
    toast.success("Succesfuly Deleted", {
      position: toast.POSITION.BOTTOM_CENTER
    })
  })
  .catch(e => {
    toast.error("Error Deleting Video", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}
