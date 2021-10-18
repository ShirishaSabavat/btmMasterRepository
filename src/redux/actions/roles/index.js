import { GET_ALL_ROLES } from "../../types/roles"
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
  