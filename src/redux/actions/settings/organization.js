import { FETCH_ALL_ORGANIZATION_SETTINGS } from '../../types/settings'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const fetchAllOrganizationSettings = () => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().get('/settings')
  .then(res => {
    const data = res.data.map(values => values) 
    dispatch({
      type: FETCH_ALL_ORGANIZATION_SETTINGS,
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

export const postOrganizationSettings = (id, formdata) => (dispatch) => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().patch(`/settings/${id}`, formdata).then(res => {
    toast.success("Successfully Updated Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    // setReFetch(prevState => !prevState)
  }).catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error in Updating Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}
export const UpdateOrganizationSettings = (id, formdata) => (dispatch) => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().patch(`/settings/${id}`, formdata).then(res => {
    toast.success("Successfully Updated Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(fetchAllOrganizationSettings())
    dispatch(toggleNetworkLoading(false))
  }).catch(e => {
    dispatch(toggleNetworkLoading(false))
    toast.error("Error in Updating Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}
