import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'

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

// export const fetchAllMessages = () => dispatch => {
//   ServerApi().get(``)
//   .then(res => {
//     const data = res.data
//     dispatch({
//       type: FETCH_ALL_MESSAGES,
//       payload: data
//     })
//   })
//   .catch(e => {
//     toast.error("Error in Fetching Data", e, {
//       position: toast.POSITION.BOTTOM_CENTER
//     })
//     console.log(e)
//   })
// }
