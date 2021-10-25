import { FETCH_ALL_SALES_DATA, FETCH_SALE_DATA } from '../../types/sales'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const fetchAllSales = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/purchases')
  .then(res => {
    const data = res.data.reverse().map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_ALL_SALES_DATA,
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

export const fetchSaleDetails = (payload) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get(`/purchases/${payload}`)
  .then(res => {
    dispatch({
      type: FETCH_SALE_DATA,
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