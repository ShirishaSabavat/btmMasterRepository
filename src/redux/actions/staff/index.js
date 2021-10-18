import { FETCH_ALL_STAFF } from '../../types/staff'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

export const fetchAllStaff = () => dispatch => {
  ServerApi().get('/users/staff')
  .then(res => {
    const data = res.data.map(values => values)
    dispatch({
      type: FETCH_ALL_STAFF,
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

export const AddStaffAPI = (rawData) => dispatch => {
  ServerApi().post('/users/staff', rawData)
  .then(res => {
    if (res.status === 201) {
      toast.success("Successfully Created Staff", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error in Creating Staff", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const EditStaffAPI = (id, rawData, resetForm) => dispatch => {
  ServerApi().patch(`/users/staff/${id}`, rawData)
  .then(res => {
    console.log(res)
    if (res.status === 200) {
      toast.success("Data Updated!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      resetForm({})
    } else {
      toast.error("Error in Updating Data", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  })
  .catch(e => {
    toast.error("Error in Updating Data", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}