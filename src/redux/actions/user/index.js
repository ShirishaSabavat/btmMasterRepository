import { FETCH_ALL_USER_DATA, FETCH_USER_BY_ID } from '../../types/user'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchAllUsersData = () => dispatch => {
  ServerApi().get('/users')
  .then(res => {
    console.log("res", res)
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_ALL_USER_DATA,
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

export const fetchUserById = (id) => dispatch => {
  ServerApi().get(`/users/${id}`)
  .then(res => {
    dispatch({
      type: FETCH_USER_BY_ID,
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

export const deleteUser = (id) => dispatch => {
    ServerApi().delete(`/users/${id}`)
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