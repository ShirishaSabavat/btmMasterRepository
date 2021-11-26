import { GET_USER_KYC_DATA } from '../../types/kyc'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchKycUserData = (id) => dispatch => {
  ServerApi().get(`/kycs/${id}`)
  .then(res => {
    dispatch({
      type: GET_USER_KYC_DATA,
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

export const saveKycData = (id, payload) => dispatch => {
  ServerApi().patch(`/kycs/${id}`, payload)
  .then(res => {
    toast.success("Kyc submitted", {
      position: toast.POSITION.BOTTOM_CENTER
    })
  })
  .catch(e => {
    toast.error("Unable to submit Kyc!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}