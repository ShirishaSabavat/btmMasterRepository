import { GET_ALL_COURSES, GET_COURSE_BY_ID, GET_ALL_COURSES_OPTIONS, FETCH_WORKSHOP, FETCH_MY_COURSES, FETCH_MY_WORKSHOPS } from '../../types/courses'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const AddCourseAPI = (rawData, resetForm) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('/courses', rawData)
  .then(res => {
    if (res.statusText === "Created") {
      toast.success("Created course", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      resetForm({})
    } else {
      toast.error("Error in Creating Course", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error Creating Course", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchCourseById = (id) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/courses/${id}`)
  .then(res => {
    dispatch({
      type: GET_COURSE_BY_ID,
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

  // dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/workshops/courceWorkshops/${id}`)
  .then(res => {
    dispatch({
      type: FETCH_WORKSHOP,
      payload: res.data.reverse()
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

export const EditCourseAPI = (id, rawData) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().patch(`/courses/${id}`, rawData)
  .then(res => {
    if (res.status === 200) {
      toast.success("Updated course", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchCourseById(id))
    } else {
      toast.error("Error in Updating Course", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error Updating Course", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchAllCourses = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/courses')
  .then(res => {
    const data = res.data.reverse()
    dispatch({
      type: GET_ALL_COURSES,
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

export const fetchAllCoursesOptions = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/courses')
  .then(res => {
    const data = res.data.reverse().map(({ name, _id }) => ({ label: name, value: _id }))
    dispatch({
      type: GET_ALL_COURSES_OPTIONS,
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

export const deleteCourseById = (id) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().delete(`/courses/${id}`)
  .then(res => {
    toast.success("Succesfuly Deleted", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(fetchAllCourses())
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error Deleting Course", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchMyCourses = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`purchases?purchaseType=cources`)
  .then(res => {
    dispatch({
      type: FETCH_MY_COURSES,
      payload: res.data.reverse()
    })
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("unable to fetch purchased courses.", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchMyWorkshops = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`purchases?purchaseType=workshops`)
  .then(res => {
    dispatch({
      type: FETCH_MY_WORKSHOPS,
      payload: res.data.reverse()
    })
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("unable to fetch purchased courses.", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

