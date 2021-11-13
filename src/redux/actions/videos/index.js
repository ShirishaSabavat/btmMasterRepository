import { GET_ALL_VIDEOS, GET_VIDEO_BY_ID } from '../../types/videos'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const AddVideoAPI = (rawData, resetForm) => dispatch => {
  dispatch(toggleNetworkLoading(true))
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
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error in Adding Data", {
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

export const EditVideoAPI = (id, rawData) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().patch(`/videos/${id}`, rawData)
  .then(res => {
    console.log(res)
    if (res.status === 200) {
      toast.success("Data Updated!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchVideoById(videoId))
    } else {
      toast.error("Error in Updating Data", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error in Updating Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchAllVideos = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/videos')
  .then(res => {
    // const data = res.data.map((values, index) => { return {values, sno: index + 1 } })
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    console.log("req", data)
    dispatch({
      type: GET_ALL_VIDEOS,
      payload: data
    })
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
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

    dispatch(fetchAllVideos())
  })
  .catch(e => {
    toast.error("Error Deleting Video", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}
