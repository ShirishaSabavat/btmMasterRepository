import { GET_ALL_ROLES, ROLE_DETAILS, UPDATE_PERMISSIONS } from "../../types/roles"
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchAllRoles = () => dispatch => {
    ServerApi().get('/roles')
    .then(res => {
      const data = res.data.map(values => values)
      dispatch({
        type: GET_ALL_ROLES,
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

export const fetchRoleDetails = (payload) => dispatch => {
  ServerApi().get(`roles/${payload}`)
  .then(res => {
    const data = res.data
    dispatch({
      type: ROLE_DETAILS,
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

export const updateRoles = (paload) => dispatch => {
    ServerApi().patch(`/roles/${paload.id}`, paload.data)
    .then(res => {
      if (res.status === 200) {
        toast.success("Permissions Updated", {
          position: toast.POSITION.BOTTOM_CENTER
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
  
export const updatePermission = (payload) => dispatch => {
  dispatch({type: UPDATE_PERMISSIONS, payload})
}