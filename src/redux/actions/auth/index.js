import { DO_LOGIN, UPDATE_ROLE, LOGOUT, UPDATE_KYC, VERIFY_OTP_TAB, CREATE_PASSWORD_TAB } from '../../types/auth'
import ServerApi from '../../../utility/ServerApi'
import { toast } from 'react-toastify'
import { toggleNetworkLoading } from '../common'

export const handleLogin = payload => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('auth/login', payload)
  .then(res => {
    dispatch({
      type: DO_LOGIN,
      payload: res.data
    })

    localStorage.setItem('userData', JSON.stringify(res.data))
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Invalid Email/Password", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}

export const forgotPasswordSendOtp = payload => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('users/forgot-password-send-otp', payload)
  .then(res => {
    if (res.data.success) {
      dispatch({
        type: VERIFY_OTP_TAB,
        payload: true
      })
    } else {
      toast.error("No account found with given Phone no.", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("No account found with given Phone no.", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}

export const forgotPasswordVerifyOtp = payload => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('users/forgot-password-verify-otp', payload)
  .then(res => {

    if (res.data.success) {
      dispatch({
        type: CREATE_PASSWORD_TAB,
        payload: true
      })
    } else {
      toast.error("Invalid OTP", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }

    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Invalid OTP", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}

export const forgotPasswordChangePassword = (payload, goToLogin) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('users/forgot-password-change-password', payload)
  .then(res => {
    if (res.data.success) {
      toast.success("Password changes successfully!", {
        position: toast.POSITION.BOTTOM_CENTER
      })
      goToLogin()
    } else {
      toast.error("Unable to create new password", {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    dispatch(toggleNetworkLoading(false))
  })
  .catch(e => {
    toast.error("Unable to create new password", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}

export const changePassword = (payload, resetForm) => dispatch => {
  dispatch(toggleNetworkLoading(true))
  ServerApi().post('users/change-password', payload)
  .then(res => {
    toast.success("Password changed!", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    resetForm()
  })
  .catch(e => {
    toast.error("Unable to change password.", {
      position: toast.POSITION.BOTTOM_CENTER
    })
    dispatch(toggleNetworkLoading(false))
    console.log(e)
  })
}

export const updateUserRole = payload => dispatch => {
  const currentUser = JSON.parse(localStorage.getItem('userData'))
  currentUser.user.role = payload
  localStorage.setItem('userData', JSON.stringify(currentUser))
  dispatch({ type: UPDATE_ROLE, payload })
}

export const updateUserKyc = payload => dispatch => {
  const currentUser = JSON.parse(localStorage.getItem('userData'))
  currentUser.user.kycStatus = 'PROCESSING'
  localStorage.setItem('userData', JSON.stringify(currentUser))
  dispatch({ type: UPDATE_KYC, payload })
}

export const handleLogout = () => dispatch => {
  dispatch({ type: LOGOUT })
  localStorage.removeItem('userData')
}

export const switchToOtpVerify = () => dispatch => {
  dispatch({ type: VERIFY_OTP_TAB })
}

export const switchToCreatePassword = () => dispatch => {
  dispatch({ type: CREATE_PASSWORD_TAB })
}
