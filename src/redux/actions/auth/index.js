import { DO_LOGIN, LOGOUT } from '../../types/auth'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const handleLogin = payload => dispatch => {
  dispatch(toggleNetworkLoading())
  ServerApi().post('auth/login', payload)
  .then(res => {
    dispatch({
      type: DO_LOGIN,
      payload: res.data
    })

    localStorage.setItem('userData', JSON.stringify(res.data))
    dispatch(toggleNetworkLoading())
  })
  .catch(e => {
    toast.error("Invalid Email/Password", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading())
    console.log(e)
  })
}

export const handleLogout = () => dispatch => {
  dispatch({ type: LOGOUT })
  localStorage.removeItem('userData')
}
