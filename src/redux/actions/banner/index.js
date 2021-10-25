import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { GET_ALL_BANNERS, GET_BANNERS_BY_ID } from "../../types/banner"

export const AddBannerAPI = (rawData) => dispatch => {
  ServerApi().post(`/banners`, rawData)
  .then(res => {
    if (res.status === 201) {
      toast.success("Success!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } else {
      toast.error("Error!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditBannerAPI = (id, content) => dispatch => {
  ServerApi().patch(`/banners/${id}`, content)
  .then(res => {
    if (res.status === 200) {
      toast.success("Updated Content", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } else {
      toast.error("Error in Updating Content", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error Updating Course", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchAllBanners = () => dispatch => {
  ServerApi().get(`/banners`)
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: GET_ALL_BANNERS,
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

export const fetchBannerById = (id) => dispatch => {
  ServerApi().get(`/banners/${id}`)
  .then(res => {
    dispatch({
      type: GET_BANNERS_BY_ID,
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

export const deleteBannerById = (id) => dispatch => {
    ServerApi().delete(`/banners/${id}`)
    .then(res => {
      toast.success("Succesfuly Deleted", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchAllBanners())
    })
    .catch(e => {
      toast.error("Error Deleting Video", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      console.log(e)
    })
  }