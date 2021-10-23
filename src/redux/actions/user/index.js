import { FETCH_ALL_USER_DATA, FETCH_USER_BY_ID, FETCH_ALL_CLIENTS, FETCH_MY_COMMISIONS, FETCH_MY_TRANSACTIONS, DASHBOARD_DATA } from '../../types/user'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { updateUserKyc } from '../auth'
import { toggleNetworkLoading } from '../common'

export const fetchAllUsersData = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/users')
  .then(res => {
    console.log("res", res)
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_ALL_USER_DATA,
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

export const fetchUserById = (id) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/users/${id}`)
  .then(res => {
    dispatch({
      type: FETCH_USER_BY_ID,
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

export const EditUser = (id, userData) => dispatch => {
  ServerApi().patch(`/users/${id}`, userData)
  .then(res => {
    if (res.status === 200) {
      toast.success("Succesfully Updated User Details!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      return
    }
    toast.error("Failed Updating User Details!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
  })
  .catch(e => {
    toast.error("Error in Fetching User Data!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const deleteUser = (id) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().delete(`/users/${id}`)
    .then(res => {
      toast.success("Succesfuly Deleted", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      dispatch(fetchAllUsersData())
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

export const saveKyc = (payload) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('/kycs', payload)
  .then(res => {
    toast.success("Kyc submitted", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(updateUserKyc('PROCESSING'))
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Unable to submit Kyc!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const verifyUserKyc = (payload) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post(`/kycs/verifyKyc/${payload.kycId}/${payload.userId}`, {status: payload.status})
  .then(res => {
    toast.success("Kyc submitted", {
      position: toast.POSITION.BOTTOM_CENTER
    })

    dispatch(updateUserKyc('PROCESSING'))
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Unable to submit Kyc!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const loadMyClients = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/users/clients')
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_ALL_CLIENTS,
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

export const loadMyCommisions = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/commisions')
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_MY_COMMISIONS,
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

export const loadMyTransactions = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/transactions')
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_MY_TRANSACTIONS,
      payload: data
    })
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Error in Fetching Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}

export const loadDashboardData = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/reports/dashboard')
  .then(res => {
    dispatch({
      type: DASHBOARD_DATA,
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
