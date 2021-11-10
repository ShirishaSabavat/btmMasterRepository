import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { GET_ALL_SETTINGS } from '../../types/landingPage/landingPage'

export const AddMessage = (rawData, resetForm) => dispatch => {
  ServerApi().post('/inquiry', rawData)
  .then(res => {
    if (res.status === 201) {
        toast.success("Message Sent!", {
            position: toast.POSITION.BOTTOM_CENTER
        })
        resetForm({})
    }
    //else {
    //   toast.error("Error in Sending Message!", {
    //     position: toast.POSITION.BOTTOM_CENTER
    //   })
    // }
  })
  .catch(e => {
    toast.error("Error in Sending Message!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    console.log(e)
  })
}

export const getLandingPageData = () => dispatch => {
  ServerApi().get('/settings')
  .then(res => {
    const data = res.data.map((values) => values)
    dispatch({
      type: GET_ALL_SETTINGS,
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