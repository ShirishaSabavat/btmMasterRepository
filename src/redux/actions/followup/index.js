import { GET_ALL_FOLLOWUP, GET_ALL_FOLLOWUP_BY_ID } from "../../types/followup"
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const fetchAllFollowUp = () => dispatch => {
  // dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/followup`)
  .then(res => {
    const data = res.data
    dispatch({
      type: GET_ALL_FOLLOWUP,
      payload: data
    })
    // dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Fetching Data", e, {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
    // dispatch(toggleNetworkLoading(false))
  })
}

export const fetchAllFollowUpById = (id) => dispatch => {
  // dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/followup/${id}`)
  .then(res => {
    const data = res.data
    dispatch({
      type: GET_ALL_FOLLOWUP_BY_ID,
      payload: data
    })
    // dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Fetching Data", e, {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
    // dispatch(toggleNetworkLoading(false))
  })
}

export const AddFollowUp = (rawData) => dispatch => {
  // dispatch(toggleNetworkLoading(true))
  ServerApi().post('/followup', rawData)
  .then(res => {
    if (res.status === 201) {
      toast.success("Created FollowUp", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchAllFollowUp())
    }
    // dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    // dispatch(toggleNetworkLoading(false))
    toast.error("Error Creating FollowUp", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditFollowUp = (id, rawData) => dispatch => {
  // dispatch(toggleNetworkLoading(true))
  ServerApi().patch(`/followup/${id}`, rawData)
  .then(res => {
    if (res.status === 200) {
      toast.success("Updated FollowUp!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchAllFollowUp())
    }
    // dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Updateing FollowUp!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
    dispatch(toggleNetworkLoading(false))
  })
}

export const DeleteFollowUp = (id) => dispatch => {
  // dispatch(toggleNetworkLoading(true))
  ServerApi().delete(`/followup/${id}`)
  .then(res => {
    if (res.status === 200) {
      toast.success("Deleted FollowUp!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchAllFollowUp())
    }
    // dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Deleting FollowUp!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
    // dispatch(toggleNetworkLoading(false))
  })
}

export const AddFollowUps = (id, rawData) => dispatch => {
  // dispatch(toggleNetworkLoading(true))
  ServerApi().patch(`/followup/followups/${id}`, rawData)
  .then(res => {
    if (res.status === 201) {
      toast.success("Created FollowUp", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchAllFollowUp())
    }
    // dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    // dispatch(toggleNetworkLoading(false))
    toast.error("Error Creating FollowUp", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const DeleteFollowUpsById = (id, did) => dispatch => {
  // dispatch(toggleNetworkLoading(true))
  ServerApi().delete(`/followup/followups/${id}/${did}`)
  .then(res => {
    if (res.status === 200) {
      toast.success("Deleted FollowUp!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchAllFollowUpById(id))
    }
    // dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Deleting FollowUp!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
    // dispatch(toggleNetworkLoading(false))
  })
}