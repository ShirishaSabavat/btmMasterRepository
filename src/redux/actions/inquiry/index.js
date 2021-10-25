import { GET_ALL_INQURIES, GET_INQURIE_BY_ID } from '../../types/inquery'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'


export const fetchAllInquires = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/inquiry')
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: GET_ALL_INQURIES,
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


export const fetchInquiryById = (id) => dispatch => {
  ServerApi().get(`/inquiry/${id}`)
  .then(res => {
    dispatch({
      type: GET_INQURIE_BY_ID,
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


export const postInquiry = (formdata) => (dispatch) => {
  ServerApi().post("/inquiry", formdata).then(res => {
    toast.success("Successfully Uploaded Image", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(fetchAllInquires())
  }).catch(e => {
    toast.error("Error in Uploading Image", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditInquiryAPI = (id, rawData) => dispatch => {
    ServerApi().patch(`/inquiry/${id}`, rawData)
    .then(res => {
      if (res.status === 200) {
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

export const deleteInquiryById = (id) => dispatch => {
    ServerApi().delete(`/inquiry/${id}`)
    .then(res => {
      toast.success("Succesfuly Deleted", {
        position: toast.POSITION.BOTTOM_CENTER
      })
  
      dispatch(fetchAllInquires())
    })
    .catch(e => {
      toast.error("Error Deleting Video", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      console.log(e)
    })
  }
  
