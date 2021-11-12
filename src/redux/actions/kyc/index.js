import { GET_USER_KYC_DATA } from '../../types/kyc'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchKycUserData = ({id}) => dispatch => {
  ServerApi().get(`/kycs/${id}`)
  .then(res => {
    console.log("res", res)
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