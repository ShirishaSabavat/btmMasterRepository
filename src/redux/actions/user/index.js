import { FETCH_ALL_USER_DATA, FETCH_USER_BY_ID, FETCH_ALL_CLIENTS, FETCH_MY_COMMISIONS, FETCH_MY_TRANSACTIONS, DASHBOARD_DATA } from '../../types/user'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { updateUserKyc } from '../auth'

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

export const saveKyc = (payload) => dispatch => {
  ServerApi().post('/kycs', payload)
  .then(res => {
    toast.success("Kyc submitted", {
      position: toast.POSITION.BOTTOM_CENTER
    })

    dispatch(updateUserKyc('PROCESSING'))
  })
  .catch(e => {
    toast.error("Unable to submit Kyc!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const verifyUserKyc = (payload) => dispatch => {
  ServerApi().post(`/kycs/verifyKyc/${payload.kycId}/${payload.userId}`, {status: payload.status})
  .then(res => {
    toast.success("Kyc submitted", {
      position: toast.POSITION.BOTTOM_CENTER
    })

    dispatch(updateUserKyc('PROCESSING'))
  })
  .catch(e => {
    toast.error("Unable to submit Kyc!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const loadMyClients = () => dispatch => {
  ServerApi().get('/users/clients')
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_ALL_CLIENTS,
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

export const loadMyCommisions = () => dispatch => {
  ServerApi().get('/commisions')
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_MY_COMMISIONS,
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

export const loadMyTransactions = () => dispatch => {
  ServerApi().get('/transactions')
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_MY_TRANSACTIONS,
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

export const loadDashboardData = () => dispatch => {
  ServerApi().get('/reports/dashboard')
  .then(res => {
    dispatch({
      type: DASHBOARD_DATA,
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
