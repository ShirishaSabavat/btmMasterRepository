import { GET_USER_KYC_DATA } from '../../types/kyc'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const releasePayout = (data, hideModal) => dispatch => {
  toggleNetworkLoading(true)
  ServerApi().post(`/transactions/payout`, data)
  .then(res => {
    hideModal()
    toggleNetworkLoading(false)
    toast.success("Payout released.", {
        position: toast.POSITION.BOTTOM_CENTER
    })
  })
  .catch(e => {
    toggleNetworkLoading(false)
    toast.error("Unable to release payout", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}
