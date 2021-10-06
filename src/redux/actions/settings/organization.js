import { FETCH_ALL_ORGANIZATION_SETTINGS } from '../../types/settings'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchAllOrganizationSettings = () => dispatch => {
  ServerApi().get('/settings')
  .then(res => {
    const data = res.data.map(values => values) 
    dispatch({
      type: FETCH_ALL_ORGANIZATION_SETTINGS,
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

export const postOrganizationSettings = (id, formdata) => (dispatch) => {
  ServerApi().patch(`/settings/${id}`, formdata).then(res => {
    if (res.status === "200") {
      toast.success("Successfully Updated Data", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      setReFetch(prevState => !prevState)
    }
  }).catch(e => {
    toast.error("Error in Updating Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

