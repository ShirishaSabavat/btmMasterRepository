import {GET_ALL_FACULTY, GET_ALL_FACULTY_OPTIONS, GET_ALL_FACULTY_BY_ID} from "../../types/faculty/index"
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const AddFaculty = (rawData, resetForm) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('/faculty', rawData)
  .then(res => {
    if (res.status === 201) {
      resetForm({})
      toast.success("Created Faculty", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error Creating Faculty", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditFaculty = (id, rawData) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().patch(`/faculty/${id}`, rawData)
  .then(res => {
    if (res.status === 200) {
      toast.success("Updated Faculty Settings!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Updateing Faculty Settings!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
    dispatch(toggleNetworkLoading(false))
  })
}

export const fetchAllFaculty = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/faculty`)
  .then(res => {
    const data = res.data
    dispatch({
      type: GET_ALL_FACULTY,
      payload: data
    })
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Fetching Data", e, {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
    dispatch(toggleNetworkLoading(false))
  })
}

export const fetchAllFacultyById = (id) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/faculty/${id}`)
  .then(res => {
    const data = res.data
    dispatch({
      type: GET_ALL_FACULTY_BY_ID,
      payload: data
    })
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Fetching Data", e, {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}
export const fetchAllFacultyOptions = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/faculty`)
  .then(res => {
    const data = res.data.map(({ name, _id }) => ({ label: name, value: _id }))
    dispatch({
      type: GET_ALL_FACULTY_OPTIONS,
      payload: data
    })
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Fetching Data", e, {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}

export const DeleteFaculty = (id) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().delete(`/faculty/${id}`)
  .then(res => {
    if (res.status === 200) {
      toast.success("Deleted Faculty!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchAllFaculty())
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Deleting Faculty!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
    dispatch(toggleNetworkLoading(false))
  })
}