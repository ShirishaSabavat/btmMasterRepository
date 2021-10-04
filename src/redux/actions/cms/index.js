import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const AddCMS = (type, rawData) => dispatch => {
  ServerApi().post(`/cms`, rawData)
  .then(res => {
    console.log("ress", res)
    if (res.status === 201) {
      toast.success("Success", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } else {
      toast.error("Error", {
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

export const EditCMS = (type, content) => dispatch => {
  ServerApi().patch(`/cms/${type}`, content)
  .then(res => {
    console.log("ress", res)
    if (res.statusText === "Ok") {
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

export const fetchCMS = (type) => dispatch => {
  ServerApi().get(`/cms/${type}`)
  .then(res => {

    if (type === "about") {
      dispatch({
        type: `GET_ABOUT`,
        payload: res.data
      })
    } else if (type === "mission") {
      dispatch({
        type: `GET_MISSION`,
        payload: res.data
      })
    } else if (type === "vission") {
      dispatch({
        type: `GET_VISSION`,
        payload: res.data
      })
    }
   
  })
  .catch(e => {
    toast.error("Error in Fetching Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}