import { FETCH_ALL_SCHEDULES, FETCH_SCHEDULES_BY_ID, GET_ALL_SCHEDULE_OPTIONS } from '../../types/courseSchedule'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const AddCourseScheduleAPI = (rawData, resetForm) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('/workshops', rawData)
  .then(res => {
    console.log("ress", res)
    if (res.statusText === "Created") {
      toast.success("Workshop created")
      resetForm({})
    } else {
      toast.error("Error in Creating Workshop")
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error Creating Workshop", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditCourseScheduleAPI = (id, rawData) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().patch(`/workshops/${id}`, rawData)
  .then(res => {
    console.log("ress", res)
    if (res.status === 200) {
      toast.success("Workshop Updated.")
    } else {
      toast.error("Error in Updating")
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error Updating", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchAllCourseSchedules = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/workshops')
  .then(res => {
    const data = res.data.map(values => values)
    dispatch({
      type: FETCH_ALL_SCHEDULES,
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

export const fetchAllCourseScheduleOptions = () => dispatch => {
  ServerApi().get('/workshops')
  .then(res => {
    const data = res.data.map(({ batchNo, _id }) => ({ label: batchNo, value: _id }))
    dispatch({
      type: GET_ALL_SCHEDULE_OPTIONS,
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

export const fetchCourseScheduleById = (id) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/workshops/${id}`)
  .then(res => {
    dispatch({
      type: FETCH_SCHEDULES_BY_ID,
      payload: res.data
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

export const deleteCourseSchedule = (id) => dispatch => {
  ServerApi().delete(`/workshops/${id}`)
  .then(res => {
    toast.success("Succesfuly Deleted", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(fetchAllCourseSchedules())
  })
  .catch(e => {
    toast.error("Error Deleting Course", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}
