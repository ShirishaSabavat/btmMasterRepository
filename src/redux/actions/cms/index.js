import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { GET_MISSION, GET_ABOUT, GET_VISSION, GET_SOCIAL_LINKS, GET_ALL_LANDING_CMS, GET_PRIVACY_POLICY, GET_TERMS_AND_CONDITIONS, GET_REFUND_POLICY } from "../../types/cms/index"
import { toggleNetworkLoading } from '../common'

export const fetchCMS = (type) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/cms/${type}`)
  .then(res => {
    if (type === "about") {
      dispatch({
        type: GET_ABOUT,
        payload: res.data
      })
    } else if (type === "mission") {
      dispatch({
        type: GET_MISSION,
        payload: res.data
      })
    } else if (type === "vission") {
      dispatch({
        type: GET_VISSION,
        payload: res.data
      })
    } else if (type === "social-links") {
      dispatch({
        type: GET_SOCIAL_LINKS,
        payload: res.data
      })
    } else if (type === "PRIVACY_POLICY") {
      dispatch({
        type: GET_PRIVACY_POLICY,
        payload: res.data
      })
    } else if (type === "TERMS_AND_CONDITIONS") {
      dispatch({
        type: GET_TERMS_AND_CONDITIONS,
        payload: res.data
      })
    } else if (type === "REFUND_POLICY") {
      dispatch({
        type: GET_REFUND_POLICY,
        payload: res.data
      })
    }

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

export const AddCMS = (type, rawData) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post(`/cms`, rawData)
  .then(res => {
    if (res.status === 201) {
      toast.success("Success", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchCMS(type))
    } else {
      toast.error("Error", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(toggleNetworkLoading(false))
    }
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditCMS = (type, content) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  // ServerApi().patch(`/cms/${type.toLowerCase()}`, content)
  ServerApi().patch(`/cms/${type}`, content)
  .then(res => {
    if (res.status === 200) {
      toast.success("Updated Content", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchCMS(type))
    } else {
      toast.error("Error in Updating Content", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(toggleNetworkLoading(false))
    }
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error Updating Course", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchAllLandingCms = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/cms/all`)
  .then(res => {
    dispatch({
      type: GET_ALL_LANDING_CMS,
      payload: res.data
    })
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Fetching Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}