import { GET_ALL_COURSES, GET_COURSE_BY_ID } from '../../types/courses'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const AddCourseAPI = (rawData) => dispatch => {
  ServerApi().post('/courses', rawData)
  .then(res => {
    console.log("ress", res)
    if (res.statusText === "Created") {
      toast.success("Created course", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } else {
      toast.error("Error in Creating Course", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error Creating Course", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditCourseAPI = (rawData) => dispatch => {
  ServerApi().patch('/courses', rawData)
  .then(res => {
    console.log("ress", res)
    if (res.statusText === "Ok") {
      toast.success("Updated course", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } else {
      toast.error("Error in Updating Course", {
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

export const fetchAllCourses = () => dispatch => {
  ServerApi().get('/courses')
  .then(res => {
    const data = res.data.map(values => values)
    dispatch({
      type: GET_ALL_COURSES,
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

export const fetchCourseById = (id) => dispatch => {
  ServerApi().get(`/courses/${id}`)
  .then(res => {
    dispatch({
      type: GET_COURSE_BY_ID,
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

export const deleteCourseById = (id) => dispatch => {
  ServerApi().delete(`/courses/${id}`)
  .then(res => {
    toast.success("Succesfuly Deleted", {
      position: toast.POSITION.BOTTOM_CENTER
    })
  })
  .catch(e => {
    toast.error("Error Deleting Course", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}
