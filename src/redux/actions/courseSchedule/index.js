import { FETCH_ALL_SCHEDULES, FETCH_SCHEDULES_BY_ID, GET_ALL_SCHEDULE_OPTIONS } from '../../types/courseSchedule'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const AddCourseScheduleAPI = (rawData, resetForm) => dispatch => {
  ServerApi().post('/workshops', rawData)
  .then(res => {
    console.log("ress", res)
    if (res.statusText === "Created") {
      toast.success("Workshop created")
      resetForm({})
    } else {
      toast.error("Error in Creating Workshop")
    }
  })
  .catch(e => {
    toast.error("Error Creating Workshop", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditCourseScheduleAPI = (id, rawData) => dispatch => {
  ServerApi().patch(`/workshops/${id}`, rawData)
  .then(res => {
    console.log("ress", res)
    if (res.status === 200) {
      toast.success("Workshop Updated.")
    } else {
      toast.error("Error in Updating")
    }
  })
  .catch(e => {
    toast.error("Error Updating", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchAllCourseSchedules = () => dispatch => {
  ServerApi().get('/workshops')
  .then(res => {
    const data = res.data.map(values => values)
    dispatch({
      type: FETCH_ALL_SCHEDULES,
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
  ServerApi().get(`/workshops/${id}`)
  .then(res => {
    dispatch({
      type: FETCH_SCHEDULES_BY_ID,
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
