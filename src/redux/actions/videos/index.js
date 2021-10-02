import { GET_ALL_VIDEOS, GET_VIDEO_BY_ID } from '../../types/videos'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const AddVideoAPI = (rawData, resetForm) => dispatch => {
  ServerApi().post('/videos', rawData)
  .then(res => {
    if (res.statusText === "Created") {
      toast.success("Data Added", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      resetForm({})
    } else {
      toast.error("Error in Adding Data", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error in Adding Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditVideoAPI = (id, rawData) => dispatch => {
  ServerApi().patch(`/videos/${id}`, rawData)
  .then(res => {
    if (res.statusText === "Ok") {
      toast.success("Data Updated!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } else {
      toast.error("Error in Updating Data", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error in Updating Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchAllVideos = () => dispatch => {
  ServerApi().get('/videos')
  .then(res => {
    const data = res.data.map((values, index) => { return {values, sno: index + 1 } })
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
    const data = res.data
    dispatch({
      type: GET_VIDEO_BY_ID,
      payload: data
    })
  })
  .catch(e => {
    toast.error("Error in Fetching Data", e, {
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
