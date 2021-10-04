import {GET_ALL_FACULTY, GET_ALL_FACULTY_OPTIONS} from "../../types/faculty/index"
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const AddFaculty = (rawData, resetForm) => dispatch => {
  ServerApi().post('/faculty', rawData)
  .then(res => {
    console.log("ress", res)
    if (res.status === 201) {
      resetForm({})
      toast.success("Created Faculty", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } else {
      toast.error("Error in Creating Faculty", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error Creating Faculty", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const fetchAllFaculty = () => dispatch => {
  ServerApi().get(`/faculty`)
  .then(res => {
    const data = res.data
    dispatch({
      type: GET_ALL_FACULTY,
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
export const fetchAllFacultyOptions = () => dispatch => {
  ServerApi().get(`/faculty`)
  .then(res => {
    const data = res.data.map(values => { return {label: values.name, value: values._id} })
    dispatch({
      type: GET_ALL_FACULTY_OPTIONS,
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