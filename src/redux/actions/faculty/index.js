import {GET_ALL_FACULTY, GET_ALL_FACULTY_OPTIONS, GET_ALL_FACULTY_BY_ID} from "../../types/faculty/index"
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const AddFaculty = (rawData, resetForm) => dispatch => {
  ServerApi().post('/faculty', rawData)
  .then(res => {
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

export const EditFaculty = (id, rawData) => dispatch => {
  ServerApi().patch(`/faculty${id}`, rawData)
  .then(res => {
    if (res.status === 200) {
      resetForm({})
      toast.success("Updated Faculty Settings!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    } else {
      toast.error("Error in Updateing Faculty Seiings!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error in Updateing Faculty Seiings!", {
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

export const fetchAllFacultyById = (id) => dispatch => {
  ServerApi().get(`/faculty/${id}`)
  .then(res => {
    const data = res.data
    dispatch({
      type: GET_ALL_FACULTY_BY_ID,
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
    const data = res.data.map(({ name, _id }) => ({ label: name, value: _id }))
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