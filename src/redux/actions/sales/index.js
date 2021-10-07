import { FETCH_ALL_SALES_DATA } from '../../types/sales'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchAllSales = () => dispatch => {
  ServerApi().get('/purchases')
  .then(res => {
    const data = res.data.map((values, index) => ({...values, sno: index + 1}))
    dispatch({
      type: FETCH_ALL_SALES_DATA,
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